using Server.Domain.Entities;

namespace Server.Contracts.Users;

public sealed class UserResponse(User user, string geoData)
{
    public Guid UserId { get; init; } = user.Id;
    public string Email { get; init; } = user.Email;
    public string Username { get; init; } = user.Username;
    public string GeoData { get; init; } = geoData;
}