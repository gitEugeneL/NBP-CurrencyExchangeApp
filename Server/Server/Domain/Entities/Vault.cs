using Server.Domain.Common;

namespace Server.Domain.Entities;

public class Vault : BaseEntity
{
    public required decimal Value { get; set; }
    
    /** Relations **/
    public Guid CurrencyId { get; init; }
    public required Currency Currency { get; init; }
}