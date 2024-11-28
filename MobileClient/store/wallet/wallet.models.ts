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

export interface AddMoneyRequest {
  walletId: string;
  amount: number;
}
