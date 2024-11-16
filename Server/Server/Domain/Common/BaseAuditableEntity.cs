namespace Server.Domain.Common;

public class BaseAuditableEntity : BaseEntity
{
    public DateTime CreatedOn { get; init; } = DateTime.UtcNow;
    public DateTime ModifiedOn { get; set; }
}