namespace Server.Contracts.Integrations.NbpApi.Contracts;

public sealed class GetAllNbpCurrenciesResponse<T>
{
    public string EffectiveDate { get; init; } = string.Empty;
    public List<T> Rates { get; init; } = [];
}