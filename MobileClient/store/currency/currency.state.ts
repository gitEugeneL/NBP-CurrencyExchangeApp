import { atom } from 'jotai';
import { CurrencyParams, CurrencyResponse } from './currency.models';
import axios, { AxiosError } from 'axios';
import { authState } from '../auth/auth.state';
import { currencyApi } from './currency.api';

export interface StateSchema {
  currencies: CurrencyResponse[];
  isLoading: boolean;
  error: string | null;
}

export const currencyState = atom<StateSchema>({
  currencies: [],
  isLoading: false,
  error: null,
});

export const getAllCurrenciesAtom = atom(
  async (get) => {
    return get(currencyState);
  },
  async (get, set, requestParams: CurrencyParams) => {
    set(currencyState, {
      currencies: [],
      isLoading: true,
      error: null,
    });
    try {
      const { accessToken } = await get(authState);
      const { data } = await axios.get<CurrencyResponse[]>(currencyApi.getAllCurrencies, {
        params: {
          ...requestParams,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set(currencyState, {
        currencies: data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(`getAllCurrencies: ${error.status} status`);
        set(currencyState, {
          currencies: [],
          isLoading: false,
          error: error.response?.data,
        });
      }
    }
  },
);
