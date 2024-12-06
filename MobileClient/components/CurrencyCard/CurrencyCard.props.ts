export interface CurrencyCardProps {
  date: Date;
  name: string;
  shortName: string;
  symbol: string;
  buyRate: number | null;
  sellRate: number | null;
  nbpRate: number | null;
  walletValue?: number | null;
  baseValue?: number | null;
  walletId?: string;
  appearance?: 'buy' | 'sell' | 'default';
}
