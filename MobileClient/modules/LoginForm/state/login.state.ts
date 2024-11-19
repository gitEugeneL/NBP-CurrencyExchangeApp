import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'jotai';
import { LoginRequest, LoginResponse } from './login.models';
import axios, { AxiosError } from 'axios';
import { API } from './api';

export interface StateScheme {
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
}

const storage = createJSONStorage<StateScheme>(() => AsyncStorage);

export const StateAtom = atomWithStorage<StateScheme>(
  'auth',
  {
    accessToken: null,
    isLoading: false,
    error: null,
  },
  storage,
);

export const LoginAtom = atom(
  (get) => get(StateAtom),
  async (_get, set, loginRequest: LoginRequest) => {
    set(StateAtom, {
      accessToken: null,
      isLoading: true,
      error: null,
    });

    try {
      const { data } = await axios.post<LoginResponse>(API.login, {
        email: loginRequest.email,
        password: loginRequest.password,
      });
      set(StateAtom, {
        accessToken: data.accessToken,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(`login request: ${error.status} status`);
        set(StateAtom, {
          accessToken: null,
          isLoading: false,
          error: error.response?.data,
        });
      }
    }
  },
);
