namespace Server.Contracts.Wallets;

public sealed record AddMoneyRequest(
    Guid WalletId,
    decimal Amount
);