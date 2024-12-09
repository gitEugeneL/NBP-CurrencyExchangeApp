using Carter;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Server.Contracts.Transactions;
using Server.Data.Persistence;
using Server.Helpers;
using Server.Security.Interfaces;

namespace Server.Features.Transactions;

public class GetAllUserTransactions : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/transactions", async (HttpContext httpContext, IUserService userService, ISender sender) =>
            {
                var query = new Query(userService.ReadUserIdFromToken(httpContext));
                return await sender.Send(query);
            })
            .RequireAuthorization(AppConstants.BaseAuthPolicy)
            .Produces<List<TransactionResponse>>(StatusCodes.Status200OK);
    }

    public sealed record Query(Guid CurrentUserId) : IRequest<IResult>;
    
    internal sealed class Handler(AppDbContext dbContext) : IRequestHandler<Query, IResult>
    {
        public async Task<IResult> Handle(Query query, CancellationToken ct)
        {
            var transactionsResponse = await dbContext
                .Transactions
                .Include(t => t.InputCurrency)
                .Include(t => t.OutputCurrency)
                .Where(t => t.UserId == query.CurrentUserId)
                .OrderByDescending(t => t.Date)
                .Select(t => new TransactionResponse(t))
                .ToListAsync(ct);
            
            return TypedResults.Ok(transactionsResponse);
        }
    }
}