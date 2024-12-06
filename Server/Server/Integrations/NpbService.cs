using Refit;
using Server.Integrations.NbpApi.Contracts;
using Server.Integrations.NbpApi.Models;

namespace Server.Integrations;

public interface INpbService
{
    Task<GetAllNbpCurrenciesResponse<NbpCurrency>> GetAllCurrencies(DateOnly? date = null);
    
    Task<NbpCurrency?> GetOneCurrency(string shortName);
} 

public class NpbService(INbpEndpoints nbpEndpoints) : INpbService
{
    public async Task<GetAllNbpCurrenciesResponse<NbpCurrency>> GetAllCurrencies(DateOnly? date = null)
    {
        try
        {
            var responseTableA  = date is not null
                ? await nbpEndpoints.GetAllTableA(date.Value.ToString("yyyy-MM-dd"))
                : await nbpEndpoints.GetAllTableA();
            
            var responseTableC = date is not null
                ? await nbpEndpoints.GetAllTableC(date.Value.ToString("yyyy-MM-dd"))
                : await nbpEndpoints.GetAllTableC();
            
            var resultTableA = responseTableA.First().Rates;
            var resultTableC = responseTableC.First().Rates;

            var margeRates = (
                    from a in resultTableA
                    join c in resultTableC on a.Code equals c.Code into gj
                    from c in gj.DefaultIfEmpty()
                    select new NbpCurrency
                    {
                        Currency = a.Currency,
                        Code = a.Code,
                        Mid = (decimal)a.Mid,
                        Bid = c?.Bid ?? 0,
                        Ask = c?.Ask ?? 0
                    })
                .ToList();

            return new GetAllNbpCurrenciesResponse<NbpCurrency>
            {
                EffectiveDate = responseTableA.First().EffectiveDate,
                Rates = margeRates
            };
        }
        catch (ApiException e)
        {
            return new GetAllNbpCurrenciesResponse<NbpCurrency>();
        }
    }

    public async Task<NbpCurrency?> GetOneCurrency(string shortName)
    {
        try
        {
            var response = await nbpEndpoints.GetOneTableA(shortName);

            return new NbpCurrency
            {
                Currency = response.Currency,
                Code = response.Code,
                Mid = (decimal)response.Rates.First().Mid
            };
        }
        catch (ApiException e)
        {
            return null;
        }
    }
}