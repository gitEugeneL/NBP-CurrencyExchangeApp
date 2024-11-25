using Carter;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Server.Contracts.User;
using Server.Data.Persistence;
using Server.Domain.Entities;
using Server.Helpers;
using Server.Security.Interfaces;

namespace Server.Features.Users;

public class GetUserInfo : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/user/info", async (HttpContext httpContext, ISender sender, ITokenService tokenService) =>
            {
                var query = new Query(tokenService.ReadUserIdFromToken(httpContext));
                return await sender.Send(query);
            })
            .RequireAuthorization(AppConstants.BaseAuthPolicy)
            .WithTags(nameof(User))
            .Produces<UserResponse>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound);
    }

    public sealed record Query(Guid CurrentUserId) : IRequest<IResult>;
    
    internal sealed class Handler(AppDbContext dbContext) : IRequestHandler<Query, IResult>
    {
        public async Task<IResult> Handle(Query query, CancellationToken ct)
        {
            var user = await dbContext
                .Users
                .AsNoTracking()
                .SingleOrDefaultAsync(u => u.Id == query.CurrentUserId, ct);

            return user is not null
                ? TypedResults.Ok(new UserResponse(user))
                : TypedResults.NotFound($"User with id: {query.CurrentUserId} not found");
        }
    }
}