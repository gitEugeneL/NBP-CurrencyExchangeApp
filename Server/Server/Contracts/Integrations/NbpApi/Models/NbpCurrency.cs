namespace Server.Contracts.Integrations.NbpApi.Models;

public sealed class NbpCurrency
{
    public required string Currency { get; init; }
    public required string Code { get; init; }
    public double Mid { get; init; }
    public decimal Bid { get; init; }
    public decimal Ask { get; init; }  
}