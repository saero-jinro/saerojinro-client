'use client';

import { UserRole } from '@/_types/Auth/auth.type';
import { BaseSlice } from '@/_types/store';
import { produce } from 'immer';
import { create } from 'zustand';

interface AuthState {
  role: UserRole;
  name: string | null;
  email: string | null;
  pictrue: string | null;
  accessToken: string | null;
}

interface AuthActions {
  setAuth: (token: string | null, role: UserRole) => void;
  setUserInfo: (name: string, email: string | null, pictrue: string | null) => void;
  resetUserInfo: () => void;
  updateUserInfo: (payload: Partial<Pick<AuthState, 'name' | 'email' | 'pictrue'>>) => void;
}

type AuthStore = BaseSlice<AuthState, AuthActions>;

const useAuthStore = create<AuthStore>((set) => ({
  state: {
    accessToken: null,
    role: 'guest',
    name: '로그인',
    email: null,
    pictrue: null,
  },
  actions: {
    setAuth(token, role) {
      set(
        produce<AuthStore>((store) => {
          store.state.accessToken = token;
          store.state.role = role;
        }),
      );
    },
    setUserInfo(name, email, pictrue) {
      set(
        produce<AuthStore>((store) => {
          store.state.name = name;
          store.state.email = email;
          store.state.pictrue = pictrue;
        }),
      );
    },
    resetUserInfo() {
      set(
        produce<AuthStore>((store) => {
          store.state.name = null;
          store.state.email = null;
          store.state.pictrue = null;
        }),
      );
    },
    updateUserInfo(payload) {
      set(
        produce<AuthStore>((store) => {
          Object.entries(payload).forEach(([key, value]) => {
            const typedKey = key as keyof Pick<AuthState, 'name' | 'email' | 'pictrue'>;
            if (value !== undefined) {
              store.state[typedKey] = value!;
            }
          });
        }),
      );
    },
  },
}));

export const authStoreGetState = useAuthStore.getState;

export default useAuthStore;
