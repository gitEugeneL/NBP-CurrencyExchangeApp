using Server.Domain.Entities;

namespace Server.Contracts.Transactions;

public class TransactionResponse(Transaction transaction)
{
    public Guid TransactionId { get; init; } = transaction.Id;
    public DateTime TransactionDate {get; init; } = transaction.Date;
    public decimal InputAmount { get; init; } = transaction.InputAmount;
    public decimal OutputAmount { get; init; } = transaction.OutputAmount;
    public string InputCurrencyShortName { get; init; } = transaction.InputCurrency.ShortName;
    public string InputCurrencySymbol { get; init; } = transaction.InputCurrency.Symbol;
    public string OutputCurrencyShortName { get; init; } = transaction.OutputCurrency.ShortName;
    public string OutputCurrencySymbol { get; init; } = transaction.OutputCurrency.Symbol;
}