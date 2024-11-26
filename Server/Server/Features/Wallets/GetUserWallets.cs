using Carter;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Server.Contracts.Wallets;
using Server.Data.Persistence;
using Server.Domain.Entities;
using Server.Helpers;
using Server.Security.Interfaces;

namespace Server.Features.Wallets;

public class GetUserWallets : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/wallets", async (HttpContext httpContext, ISender sender, IUserService userService) =>
            {
                var query = new Query(userService.ReadUserIdFromToken(httpContext));
                return await sender.Send(query);
            })
            .RequireAuthorization(AppConstants.BaseAuthPolicy)
            .WithTags(nameof(Wallet))
            .Produces<List<WalletResponse>>(StatusCodes.Status200OK);
    }

    public sealed record Query(Guid CurrentUserId) : IRequest<IResult>;

    internal sealed class Handler(AppDbContext dbContext) : IRequestHandler<Query, IResult>
    {
        public async Task<IResult> Handle(Query query, CancellationToken ct)
        {
            var userWalletsResponse = await dbContext
                .Wallets
                .Include(wallet => wallet.User)
                .Include(wallet => wallet.Currency)
                .AsNoTracking()
                .Where(wallet => wallet.UserId == query.CurrentUserId)
                .Select(wallet => new WalletResponse(wallet))
                .ToListAsync(ct);

            return TypedResults.Ok(userWalletsResponse);
        }
    }
}