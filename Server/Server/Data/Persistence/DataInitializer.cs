namespace Server.Data.Persistence;

public static class DataInitializer
{
    public static void Init(AppDbContext context)
    {
        context.Database.EnsureCreated();
    }
    
    // todo seed default data
}