using Carter;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Server.Contracts.Currencies;
using Server.Data.Persistence;
using Server.Domain.Entities;
using Server.Helpers;
using Server.Integrations;

namespace Server.Features.Currencies;

public class GetAllCurrencies : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/currencies", async ([AsParameters] GetAllCurrenciesParams queryParam, ISender sender) =>
            { 
                var query = new Query(
                    WithRate: queryParam.WithRate,
                    CurrencyDate: queryParam.CurrencyDate
                );
                return await sender.Send(query);
            })
            .RequireAuthorization(AppConstants.BaseAuthPolicy)
            .WithTags(nameof(Currency))
            .Produces<List<CurrencyResponse>>(StatusCodes.Status200OK);
    }

    public sealed record Query(
        bool WithRate = false,
        DateOnly? CurrencyDate = null) : IRequest<IResult>;
    
    internal sealed class Handler(
        AppDbContext dbContext, 
        INpbService npbService) : IRequestHandler<Query, IResult>
    {
        public async Task<IResult> Handle(Query query, CancellationToken ct)
        {
            var currencies = await dbContext
                .Currencies
                .AsNoTracking()
                .ToListAsync(ct);
    
            var rateDate = query.CurrencyDate ?? DateOnly.FromDateTime(DateTime.Now);
            
            if (query.WithRate)
            {
                var nbpResponse = query.CurrencyDate.HasValue
                    ? await npbService.GetAllCurrencies(query.CurrencyDate)
                    : await npbService.GetAllCurrencies();
        
                var result = currencies
                    .Where(c => nbpResponse.Rates.Any(r => r.Code == c.ShortName))
                    .Select(c =>
                    {
                        var currentRate = nbpResponse.Rates
                            .FirstOrDefault(r => r.Code == c.ShortName);
                
                        if (currentRate == null) 
                            return null;
                       
                        var midRate = (decimal)currentRate.Mid;
                        
                        var sellRate = query.CurrencyDate.HasValue 
                            ? currentRate.Ask 
                            : midRate + c.Ratio;
                
                        var buyRate = query.CurrencyDate.HasValue 
                            ? currentRate.Bid 
                            : midRate - c.Ratio;

                        return new CurrencyResponse(
                            currency: c,
                            buyRate: buyRate,
                            sellRate: sellRate,
                            nbpRate: midRate,
                            dateRate: rateDate
                        );
                    })
                    .Where(currencyResponse => currencyResponse is not null)
                    .ToList();
        
                return TypedResults.Ok(result);
            }

            var defaultResult = currencies
                .Select(c => new CurrencyResponse(c))
                .ToList();
            
            return TypedResults.Ok(defaultResult);
        }

    }
}