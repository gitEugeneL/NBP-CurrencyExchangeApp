using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Domain.Entities;

namespace Server.Data.Persistence.Configurations;

public class CurrencyConfiguration : IEntityTypeConfiguration<Currency>
{
    public void Configure(EntityTypeBuilder<Currency> builder)
    {
        builder.HasIndex(currency => currency.Name)
            .IsUnique();

        builder.HasIndex(currency => currency.ShortName)
            .IsUnique();
        
        builder.HasIndex(currency => currency.Country)
            .IsUnique();
        
        builder.Property(currency => currency.Name)
            .HasMaxLength(50)
            .IsRequired();
        
        builder.Property(currency => currency.ShortName)
            .HasMaxLength(5)
            .IsRequired();
        
        builder.Property(currency => currency.Country)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(currency => currency.Symbol)
            .HasMaxLength(5)
            .IsRequired();
        
        builder.Property(currency => currency.Ratio)
            .IsRequired()
            .HasPrecision(2);
    }
}