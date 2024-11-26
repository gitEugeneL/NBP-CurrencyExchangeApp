using Carter;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Server.Contracts.Currencies;
using Server.Data.Persistence;
using Server.Domain.Entities;
using Server.Helpers;

namespace Server.Features.Currencies;

public class GetAllCurrencies : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/currencies", async (ISender sender) =>
            {
                var query = new Query();
                return await sender.Send(query);
            })
            .RequireAuthorization(AppConstants.BaseAuthPolicy)
            .WithTags(nameof(Currency))
            .Produces<List<CurrencyResponse>>(StatusCodes.Status200OK);
    }

    public sealed record Query : IRequest<IResult>;
    
    internal sealed class Handler(AppDbContext dbContext) : IRequestHandler<Query, IResult>
    {
        public async Task<IResult> Handle(Query query, CancellationToken ct)
        {
            // todo
            // check and NBP rate and add

            var currencies = await dbContext
                .Currencies
                .AsNoTracking()
                .ToListAsync(ct);
            
            return TypedResults.Ok(currencies);
        }
    }
}