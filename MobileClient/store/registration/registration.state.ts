import { atom } from 'jotai';
import { RegistrationRequest, RegistrationResponse } from './registration.models';
import axios, { AxiosError } from 'axios';
import { registrationApi } from './registration.api';

export interface StateScheme {
  userId: string | null;
  isLoading: boolean;
  error: string | null;
}

export const registrationState = atom<StateScheme>({
  userId: null,
  isLoading: false,
  error: null,
});

export const registrationAtom = atom(
  async (get) => {
    return get(registrationState);
  },

  async (_get, set, registrationRequest: RegistrationRequest) => {
    set(registrationState, {
      userId: null,
      isLoading: true,
      error: null,
    });

    try {
      const { data } = await axios.post<RegistrationResponse>(
        registrationApi.registration,
        registrationRequest,
      );
      set(registrationState, {
        userId: data.userId,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(`registration: ${error.status} status`);
        set(registrationState, {
          userId: null,
          isLoading: false,
          error: error.response?.data,
        });
      }
    }
  },
);

export const resetRegistrationAtom = atom(null, async (_get, set) => {
  set(registrationState, {
    userId: null,
    isLoading: false,
    error: null,
  });
});
