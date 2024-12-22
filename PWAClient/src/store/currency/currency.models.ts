export interface CurrencyResponse {
  currencyId: string;
  name: string;
  shortName: string;
  country: string;
  symbol: string;
  buyRate: number | null;
  sellRate: number | null;
  nbpRate: number | null;
  dateRate: Date;
}

export interface CurrencyParams {
  withRate: boolean;
  currencyDate: string | null;
}
