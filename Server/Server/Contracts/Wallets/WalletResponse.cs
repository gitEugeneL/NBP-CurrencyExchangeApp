using Server.Domain.Entities;

namespace Server.Contracts.Wallets;

public sealed class WalletResponse(Wallet wallet)
{
    public Guid WalletId { get; init; } = wallet.Id;
    public decimal Value { get; init; } = wallet.Value;
    public Guid CurrencyId { get; init; } = wallet.CurrencyId;
    public string CurrencyName { get; init; } = wallet.Currency.Name;
    public string CurrencyShortName { get; init; } = wallet.Currency.ShortName;
}