using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Server.Contracts.Wallets;
using Server.Data.Persistence;
using Server.Helpers;
using Server.Integrations;
using Server.Security.Interfaces;

namespace Server.Features.Wallets;

public class BuyMoney : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/wallets/buy", 
                async (MoveMoneyRequest request, HttpContext httpContext, IUserService userService, ISender sender) =>
                {
                    var command = new Command(
                        CurrentUserId: userService.ReadUserIdFromToken(httpContext),
                        WalletId: request.WalletId,
                        Amount: request.Amount
                    );
                    return await sender.Send(command);
                })
            .RequireAuthorization(AppConstants.BaseAuthPolicy)
            .Produces<WalletResponse>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .Produces(StatusCodes.Status409Conflict);
    }

    public sealed record Command(
        Guid CurrentUserId,
        Guid WalletId,
        decimal Amount) : IRequest<IResult>;
    
    public sealed class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(command => command.WalletId)
                .NotEmpty();
            
            RuleFor(command => command.Amount)
                .NotEmpty()
                .GreaterThan(0);
        }
    }

    internal sealed class Handler(
        AppDbContext dbContext,
        IValidator<Command> validator,
        INpbService nbpService) : IRequestHandler<Command, IResult>
    {
        public async Task<IResult> Handle(Command command, CancellationToken ct)
        {
            var validationResult = await validator.ValidateAsync(command, ct);
            if (!validationResult.IsValid)
                return TypedResults.ValidationProblem(validationResult.GetValidationProblems());

            var userWallets = await dbContext
                .Wallets
                .Include(w => w.Currency)
                .Where(w => w.UserId == command.CurrentUserId)
                .ToListAsync(ct);

            var baseWallet = userWallets
                .Single(w => w.Currency.ShortName == "PLN");
            
            var wallet = userWallets
                .SingleOrDefault(w => w.Id == command.WalletId);

            if (wallet is null)
                return TypedResults.NotFound("Wallet not found");
            
            var nbpResponse = await nbpService.GetOneCurrency(wallet.Currency.ShortName);
            if (nbpResponse is null)
                return TypedResults.NotFound("Currency not found");
            
            // calculate local application ratio
            var rate = nbpResponse.Mid + wallet.Currency.Ratio;
            
            // calculate baseWallet value
            var baseWalletValueAmount = Math.Round(baseWallet.Value - command.Amount * rate, 4);

            if (baseWalletValueAmount < 0)
                return TypedResults.Conflict("Insufficient funds");
            
            // change base wallet value
            baseWallet.Value = baseWalletValueAmount;
            // add money to destination wallet
            wallet.Value += command.Amount;
            
            // todo add money to bank account
            
            dbContext.UpdateRange(baseWallet, wallet);
            await dbContext.SaveChangesAsync(ct);
            
            var response = userWallets
                .Select(w => new WalletResponse(w));

            return TypedResults.Ok(response);
        }
    }
}