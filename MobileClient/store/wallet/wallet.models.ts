export interface WalletResponse {
  walletId: string;
  value: number;
  currencyId: string;
  currencyName: string;
  currencySymbol: string;
  currencyCountry: string;
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

export interface MoveMoneyRequest {
  walletId: string;
  amount: number;
  operation: 'buy' | 'sell';
}
