using Carter;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Server.Contracts.Wallets;
using Server.Data.Persistence;
using Server.Domain.Entities;
using Server.Helpers;
using Server.Security.Interfaces;

namespace Server.Features.Wallets;

public class CreateUserWallet : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/wallets",
                async (CreateWalletRequest request, HttpContext httpContext, IUserService userService,
                    ISender sender) =>
                {
                    var command = new Command(
                        CurrentUserId: userService.ReadUserIdFromToken(httpContext),
                        CurrencyId: request.CurrencyId
                    );
                    return await sender.Send(command);
                })
            .RequireAuthorization(AppConstants.BaseAuthPolicy)
            .Produces<WalletResponse>(StatusCodes.Status201Created)
            .Produces(StatusCodes.Status409Conflict)
            .Produces(StatusCodes.Status404NotFound);
    }

    public sealed record Command(
        Guid CurrentUserId,
        Guid CurrencyId
    ) : IRequest<IResult>;
    
    internal sealed class Handler(AppDbContext dbContext) : IRequestHandler<Command, IResult>
    {
        public async Task<IResult> Handle(Command command, CancellationToken ct)
        {
            var currency = await dbContext
                .Currencies
                .SingleOrDefaultAsync(currency => currency.Id == command.CurrencyId, ct);
         
            if (currency is null)
                return TypedResults.NotFound($"currency id: {command.CurrencyId} is not found");
            
            var user = await dbContext
                .Users
                .Include(user => user.Wallets)
                .SingleOrDefaultAsync(user => user.Id == command.CurrentUserId, ct);

            if (user is null)
                return TypedResults.NotFound("user profile not found");

            if (user.Wallets.Any(wallet => wallet.CurrencyId == command.CurrencyId))
            {
                return TypedResults
                    .Conflict($"Wallet with currency id: {command.CurrencyId} already exists for this user");
            }

            var wallet = new Wallet
            {
                Value = 0,
                User = user,
                Currency = currency
            };
            await dbContext.Wallets.AddAsync(wallet, ct);
            await dbContext.SaveChangesAsync(ct);
            
            return TypedResults.Created(wallet.Id.ToString(), new WalletResponse(wallet));
        }
    }
}