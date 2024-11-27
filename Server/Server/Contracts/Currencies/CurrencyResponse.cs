using Server.Domain.Entities;

namespace Server.Contracts.Currencies;

public sealed class CurrencyResponse(Currency currency)
{
    public Guid CurrencyId { get; init; } = currency.Id;
    public string Name { get; init; } = currency.Name;
    public string ShortName { get; init; } = currency.ShortName;
    public string Country { get; init; } = currency.Country;
    public string Symbol { get; init; } = currency.Symbol;
    
    // todo
    // add exchange rates with NBP data
    public double BuyingRate { get; init; } = -1;
    public double SellingRate { get; init; } = -1;
}