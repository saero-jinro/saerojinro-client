'use client';

import { UserRole } from '@/_types/api/api.type';
import { BaseSlice } from '@/_types/store';
import { produce } from 'immer';
import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  role: UserRole;
}

interface AuthActions {
  setAuth: (token: string | null, role: UserRole) => void;
}

type AuthStore = BaseSlice<AuthState, AuthActions>;

const useAuthStore = create<AuthStore>((set) => ({
  state: {
    accessToken: null,
    role: 'guest',
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
  },
}));

export default useAuthStore;
