using System.Security.Claims;
using Server.Security.Interfaces;

namespace Server.Security;

public class UserService : IUserService
{
    public Guid ReadUserIdFromToken(HttpContext httpContext)
    {
        return Guid.Parse(
            httpContext
                .User
                .FindFirstValue(ClaimTypes.NameIdentifier)!
        );
    }
}