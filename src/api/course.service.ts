import {apiClient} from "./client";
import {API_ENDPOINTS} from "./config";
import type {Course} from "@/types/Type";

export const courseService = {
  /**
   * Get participant courses (authenticated)
   */
  async getParticipantCourses() {
    return apiClient.get<Course[]>(API_ENDPOINTS.COURSES.GET_PARTICIPANT);
  },

  /**
   * Get course detail by ID
   */
  async getCourseDetail(id: string) {
    return apiClient.get<Course>(API_ENDPOINTS.COURSES.GET_DETAIL(id));
  },
};
