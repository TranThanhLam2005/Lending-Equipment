/**
 * Headless hook for course detail page
 * Manages course data and equipment list with client-side filtering
 */

import {useState} from "react";
import type {
  Course,
  UseCourseDetailOptions,
  UseCourseDetailReturn,
} from "@/types/Type";

export type {UseCourseDetailOptions, UseCourseDetailReturn};

export const useCourseDetail = (
  options: UseCourseDetailOptions
): UseCourseDetailReturn => {
  const {initialData} = options;

  const [courseData] = useState<Course>(initialData);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const refreshCourse = async () => {
    // Placeholder for future API refresh logic
    console.log("Refreshing course...");
  };

  return {
    courseData,
    refreshCourse,
    isLoading,
    error,
  };
};
