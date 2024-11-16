using Server.Domain.Common;

namespace Server.Domain.Entities;

public class User : BaseAuditableEntity
{
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    
    public required string Email { get; init; }
    
    public required byte[] PasswordHash { get; init; }
    public required byte[] PasswordSalt { get; init; }
}