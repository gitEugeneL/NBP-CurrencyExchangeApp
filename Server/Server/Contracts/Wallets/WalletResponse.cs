using Server.Domain.Entities;

namespace Server.Contracts.Wallets;

public sealed class WalletResponse(Wallet wallet)
{
    public Guid WalletId { get; init; } = wallet.Id;
    public decimal Value { get; init; } = decimal.Round(wallet.Value, 2);
    public Guid CurrencyId { get; init; } = wallet.CurrencyId;
    public string CurrencyName { get; init; } = wallet.Currency.Name;
    public string CurrencySymbol { get; init; } = wallet.Currency.Symbol;
    public string CurrencyCountry { get; init; } = wallet.Currency.Country;
    public string CurrencyShortName { get; init; } = wallet.Currency.ShortName;
}