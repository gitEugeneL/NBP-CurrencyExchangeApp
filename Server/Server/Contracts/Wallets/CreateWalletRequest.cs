namespace Server.Contracts.Wallets;

public sealed record CreateWalletRequest(
    Guid CurrencyId
);