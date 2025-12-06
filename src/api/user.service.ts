import {apiClient} from "./client";
import {API_ENDPOINTS} from "./config";
import type {User} from "@/types/Type";

export const userService = {
  /**
   * Get user by session (authenticated)
   */
  async getUserBySession() {
    return apiClient.get<User>(API_ENDPOINTS.USER.GET_BY_SESSION);
  },
};
