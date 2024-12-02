export interface CurrencyCardProps {
  date: Date;
  name: string;
  shortName: string;
  buyRate: number | null;
  sellRate: number | null;
  nbpRate: number | null;
  walletId?: string;
  appearance?: 'buy' | 'sell' | 'default';
}
