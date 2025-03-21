export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IAuthResponse {
  access_token: string;
}

export interface IRefreshRequest {
  refreshToken: string;
}

export interface IRefreshResponse {
  access_token: string;
  refreshToken: string;
}

export interface AuthState {
  status: string | null;
  error: string | null;
}
