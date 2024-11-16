using System.Reflection;
using Carter;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Server.Data.Persistence;
using Server.Security;
using Server.Security.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddScoped<ITokenService, TokenService>()
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

app.Run();
