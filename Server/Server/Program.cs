using System.Reflection;
using System.Security.Claims;
using System.Text;
using Carter;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Refit;
using Server.Data.Persistence;
using Server.Helpers;
using Server.Integrations;
using Server.Security;
using Server.Security.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddScoped<ITokenService, TokenService>()
    .AddScoped<IUserService, UserService>()
    .AddScoped<INpbService, NpbService>()
    .AddScoped<IPasswordService, PasswordService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/*** Database connection ***/
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlite(builder.Configuration.GetConnectionString("SQLite")));

/*** MediatR configuration ***/
builder.Services.AddMediatR(config =>
    config.RegisterServicesFromAssembly(typeof(Program).Assembly));

/*** FluentValidation files register ***/
builder.Services
    .AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

/*** Carter configuration ***/
builder.Services.AddCarter();

/*** CORS configurations ***/
builder.Services.AddCors(options =>
{
     options.AddPolicy("mobileApp", policyBuilder =>
     {

         policyBuilder.AllowAnyOrigin();
         policyBuilder.AllowAnyHeader();
         policyBuilder.AllowAnyMethod();
         // policyBuilder.AllowCredentials();
     });
});

/*** JWT  auth configuration ***/
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(builder.Configuration.GetSection("Authentication:Key").Value!)),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
        };
    });

/*** Auth policies ***/
builder.Services.AddAuthorizationBuilder()
    .AddPolicy(AppConstants.BaseAuthPolicy, policy =>
        policy
            .RequireClaim(ClaimTypes.Email)
            .RequireClaim(ClaimTypes.NameIdentifier));

/*** Nbp integration ***/
builder.Services.AddRefitClient<INbpEndpoints>().ConfigureHttpClient((sp, httpClient) =>
    httpClient.BaseAddress = new Uri(builder.Configuration.GetSection("NBPIntegration").Value!));

var app = builder.Build();

/*** Seed develop database data ***/
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetService<AppDbContext>()!;
    DataInitializer.Init(context);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapCarter();

app.UseHttpsRedirection();

app.UseCors("mobileApp");

app.Run();
