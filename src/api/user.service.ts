import {apiClient} from "./client";
import {API_ENDPOINTS} from "./config";

export interface User {
  ID: string;
  Username: string;
  Email?: string;
  Role?: string;
  Name?: string;
}

export const userService = {
  /**
   * Get user by session (authenticated)
   */
  async getUserBySession() {
    return apiClient.get<User>(API_ENDPOINTS.USER.GET_BY_SESSION);
  },
};
