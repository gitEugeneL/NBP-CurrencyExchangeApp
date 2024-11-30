namespace Server.Integrations.NbpApi.Models;

public sealed class NbpCurrencyTableC
{
    public required string Currency { get; init; }
    public required string Code { get; init; }
    public decimal Bid { get; init; }
    public decimal Ask { get; init; }  
}