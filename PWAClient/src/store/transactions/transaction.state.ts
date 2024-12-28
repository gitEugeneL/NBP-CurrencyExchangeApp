import { TransactionResponse } from './transaction.models';
import { atom } from 'jotai';
import axios, { AxiosError } from 'axios';
import { transactionApi } from './transactions.api';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { authState } from '../auth/auth.state.ts';

export interface StateScheme {
  transactions: TransactionResponse[];
  isLoading: boolean;
  error: string | null;
}

function getInitialState(): StateScheme {
  const state = localStorage.getItem('transactions');
  return state
    ? JSON.parse(state)
    : {
        transactions: [],
        isLoading: false,
        error: null
      };
}

export const transactionState = atomWithStorage<StateScheme>(
  'transactions',
  getInitialState(),
  createJSONStorage<StateScheme>(() => localStorage)
);

export const getAllTransactionsAtom = atom(
  async (get) => {
    return get(transactionState);
  },
  async (get, set) => {
    set(transactionState, {
      transactions: [],
      isLoading: true,
      error: null
    });
    try {
      const { accessToken } = await get(authState);
      const { data } = await axios.get<TransactionResponse[]>(
        transactionApi.getAll,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      set(transactionState, {
        transactions: data,
        isLoading: false,
        error: null
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(`getAllTransactions: ${error.status} status`);
        set(transactionState, {
          transactions: [],
          isLoading: false,
          error: error.response?.data
        });
      }
    }
  }
);
