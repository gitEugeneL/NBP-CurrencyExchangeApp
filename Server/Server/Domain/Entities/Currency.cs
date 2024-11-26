using Server.Domain.Common;

namespace Server.Domain.Entities;

public class Currency : BaseEntity
{
    public required string Name { get; init; }
    public required string ShortName { get; init; }
    public required double Ratio { get; init; }
    
    /*** Relations ***/
    public List<Wallet> Wallets { get; init; } = [];
}