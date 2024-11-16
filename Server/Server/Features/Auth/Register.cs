using Carter;
using Carter.ModelBinding;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Server.Contracts.Auth;
using Server.Data.Persistence;
using Server.Domain.Entities;
using Server.Security.Interfaces;

namespace Server.Features.Auth;

public class Register : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/register", async (RegisterRequest request, ISender sender) =>
        {
            var command = new Command(
                Email: request.Email.Trim().ToLower(), 
                Password: request.Password.Trim(), 
                LastName: request.LastName.Trim().ToLower(), 
                FirstName: request.FirstName.Trim().ToLower()
            );
            return await sender.Send(command);
            
        })
        .WithTags("Authentication");
    }

    public sealed record Command(
        string Email,
        string Password,
        string FirstName,
        string LastName) : IRequest<IResult>;

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
                .MaximumLength(20)
                .Matches(@"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$")
                .WithMessage("The password must contain at least one letter, one special character, and one digit");

            RuleFor(command => command.FirstName)
                .NotEmpty()
                .MaximumLength(150);

            RuleFor(command => command.LastName)
                .NotEmpty()
                .MaximumLength(150);
        }
    }

    internal sealed class Handler(
        AppDbContext dbContext, 
        IValidator<Command> validator,
        IPasswordService passwordService) : IRequestHandler<Command, IResult>
    {
        public async Task<IResult> Handle(Command command, CancellationToken ct)
        {
            var validationResult = await validator.ValidateAsync(command, ct);
            if (!validationResult.IsValid)
                return TypedResults.ValidationProblem(validationResult.GetValidationProblems());
            
            if (await dbContext.Users.AnyAsync(u => u.Email == command.Email, ct))
                return TypedResults.Conflict($"User: {command.Email} already exists");
            
            passwordService.CreatePasswordHash(command.Password, out var hash,  out var salt);
            var user = new User
            {
                Email = command.Email,
                PasswordHash = hash,
                PasswordSalt = salt,
                FirstName = command.FirstName,
                LastName = command.LastName
            };
            await dbContext.Users.AddAsync(user, ct);
            await dbContext.SaveChangesAsync(ct);
            
            return TypedResults.Created(user.Id.ToString(), new UserResponse(user));
        }
    }
}