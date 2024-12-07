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

public class MoveMoney : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/wallets/move", 
                async (MoveMoneyRequest request, HttpContext httpContext, IUserService userService, ISender sender) =>
                {
                    var command = new Command(
                        CurrentUserId: userService.ReadUserIdFromToken(httpContext),
                        WalletId: request.WalletId,
                        Amount: request.Amount,
                        Operation: request.Operation
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
        decimal Amount,
        string Operation) : IRequest<IResult>;
    
    public sealed class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(command => command.WalletId)
                .NotEmpty();

            RuleFor(command => command.Amount)
                .NotEmpty()
                .GreaterThan(0)
                .LessThanOrEqualTo(100000);
            
            RuleFor(command => command.Operation)
                .NotEmpty()
                .Must(operation => operation is "buy" or "sell")
                .WithMessage("Operation must be: 'buy' or 'sell'");
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
            
            // var rate = nbpResponse.Mid + wallet.Currency.Ratio;
            var rate = command.Operation == "buy"
                ? nbpResponse.Mid + wallet.Currency.Ratio
                : nbpResponse.Mid - wallet.Currency.Ratio;
            
            // calculate baseWallet value
            var baseWalletValueAmount = command.Operation == "buy"
                ? Math.Round(baseWallet.Value - command.Amount * rate, 4)
                : Math.Round(baseWallet.Value + command.Amount * rate, 4);

            if ((command.Operation == "buy" && baseWalletValueAmount < 0) 
                || (command.Operation == "sell" && wallet.Value < command.Amount))
            {
                return TypedResults.Conflict("Insufficient funds");
            }
            
            // Start transaction
            await using var transaction = await dbContext.Database.BeginTransactionAsync(ct);
            try
            {
                // Change base wallet value
                baseWallet.Value = baseWalletValueAmount;

                // Change destination wallet value
                wallet.Value = command.Operation == "buy"
                    ? wallet.Value + command.Amount
                    : wallet.Value - command.Amount;

                // Save changes
                dbContext.UpdateRange(baseWallet, wallet);
                await dbContext.SaveChangesAsync(ct);

                // Commit transaction
                await transaction.CommitAsync(ct);

                // Prepare response
                var response = userWallets
                    .Select(w => new WalletResponse(w));

                return TypedResults.Ok(response);
            }
            catch (Exception)
            {
                // Rollback transaction in case of an error
                await transaction.RollbackAsync(ct);
                return TypedResults.NotFound("Transaction failed");
            }
        }
    }
}