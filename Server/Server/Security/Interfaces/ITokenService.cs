using Server.Domain.Entities;

namespace Server.Security.Interfaces;

public interface ITokenService
{
    Tuple<string, DateTime> GenerateAccessToken(User user);

    Guid ReadUserIdFromToken(HttpContext httpContext);
}