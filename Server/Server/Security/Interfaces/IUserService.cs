namespace Server.Security.Interfaces;

public interface IUserService
{
    Guid ReadUserIdFromToken(HttpContext httpContext);
}