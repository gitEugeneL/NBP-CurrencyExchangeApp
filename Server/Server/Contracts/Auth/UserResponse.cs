using Server.Domain.Entities;

namespace Server.Contracts.Auth;

public sealed class UserResponse(User user)
{
    public Guid UserId { get; init; } = user.Id;
    public string Email { get; init; } = user.Email;
    public string Username { get; init; } = user.Username;
}