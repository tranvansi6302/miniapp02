export interface LoginResponse {
  AccessToken?: string;
  accessToken?: string;
  RefreshToken?: string;
  refreshToken?: string;
  [key: string]: any;
}

export interface ApiError {
  statusCode?: number;
  messageCode?: string;
  message?: string;
  code?: string;
}
