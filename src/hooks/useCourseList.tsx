/**
 * Headless hook for course list
 */

import {useState, useEffect} from "react";
import {courseService} from "@/api";
import type {Course} from "@/api";

export interface UseCourseListOptions {
  initialData?: Course[];
}

export interface UseCourseListReturn {
  courses: Course[];
  isLoading: boolean;
  error: string | null;
  refreshCourses: () => Promise<void>;
}

export const useCourseList = (
  options: UseCourseListOptions = {}
): UseCourseListReturn => {
  const {initialData = []} = options;

  const [courses, setCourses] = useState<Course[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch courses if not provided
  useEffect(() => {
    if (initialData.length > 0) {
      return;
    }

    refreshCourses();
  }, []);

  const refreshCourses = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await courseService.getParticipantCourses();
      setCourses(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch courses");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    courses,
    isLoading,
    error,
    refreshCourses,
  };
};
