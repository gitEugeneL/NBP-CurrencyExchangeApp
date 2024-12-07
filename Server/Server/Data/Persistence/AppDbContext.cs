using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Server.Domain.Entities;

namespace Server.Data.Persistence;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public required DbSet<User> Users { get; init; }
    public required DbSet<Currency> Currencies { get; init; }
    public required DbSet<Wallet> Wallets { get; init; }
    public required DbSet<Vault> Vaults { get; init; }
    public required DbSet<Transaction> Transactions { get; init; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(modelBuilder);
    }
}