using Server.Domain.Entities;

namespace Server.Contracts.Auth;

public sealed class UserResponse(User user)
{
    public Guid UserId { get; init; } = user.Id;
    public string Email { get; init; } = user.Email;
    public string FirstName { get; init; } = user.FirstName;
    public string LastName { get; init; } = user.LastName;
}