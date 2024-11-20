using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Domain.Entities;

namespace Server.Data.Persistence.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasIndex(user => user.Email)
            .IsUnique();

        builder.Property(user => user.Email)
            .IsRequired()
            .HasMaxLength(250);

        builder.Property(user => user.Username)
            .IsRequired()
            .HasMaxLength(150);
        
        builder.Property(user => user.PasswordHash)
            .IsRequired();

        builder.Property(user => user.PasswordSalt)
            .IsRequired();
        
        builder.Property(user => user.ModifiedOn)
            .HasDefaultValueSql("CURRENT_TIMESTAMP");
    }
}