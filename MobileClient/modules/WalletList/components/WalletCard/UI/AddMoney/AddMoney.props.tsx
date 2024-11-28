export interface AddMoneyProps {
  value: string;
  symbol: string;
  shortName: string;
  isVisible: boolean;
  onClose: () => void;
  onAddMoney: (amount: number) => void;
}
