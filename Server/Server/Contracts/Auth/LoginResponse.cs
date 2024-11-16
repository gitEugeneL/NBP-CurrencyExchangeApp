namespace Server.Contracts.Auth;

public sealed class LoginResponse(string accessToken, DateTime expiredDate, string tokenType = "Bearer")
{
    public string AccessToken { get; init; } = accessToken;
    public string AccessTokenType { get; init; } = tokenType;
    public DateTime ExpiredDate { get; init; } = expiredDate;
}