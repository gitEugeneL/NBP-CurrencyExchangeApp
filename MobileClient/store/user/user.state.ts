import { atom } from 'jotai';
import { authState } from '../auth/auth.state';
import axios, { AxiosError } from 'axios';
import { UserResponse } from './user.models';
import { userApi } from './user.api';

export interface StateScheme {
  userId: string | null;
  username: string | null;
  email: string | null;
  isLoading: boolean;
  error: string | null;
}

export const userState = atom<StateScheme>({
  userId: null,
  username: null,
  email: null,
  isLoading: false,
  error: null,
});

export const getUserInfoAtom = atom(
  async (get) => {
    return get(userState);
  },

  async (get, set) => {
    const { accessToken } = await get(authState);
    set(userState, {
      userId: null,
      username: null,
      email: null,
      isLoading: true,
      error: null,
    });

    try {
      const { data } = await axios.get<UserResponse>(userApi.getUserInfo, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set(userState, {
        userId: data.userId,
        username: data.username,
        email: data.email,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(`getUserInfo: ${error.status} status`);
        set(userState, {
          userId: null,
          username: null,
          email: null,
          isLoading: false,
          error: error.response?.data,
        });
      }
    }
  },
);
