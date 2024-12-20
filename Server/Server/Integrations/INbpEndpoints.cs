using Refit;
using Server.Integrations.NbpApi.Contracts;
using Server.Integrations.NbpApi.Models;

namespace Server.Integrations;

public interface INbpEndpoints
{
    [Get("/api/exchangerates/tables/a")]
    Task<List<GetAllNbpCurrenciesResponse<NbpCurrencyTableA>>> GetAllTableA();

    [Get("/api/exchangerates/tables/a/{date}")]
    Task<List<GetAllNbpCurrenciesResponse<NbpCurrencyTableA>>> GetAllTableA(string date);
    
    
    [Get("/api/exchangerates/tables/c")]
    Task<List<GetAllNbpCurrenciesResponse<NbpCurrencyTableC>>> GetAllTableC();

    [Get("/api/exchangerates/tables/c/{date}")]
    Task<List<GetAllNbpCurrenciesResponse<NbpCurrencyTableC>>> GetAllTableC(string date);
    
    [Get("/api/exchangerates/rates/a/{shortName}")]
    Task<NbpCurrencySingle> GetOneTableA(string shortName);
}    
