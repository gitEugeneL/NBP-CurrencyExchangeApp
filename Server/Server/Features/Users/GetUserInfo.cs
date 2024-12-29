using Carter;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Server.Contracts.Users;
using Server.Data.Persistence;
using Server.Domain.Entities;
using Server.Helpers;
using Server.Integrations.OpenCageApi;
using Server.Security.Interfaces;

namespace Server.Features.Users;

public class GetUserInfo : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/user/info", async ([AsParameters] GetUserParams userParams, HttpContext httpContext, ISender sender, IUserService userService) =>
            {
                var query = new Query(
                    CurrentUserId: userService.ReadUserIdFromToken(httpContext),
                    UserLatitude: userParams.UserLatitude ?? null,
                    UserLongitude: userParams.UserLongitude ?? null
                );
                return await sender.Send(query);
            })
            .RequireAuthorization(AppConstants.BaseAuthPolicy)
            .WithTags(nameof(User))
            .Produces<UserResponse>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound);
    }

    public sealed record Query(
        Guid CurrentUserId, 
        string? UserLatitude = null,
        string? UserLongitude = null) : IRequest<IResult>;
    
    internal sealed class Handler(AppDbContext dbContext, IOpenCageService openCageService) : IRequestHandler<Query, IResult>
    {
        public async Task<IResult> Handle(Query query, CancellationToken ct)
        {
            var user = await dbContext
                .Users
                .AsNoTracking()
                .SingleOrDefaultAsync(u => u.Id == query.CurrentUserId, ct);

            var geoData = query.UserLatitude is not null && query.UserLongitude is not null
                ? await  openCageService.GetGeoModel(query.UserLatitude, query.UserLongitude)
                : string.Empty;
            
            return user is not null
                ? TypedResults.Ok(new UserResponse(user, geoData))
                : TypedResults.NotFound($"User with id: {query.CurrentUserId} not found");
        }
    }
}