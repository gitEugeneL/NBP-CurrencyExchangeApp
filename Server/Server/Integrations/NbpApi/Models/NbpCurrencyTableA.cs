namespace Server.Integrations.NbpApi.Models;

public sealed class NbpCurrencyTableA
{
    public required string Currency { get; init; }
    public required string Code { get; init; }
    public double Mid { get; init; }
}