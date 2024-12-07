namespace Server.Contracts.Wallets;

public sealed record MoveMoneyRequest(
    Guid WalletId,
    decimal Amount,
    string Operation
);
