export interface WalletResponse {
  walletId: string;
  value: number;
  currencyId: string;
  currencyName: string;
  currencyShortName: string;
}

export interface CreateWalletRequest {
  currencyId: string;
}

export interface WalletOperationsRequest {
  walletId: string;
  amount: number;
  isWithdraw: boolean;
}
