namespace Server.Contracts.Auth;

public sealed record RegisterRequest(
    string Email,
    string Password,
    string Username
);