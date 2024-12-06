export interface WalletOperationModalProps {
  isWithdraw: boolean;
  value: number;
  symbol: string;
  shortName: string;
  isVisible: boolean;
  onClose: () => void;
  operation: (amount: number, isWithdraw: boolean) => void;
}
