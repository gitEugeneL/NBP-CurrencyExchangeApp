namespace Server.Contracts.Auth;

public sealed class RegisterResponse(Guid userId)
{
    public Guid UserId { get; init; } = userId;
}