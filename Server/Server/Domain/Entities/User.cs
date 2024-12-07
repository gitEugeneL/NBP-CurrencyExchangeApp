using Server.Domain.Common;

namespace Server.Domain.Entities;

public class User : BaseEntity
{
    public required string Username { get; init; }
    public required string Email { get; init; }
    public required byte[] PasswordHash { get; init; }
    public required byte[] PasswordSalt { get; init; }

    /** Relations **/
    public List<Wallet> Wallets { get; init; } = [];
    public List<Transaction> Transactions { get; init; } = [];
} 