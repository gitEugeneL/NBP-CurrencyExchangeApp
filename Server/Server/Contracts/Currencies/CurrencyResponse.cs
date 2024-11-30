using Server.Domain.Entities;

namespace Server.Contracts.Currencies;

public sealed class CurrencyResponse(Currency currency)
{
    public Guid CurrencyId { get; init; } = currency.Id;
    public string Name { get; init; } = currency.Name;
    public string ShortName { get; init; } = currency.ShortName;
    public string Country { get; init; } = currency.Country;
    public string Symbol { get; init; } = currency.Symbol;
    public decimal? BuyRate { get; init; }
    public decimal? SellRate { get; init; }
    public decimal? NbpRate { get; init; }
    public DateOnly? DateRate { get; init; }

    public CurrencyResponse(
        Currency currency, 
        decimal? buyRate = null, 
        decimal? sellRate = null, 
        decimal? nbpRate = null, 
        DateOnly? dateRate = null) : this(currency)
    {
        BuyRate = buyRate;
        SellRate = sellRate;
        NbpRate = nbpRate;
        DateRate = dateRate;
    }
}