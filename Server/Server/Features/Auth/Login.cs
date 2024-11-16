using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Server.Contracts.Auth;
using Server.Data.Persistence;
using Server.Security.Interfaces;

namespace Server.Features.Auth;

public class Login : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/login", async (LoginRequest request, ISender sender) =>
            {
                var command = new Command(
                    Email: request.Email.Trim().ToLower(),
                    Password: request.Password.Trim()
                );
                return await sender.Send(command);
            })
            .WithTags("Authentication")
            .Produces<LoginResponse>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status404NotFound);
    }

    public sealed record Command(
        string Email,
        string Password) : IRequest<IResult>;
    
    public sealed class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(command => command.Email)
                .NotEmpty()
                .EmailAddress();

            RuleFor(command => command.Password)
                .NotEmpty()
                .MinimumLength(8)
                .MaximumLength(20);
        }
    }
    
    internal sealed class Handler(
        AppDbContext dbContext,
        IValidator<Command> validator,
        IPasswordService passwordService,
        ITokenService tokenService) : IRequestHandler<Command, IResult>
    {
        public async Task<IResult> Handle(Command command, CancellationToken ct)
        {
            var validationResult = await validator.ValidateAsync(command, ct);
            if (!validationResult.IsValid)
                return TypedResults.ValidationProblem(validationResult.GetValidationProblems());

            var user = await dbContext
                .Users
                .SingleOrDefaultAsync(u => u.Email == command.Email, ct);
            
            if (user is null || !passwordService.VerifyPasswordHash(command.Password, user.PasswordHash, user.PasswordSalt))
                return TypedResults.NotFound("login or password is incorrect");

            var accessToken = tokenService.GenerateAccessToken(user).Item1;
            var accessTokenExpiresDate = tokenService.GenerateAccessToken(user).Item2;
            
            return TypedResults.Ok(new LoginResponse(accessToken, accessTokenExpiresDate));
        }
    }
}

