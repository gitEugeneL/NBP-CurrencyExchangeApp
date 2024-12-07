using Server.Domain.Entities;

namespace Server.Data.Persistence;

public static class DataInitializer
{
    public static void Init(AppDbContext context)
    {
        context.Database.EnsureCreated();
        Seed(context);
    }
    
    private static void Seed(AppDbContext context)
    {
        if (context.Vaults.Any()) 
            return;

        const int value = 1000000;
        
        var vaults = new[]
        {
            new Vault
            {
                Value = value,
                Currency = new Currency
                {
                    Name = "Zloty",
                    ShortName = "PLN",
                    Country = "Poland",
                    Symbol = "zł",
                    Ratio = 0
                }
            },

            new Vault
            {
                Value = value,
                Currency = new Currency
                {
                    Name = "Euro",
                    ShortName = "EUR",
                    Country = "European Union",
                    Symbol = "€",
                    Ratio = (decimal)0.02
                }
            },

            new Vault
            {
                Value = value,
                Currency = new Currency
                {
                    Name = "Dollar USA",
                    ShortName = "USD",
                    Country = "USA",
                    Symbol = "$",
                    Ratio = (decimal)0.02
                }

            },

            new Vault
            {
                Value = value,
                Currency = new Currency
                {
                    Name = "Pound Sterling",
                    ShortName = "GBP",
                    Country = "United Kingdom",
                    Symbol = "\u00a3",
                    Ratio = (decimal)0.03
                }
            },

            new Vault
            {
                Value = value,
                Currency = new Currency
                {
                    Name = "Franc",
                    ShortName = "CHF",
                    Country = "Switzerland",
                    Symbol = "\u20a3",
                    Ratio = (decimal)0.03
                }
            },

            new Vault
            {
                Value = value,
                Currency = new Currency
                {
                    Name = "Dollar",
                    ShortName = "CAD",
                    Country = "Canada",
                    Symbol = "$",
                    Ratio = (decimal)0.03
                }
            }
        };
        
        context.Vaults.AddRange(vaults);
        context.SaveChanges();
    }
}