import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { atom } from 'jotai';
import { LoginRequest, LoginResponse } from './auth.models';
import axios, { AxiosError } from 'axios';
import { authApi } from './auth.api';

export interface StateScheme {
  accessToken: string | null;
  expiresDate: Date | null;
  isLoading: boolean;
  error: string | null;
}

const storage = createJSONStorage<StateScheme>(() => localStorage);

export const authState = atomWithStorage<StateScheme>(
  'auth',
  {
    accessToken: null,
    expiresDate: null,
    isLoading: false,
    error: null
  },
  storage
);

export const loginAtom = atom(
  (get) => get(authState),
  async (_get, set, loginRequest: LoginRequest) => {
    set(authState, {
      accessToken: null,
      expiresDate: null,
      isLoading: true,
      error: null
    });

    try {
      const { data } = await axios.post<LoginResponse>(
        authApi.login,
        loginRequest
      );
      set(authState, {
        accessToken: data.accessToken,
        expiresDate: data.expiredDate,
        isLoading: false,
        error: null
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(`login request: ${error.status} status`);
        set(authState, {
          accessToken: null,
          expiresDate: null,
          isLoading: false,
          error: error.response?.data
        });
      }
    }
  }
);

export const logoutAtom = atom(null, async (_get, set) => {
  set(authState, {
    accessToken: null,
    expiresDate: null,
    isLoading: false,
    error: null
  });
});

export const resetErrorAtom = atom(null, async (_get, set) => {
  set(authState, (prev) => ({
    ...prev,
    error: null
  }));
});
