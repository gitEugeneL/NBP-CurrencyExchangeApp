namespace Server.Contracts.Auth;

public sealed record LoginRequest(
    string Email,
    string Password
);