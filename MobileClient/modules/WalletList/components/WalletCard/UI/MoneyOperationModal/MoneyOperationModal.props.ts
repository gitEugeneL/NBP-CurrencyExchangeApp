export interface MoneyOperationModalProps {
  isWithdraw: boolean;
  value: string;
  symbol: string;
  shortName: string;
  isVisible: boolean;
  onClose: () => void;
  operation: (amount: number, isWithdraw: boolean) => void;
}
