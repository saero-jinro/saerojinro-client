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

export type AuthAdminRequest = {
  email: string;
  password: string;
};

export type UserInfo = {
  name: string;
  email: string;
};

export type ApiAuthUserResponse = ApiResponse<AuthUserResponse>;
export type ApiUserInfoResponse = ApiResponse<UserInfo>;
