/**
 * Event handlers for course-related actions
 */

import {ROUTES} from "@/api/config";
import type {CourseSearchHandlers, CourseActionHandlers} from "@/types/Type";

export type {CourseSearchHandlers, CourseActionHandlers};

/**
 * Create search handlers for course filtering
 */
export const createCourseSearchHandlers = (
  setSearchTerm: (value: string) => void,
  setSearchStatus: (value: string) => void,
  setSearchOrder: (value: string) => void
): CourseSearchHandlers => ({
  onSearchChange: (value: string) => {
    setSearchTerm(value);
  },
  onStatusChange: (status: string) => {
    setSearchStatus(status);
  },
  onSortChange: (sort: string) => {
    setSearchOrder(sort);
  },
});

/**
 * Create action handlers for course operations
 */
export const createCourseActionHandlers = (
  navigate?: (path: string) => void,
  onEnrollAction?: (courseId: string) => Promise<void>,
  onUnenrollAction?: (courseId: string) => Promise<void>,
  onRefresh?: () => Promise<void>
): CourseActionHandlers => ({
  onEnroll: async (courseId: string) => {
    if (onEnrollAction) {
      await onEnrollAction(courseId);
    }
  },
  onViewDetails: (courseId: string) => {
    if (navigate) {
      navigate(ROUTES.MY_COURSE_DETAIL(courseId));
    }
  },
  onUnenroll: async (courseId: string) => {
    if (onUnenrollAction) {
      await onUnenrollAction(courseId);
    }
  },
  onRefresh: async () => {
    if (onRefresh) {
      await onRefresh();
    }
  },
});
