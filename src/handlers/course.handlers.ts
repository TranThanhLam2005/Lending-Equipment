/**
 * Event handlers for course-related actions
 */

import {ROUTES} from "@/api/config";

export interface CourseSearchHandlers {
  onSearchChange: (value: string) => void;
  onFilterChange: (filter: string) => void;
}

export interface CourseActionHandlers {
  onEnroll: (courseId: string) => void;
  onViewDetails: (courseId: string) => void;
  onUnenroll: (courseId: string) => void;
}

/**
 * Create search handlers for course filtering
 */
export const createCourseSearchHandlers = (
  setSearchTerm: (value: string) => void,
  setFilter: (value: string) => void
): CourseSearchHandlers => ({
  onSearchChange: (value: string) => {
    setSearchTerm(value);
  },
  onFilterChange: (filter: string) => {
    setFilter(filter);
  },
});

/**
 * Create action handlers for course operations
 */
export const createCourseActionHandlers = (
  navigate?: (path: string) => void,
  onEnrollAction?: (courseId: string) => Promise<void>,
  onUnenrollAction?: (courseId: string) => Promise<void>
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
});
