using Server.Domain.Common;

namespace Server.Domain.Entities;

public class Currency : BaseEntity
{
    public required string Name { get; init; }
    public required string ShortName { get; init; }
    public required string Country { get; init; }
    public required string Symbol { get; init; }
    public required decimal Ratio { get; init; }
    
    /*** Relations ***/
    public List<Wallet> Wallets { get; init; } = [];
    public List<Vault> Vaults { get; init; } = [];
}