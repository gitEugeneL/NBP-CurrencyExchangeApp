import { atom } from 'jotai';
import { CreateWalletRequest, WalletResponse } from './wallet.models';
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
