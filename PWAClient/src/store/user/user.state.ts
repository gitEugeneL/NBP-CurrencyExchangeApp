import { atom } from 'jotai';
import { authState } from '../auth/auth.state';
import axios, { AxiosError } from 'axios';
import { UserResponse } from './user.models';
import { userApi } from './user.api';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export interface StateScheme {
  userId: string | null;
  username: string | null;
  email: string | null;
  isLoading: boolean;
  error: string | null;
}

function getInitialState(): StateScheme {
  const state = localStorage.getItem('user');
  return state
    ? JSON.parse(state)
    : {
        userId: null,
        username: null,
        email: null,
        isLoading: false,
        error: null
      };
}

export const userState = atomWithStorage<StateScheme>(
  'user',
  getInitialState(),
  createJSONStorage<StateScheme>(() => localStorage)
);

export const getUserInfoAtom = atom(
  async (get) => {
    return get(userState);
  },

  async (get, set) => {
    set(userState, {
      userId: null,
      username: null,
      email: null,
      isLoading: true,
      error: null
    });

    try {
      const { accessToken } = await get(authState);
      const { data } = await axios.get<UserResponse>(userApi.getUserInfo, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      set(userState, {
        userId: data.userId,
        username: data.username,
        email: data.email,
        isLoading: false,
        error: null
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(`getUserInfo: ${error.status} status`);
        set(userState, {
          userId: null,
          username: null,
          email: null,
          isLoading: false,
          error: error.response?.data
        });
      }
    }
  }
);
