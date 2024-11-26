using Server.Domain.Entities;

namespace Server.Contracts.Currencies;

public sealed class CurrencyResponse(Currency currency)
{
    public string Name { get; init; } = currency.Name;
    public string ShortName { get; init; } = currency.ShortName;
    // todo
    // add exchange rates with NBP data
    public double BuyingRate { get; init; } = -1;
    public double SellingRate { get; init; } = -1;
}