using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Server.Contracts.Wallets;
using Server.Data.Persistence;
using Server.Helpers;
using Server.Security.Interfaces;

namespace Server.Features.Wallets;

public class AddMoney : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/wallets/add-money",
                async (AddMoneyRequest request, HttpContext httpContext, IUserService userService, ISender sender) =>
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
            .Produces(StatusCodes.Status404NotFound);
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
                .GreaterThan(0)
                .LessThanOrEqualTo(10000);
        }
    }
    
    internal sealed class Handler(
        AppDbContext dbContext,
        IValidator<Command> validator) : IRequestHandler<Command, IResult>
    {
        public async Task<IResult> Handle(Command command, CancellationToken ct)
        {
            var validationResult = await validator.ValidateAsync(command, ct);
            if (!validationResult.IsValid)
                return TypedResults.ValidationProblem(validationResult.GetValidationProblems());
            
            var wallet = await dbContext
                .Wallets
                .Include(w => w.Currency)
                .Where(w => w.UserId == command.CurrentUserId)
                .Where(w => w.Id == command.WalletId)
                .SingleOrDefaultAsync(ct);

            if (wallet is null)
                return TypedResults.NotFound("Wallet not found");

            wallet.Value += command.Amount;
            
            dbContext.Update(wallet);
            await dbContext.SaveChangesAsync(ct);
            
            return TypedResults.Ok(new WalletResponse(wallet));
        }
    }
}