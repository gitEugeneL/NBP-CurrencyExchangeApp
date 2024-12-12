using Server.Domain.Common;

namespace Server.Domain.Entities;

public class Transaction : BaseEntity
{
    public decimal InputAmount { get; init; }
    public decimal OutputAmount { get; init; }
    public decimal ExchangeRate { get; init; }
    public DateTime Date { get; init; } = DateTime.UtcNow;
    
    /** Relations **/
    public Guid UserId { get; init; }
    public required User User { get; init; }
    
    public Guid InputCurrencyId { get; init; }
    public required Currency InputCurrency { get; init; }
    
    public Guid OutputCurrencyId { get; init; }
    public required Currency OutputCurrency { get; init; }
    
}