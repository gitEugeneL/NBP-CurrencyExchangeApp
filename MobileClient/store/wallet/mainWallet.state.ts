import { WalletResponse } from './wallet.models';
import { atom } from 'jotai/index';
import axios, { AxiosError } from 'axios';
import { authState } from '../auth/auth.state';
import { walletApi } from './wallet.api';

export interface StateSchema {
  mainWallet: WalletResponse | null;
  isLoading: boolean;
  error: string | null;
}

export const mainWalletState = atom<StateSchema>({
  mainWallet: null,
  isLoading: false,
  error: null,
});

export const getMainUserWalletAtom = atom(
  async (get) => {
    return get(mainWalletState);
  },
  async (get, set) => {
    set(mainWalletState, {
      mainWallet: null,
      isLoading: true,
      error: null,
    });
    try {
      const { accessToken } = await get(authState);
      const { data } = await axios.get<WalletResponse>(walletApi.getMainUserWallet, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set(mainWalletState, {
        mainWallet: data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(`getMainUserWallets: ${error.status} status`);
        set(mainWalletState, {
          mainWallet: null,
          isLoading: false,
          error: error.response?.data,
        });
      }
    }
  },
);
