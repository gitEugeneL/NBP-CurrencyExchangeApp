namespace Server.Contracts.Wallets;

public sealed record WalletOperationsRequest(
    Guid WalletId,
    decimal Amount,
    bool IsWithdraw = false
);