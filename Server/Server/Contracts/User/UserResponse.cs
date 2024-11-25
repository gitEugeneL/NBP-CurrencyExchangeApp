namespace Server.Contracts.User;

public sealed class UserResponse(Domain.Entities.User user)
{
    public Guid UserId { get; init; } = user.Id;
    public string Email { get; init; } = user.Email;
    public string Username { get; init; } = user.Username;
}