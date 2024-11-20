import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'jotai';
import { RegistrationRequest, RegistrationResponse } from './models/register.models';
import axios, { AxiosError } from 'axios';
import { API } from './api/api';

export interface StateScheme {
  userId: string | null;
  email: string | null;
  username: string | null;
  isLoading: boolean;
  error: string | null;
}

const storage = createJSONStorage<StateScheme>(() => AsyncStorage);

export const StateAtom = atomWithStorage<StateScheme>(
  'user',
  {
    userId: null,
    email: null,
    username: null,
    isLoading: false,
    error: null,
  },
  storage,
);

export const CreateUserAtom = atom(
  (get) => get(StateAtom),
  async (_get, set, registrationRequest: RegistrationRequest) => {
    set(StateAtom, {
      userId: null,
      email: null,
      username: null,
      isLoading: true,
      error: null,
    });

    try {
      const { data } = await axios.post<RegistrationResponse>(
        API.auth.registration,
        registrationRequest,
      );
      set(StateAtom, {
        userId: data.userId,
        email: data.email,
        username: data.username,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(`registration request: ${error.status} status`);
        set(StateAtom, {
          userId: null,
          email: null,
          username: null,
          isLoading: false,
          error: error.response?.data,
        });
      }
    }
  },
);
