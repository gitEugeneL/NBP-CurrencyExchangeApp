namespace Server.Integrations.NbpApi.Models;

public sealed class NbpCurrencySingle
{
    public required string Currency { get; init; }
    
    public required string Code { get; init; }

    public required List<Rate> Rates { get; init; }
}

public sealed class Rate
{
    public required double Mid { get; init; }
}