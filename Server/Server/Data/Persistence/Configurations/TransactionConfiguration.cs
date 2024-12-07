using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Domain.Entities;

namespace Server.Data.Persistence.Configurations;

public class TransactionConfiguration : IEntityTypeConfiguration<Transaction>
{
    public void Configure(EntityTypeBuilder<Transaction> builder)
    {
        builder.Property(transaction => transaction.InputAmount)
            .IsRequired()
            .HasPrecision(2);
        
        builder.Property(transaction => transaction.OutputAmount)
            .IsRequired()
            .HasPrecision(2);

        builder.Property(transaction => transaction.ExchangeRate)
            .IsRequired()
            .HasPrecision(2);

        /*** Restrictions ***/
        builder.HasOne(transaction => transaction.User)
            .WithMany(user => user.Transactions);
        
        builder.HasOne(transaction => transaction.InputCurrency)
            .WithMany(currency => currency.InputTransactions);
        
        builder.HasOne(transaction => transaction.OutputCurrency)
            .WithMany(currency => currency.OutputTransactions);
    }
}