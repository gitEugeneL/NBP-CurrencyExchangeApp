export interface TransactionResponse {
  transactionId: string;
  transactionDate: Date;
  inputAmount: number;
  outputAmount: number;
  inputCurrencyShortName: string;
  inputCurrencySymbol: string;
  outputCurrencyShortName: string;
  outputCurrencySymbol: string;
}
