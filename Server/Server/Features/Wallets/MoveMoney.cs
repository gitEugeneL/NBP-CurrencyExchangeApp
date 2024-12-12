using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Server.Contracts.Wallets;
using Server.Data.Persistence;
using Server.Domain.Entities;
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

            var user = await dbContext
                .Users
                .SingleAsync(u => u.Id == command.CurrentUserId, ct);
            
            // Retrieve user wallets with related currency data
            var userWallets = await dbContext
                .Wallets
                .Include(w => w.Currency)
                .Where(w => w.UserId == command.CurrentUserId)
                .ToListAsync(ct);

            // Get the main user wallet (PLN) and the target wallet
            var baseWallet = userWallets.SingleOrDefault(w => w.Currency.ShortName == "PLN");
            var targetWallet = userWallets.SingleOrDefault(w => w.Id == command.WalletId);

            if (targetWallet is null || baseWallet is null)
                return TypedResults.NotFound("Wallet not found");
            
            // Get NBP rate for the currency
            var nbpResponse = await nbpService.GetOneCurrency(targetWallet.Currency.ShortName);
            if (nbpResponse is null)
                return TypedResults.NotFound("Currency not found");
            
            // Calculate exchange rate
            var rate = command.Operation == "buy"
                ? nbpResponse.Mid + targetWallet.Currency.Ratio
                : nbpResponse.Mid - targetWallet.Currency.Ratio;
            
            // Calculate conversion value
            var convertedValue = decimal.Round(command.Amount * rate, 2, MidpointRounding.AwayFromZero);
            
            if ((command.Operation == "buy" &&  (baseWallet.Value - convertedValue) < 0) 
                || (command.Operation == "sell" && targetWallet.Value < command.Amount))
            {
                return TypedResults.Conflict("Insufficient funds");
            }
            
            // Retrieve bank vaults for PLN
            var baseVault = await dbContext
                .Vaults
                .Include(v => v.Currency)
                .SingleOrDefaultAsync(v => v.Currency.ShortName == "PLN", ct);
            
            // Retrieve bank vaults for target currency
            var targetVault = await dbContext
                .Vaults
                .SingleOrDefaultAsync(v => v.CurrencyId == targetWallet.CurrencyId, ct);

            if (baseVault is null || targetVault is null)
                return TypedResults.NotFound("Wallet or currency not found");
            
            // Start transaction
            await using var transaction = await dbContext.Database.BeginTransactionAsync(ct);
            try
            {
                switch (command.Operation)
                {
                    case "buy":
                    {
                        // Take destination amount from bank vault
                        targetVault.Value -= command.Amount;
                        // Put destination currency to bank vault
                        baseVault.Value += convertedValue;
                        // Change base user wallet value
                        baseWallet.Value -= convertedValue;
                        // Change target user wallet
                        targetWallet.Value += command.Amount;
                        break;
                    }
                    case "sell":
                    {
                        // Put destination amount to bank vault
                        targetVault.Value += command.Amount;
                        // Take base currency amount from bank vault
                        baseVault.Value -= convertedValue;
                        // Change base user wallet value
                        baseWallet.Value += convertedValue;
                        // Change target user wallet
                        targetWallet.Value -= command.Amount;
                        break;
                    }
                }
                
                // // create user transaction
                var userTransaction = new Transaction
                {
                    User = user,
                    InputCurrency = command.Operation == "buy" ? baseWallet.Currency : targetWallet.Currency,
                    OutputCurrency = command.Operation == "buy" ? targetWallet.Currency : baseWallet.Currency,
                    InputAmount = command.Operation == "buy" ? convertedValue : command.Amount,
                    OutputAmount = command.Operation == "buy" ? command.Amount : convertedValue,
                    ExchangeRate = rate
                };
                
                // Save changes
                dbContext.UpdateRange(baseWallet, targetWallet, baseVault, targetVault, userTransaction);
                await dbContext.SaveChangesAsync(ct);

                // Commit transaction
                await transaction.CommitAsync(ct);

                // Prepare response
                var response = userWallets
                    .Select(w => new WalletResponse(w));

                return TypedResults.Ok(response);
            }
            catch (Exception e)
            {
                // Rollback transaction in case of an error
                await transaction.RollbackAsync(ct);
                return TypedResults.NotFound("Transaction failed");
            }
        }
    }
}

