namespace Server.Contracts.Currencies;

public sealed record GetAllCurrenciesParams(
    bool WithRate = false, 
    DateOnly? CurrencyDate = null
);