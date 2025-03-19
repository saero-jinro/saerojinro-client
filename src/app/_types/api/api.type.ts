export type UserRole = 'guest' | 'user' | 'admin';

export type ApiResponse<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};

export type AuthUserResponse = {
  accessToken: string;
};

export type AuthRefreshResponse = {
  accessToken: string;
  role: UserRole;
};
