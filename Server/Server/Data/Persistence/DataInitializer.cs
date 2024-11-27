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
        if (context.Currencies.Any()) 
            return;
        
        var currencies = new[]
        {
            new Currency { Name = "Zloty", ShortName = "PLN", Country = "Poland", Symbol = "zł", Ratio = 0 },
            new Currency { Name = "Euro", ShortName = "EUR", Country = "European Union", Symbol = "€", Ratio = 0.05 },
            new Currency { Name = "Dollar USA", ShortName = "USD", Country = "USA", Symbol = "$", Ratio = 0.07 },
            new Currency { Name = "Pound Sterling", ShortName = "GBR", Country = "United Kingdom", Symbol = "\u00a3", Ratio = 0.05 },
            new Currency { Name = "Franc", ShortName = "CHF", Country = "Switzerland", Symbol = "\u20a3", Ratio = 0.1 },
            new Currency { Name = "Dollar", ShortName = "CAD", Country = "Canada", Symbol = "$", Ratio = 0.1 }
        };
        
        context.Currencies.AddRange(currencies);
        context.SaveChanges();
    }
}