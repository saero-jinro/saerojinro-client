'use client';

import { UserRole } from '@/_types/Auth/auth.type';
import { BaseSlice } from '@/_types/store';
import { produce } from 'immer';
import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  role: UserRole;
  name: string | null;
  email: string | null;
  pictrue: string | null;
}

interface AuthActions {
  setAuth: (token: string | null, role: UserRole) => void;
  setUserInfo: (name: string, email: string | null, pictrue: string | null) => void;
  resetUserInfo: () => void;
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
  },
}));

export default useAuthStore;
