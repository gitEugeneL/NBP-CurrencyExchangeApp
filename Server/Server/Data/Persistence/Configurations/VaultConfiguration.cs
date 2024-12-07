using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Domain.Entities;

namespace Server.Data.Persistence.Configurations;

public class VaultConfiguration : IEntityTypeConfiguration<Vault>
{
    public void Configure(EntityTypeBuilder<Vault> builder)
    {
        builder.Property(vault => vault.Value)
            .IsRequired()
            .HasPrecision(2);
        
        /*** Restrictions ***/
        builder.HasOne(vault => vault.Currency)
            .WithMany(currency => currency.Vaults);
    }
}