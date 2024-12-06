export interface CurrencyOperationModalProps {
  rate: number;
  maxValue: number;
  name: string;
  shortName: string;
  symbol: string;
  isVisible: boolean;
  operationType: 'buy' | 'sell';
  onClose: () => void;
  operation: () => void;
}
