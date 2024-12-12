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

        var currencies = new[]
        {
            new Currency { Name = "Zloty", ShortName = "PLN", Country = "Poland", Symbol = "zł", Ratio = 0 },
            new Currency { Name = "Euro", ShortName = "EUR", Country = "European Union", Symbol = "€", Ratio = 0.02m },
            new Currency { Name = "Dollar USA", ShortName = "USD", Country = "USA", Symbol = "$", Ratio = 0.02m },
            new Currency { Name = "Pound Sterling", ShortName = "GBP", Country = "United Kingdom", Symbol = "\u00a3", Ratio = 0.03m },
            new Currency { Name = "Franc", ShortName = "CHF", Country = "Switzerland", Symbol = "\u20a3", Ratio = 0.03m },
            new Currency { Name = "Dollar", ShortName = "CAD", Country = "Canada", Symbol = "$", Ratio = 0.03m }
        };

        context.Currencies.AddRange(currencies);
        context.SaveChanges();

        var vaults = currencies.Select(currency => new Vault
        {
            Value = value,
            Currency = currency
        }).ToArray();
    
        context.Vaults.AddRange(vaults);
        context.SaveChanges();
    }

}