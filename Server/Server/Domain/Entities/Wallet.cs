using Server.Domain.Common;

namespace Server.Domain.Entities;

public class Wallet : BaseEntity
{
    public required double Value { get; set; } 
    
    /** Relations **/
    public Guid UserId { get; init; }
    public required User User { get; init; }
    
    public Guid CurrencyId { get; init; }
    public required Currency Currency { get; init; }
}