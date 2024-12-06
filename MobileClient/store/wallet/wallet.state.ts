import { atom } from 'jotai';
import {
  CreateWalletRequest,
  MoveMoneyRequest,
  WalletOperationsRequest,
  WalletResponse,
} from './wallet.models';
import axios, { AxiosError } from 'axios';
import { authState } from '../auth/auth.state';
import { walletApi } from './wallet.api';

export interface StateSchema {
  wallets: WalletResponse[];
  isLoading: boolean;
  error: string | null;
}

export const walletState = atom<StateSchema>({
  wallets: [],
  isLoading: false,
  error: null,
});

export const getUserWalletsAtom = atom(
  async (get) => {
    return get(walletState);
  },
  async (get, set) => {
    set(walletState, {
      wallets: [],
      isLoading: true,
      error: null,
    });
    try {
      const { accessToken } = await get(authState);
      const { data } = await axios.get<WalletResponse[]>(walletApi.getUserWallets, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set(walletState, {
        wallets: data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(`getUserWallets: ${error.status} status`);
        set(walletState, {
          wallets: [],
          isLoading: false,
          error: error.response?.data,
        });
      }
    }
  },
);

export const createUserWalletAtom = atom(
  async (get) => {
    return get(walletState);
  },

  async (get, set, createWalletRequest: CreateWalletRequest) => {
    set(walletState, (prevState) => ({
      ...prevState,
      isLoading: true,
      error: null,
    }));
    try {
      const { accessToken } = await get(authState);
      const { data } = await axios.post<WalletResponse>(
        walletApi.createUserWallet,
        createWalletRequest,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      set(walletState, (prevState) => ({
        ...prevState,
        wallets: [...prevState.wallets, data],
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(`createUserWallet: ${error.status} status`);
        set(walletState, (prevState) => ({
          ...prevState,
          isLoading: false,
          error: error.response?.data,
        }));
      }
    }
  },
);

export const walletOperationAtom = atom(
  async (get) => {
    return get(walletState);
  },

  async (get, set, walletOperationsRequest: WalletOperationsRequest) => {
    set(walletState, (prevState) => ({
      ...prevState,
      isLoading: true,
      error: null,
    }));
    try {
      const { accessToken } = await get(authState);
      const { data } = await axios.put<WalletResponse>(
        walletApi.walletOperations,
        walletOperationsRequest,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      set(walletState, (prevState) => ({
        ...prevState,
        wallets: prevState.wallets.map((wallet) =>
          wallet.walletId === data.walletId ? data : wallet,
        ),
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(`Add money: ${error.status} status`);
        set(walletState, (prevState) => ({
          ...prevState,
          isLoading: false,
          error: error.response?.data,
        }));
      }
    }
  },
);

export const buyMoneyAtom = atom(
  async (get) => {
    return get(walletState);
  },

  async (get, set, moveMoneyRequest: MoveMoneyRequest) => {
    set(walletState, (prevState) => ({
      ...prevState,
      isLoading: true,
      error: null,
    }));
    try {
      const { accessToken } = await get(authState);
      const { data } = await axios.post<WalletResponse[]>(walletApi.buyMoney, moveMoneyRequest, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set(walletState, {
        wallets: data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(`Buy money: ${error.status} status`);
        set(walletState, (prevState) => ({
          ...prevState,
          isLoading: false,
          error: error.response?.data,
        }));
      }
    }
  },
);
