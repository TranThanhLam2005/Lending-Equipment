import {apiClient} from "./client";
import {API_ENDPOINTS} from "./config";

export interface Course {
  ID: string;
  Name: string;
  Description?: string;
  StartDate?: string;
  EndDate?: string;
  Status?: string;
}

export interface CourseDetail extends Course {
  Instructor?: string;
  Participants?: any[];
  Materials?: any[];
}

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
    return apiClient.get<CourseDetail>(API_ENDPOINTS.COURSES.GET_DETAIL(id));
  },
};
