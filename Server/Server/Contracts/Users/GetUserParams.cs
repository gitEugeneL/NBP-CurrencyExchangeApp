namespace Server.Contracts.Users;

public sealed record GetUserParams(
    string? UserLatitude = null,
    string? UserLongitude = null
);