using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Domain.Entities;

namespace Server.Data.Persistence.Configurations;

public class WalletConfigurations : IEntityTypeConfiguration<Wallet>
{
    public void Configure(EntityTypeBuilder<Wallet> builder)
    {
        builder.Property(wallet => wallet.Value)
            .IsRequired()
            .HasPrecision(2);
        
        /*** Restrictions ***/
        builder.HasIndex(wallet => new { wallet.UserId, wallet.CurrencyId })
            .IsUnique();
        
        /*** Relations ***/
        builder.HasOne(wallet => wallet.User)
            .WithMany(user => user.Wallets);

        builder.HasOne(wallet => wallet.Currency)
            .WithMany(currency => currency.Wallets);
    }
}