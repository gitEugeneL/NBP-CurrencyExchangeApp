using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Server.Domain.Entities;
using Server.Security.Interfaces;

namespace Server.Security;

public class TokenService(IConfiguration configuration) : ITokenService
{
    public Tuple<string, DateTime> GenerateAccessToken(User user)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Name, user.Username),
        };

        var settings = configuration.GetSection("Authentication:Key").Value!;
        var accessTokenRange = int.Parse(configuration.GetSection("Authentication:TokenLifetimeDays").Value!);
        
        var expiresDate = DateTime.UtcNow.AddDays(accessTokenRange);
        
        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(settings));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var descriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = expiresDate,
            SigningCredentials = credentials
        };
        var handler = new JwtSecurityTokenHandler();
        var token = handler.CreateToken(descriptor);
        
        return Tuple.Create(handler.WriteToken(token), expiresDate);
    }

    public Guid ReadUserIdFromToken(HttpContext httpContext)
    {
        return Guid.Parse(
            httpContext
            .User
            .FindFirstValue(ClaimTypes.NameIdentifier)!
        );
    }
}
  