import {apiClient} from "./client";
import {API_ENDPOINTS} from "./config";

export interface LoginCredentials {
  Username: string;
  Password: string;
}

export interface AuthResponse {
  message: string;
  user?: any;
}

export const authService = {
  /**
   * Verify user session
   */
  async verifySession() {
    return apiClient.get<any>(API_ENDPOINTS.AUTH.VERIFY_SESSION);
  },

  /**
   * Login user
   */
  async login(credentials: LoginCredentials) {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  /**
   * Logout user
   */
  async logout() {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGOUT);
  },

  /**
   * Forgot password request
   */
  async forgotPassword(email: string) {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      email,
    });
  },
};
