/**
 * Headless hook for course list with client-side search, filter, and sort
 */

import {useState, useMemo} from "react";
import type {
  UseCourseListOptions,
  UseCourseListReturn,
  Course,
} from "@/types/Type";

export const useCourseList = (
  options: UseCourseListOptions = {}
): UseCourseListReturn => {
  const {initialData = []} = options;

  const [courses] = useState<Course[]>(initialData);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStatus, setSearchStatus] = useState("All");
  const [searchOrder, setSearchOrder] = useState("Default");

  // Filter options
  const statusOptions = ["All", "Active", "Completed", "Upcoming"];
  const sortOptions = [
    "Default",
    "Most Recent",
    "Oldest",
    "Name (A-Z)",
    "Name (Z-A)",
  ];

  // Client-side filtering and sorting
  const displayData = useMemo(() => {
    let filtered = [...courses];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.CourseName?.toLowerCase().includes(term) ||
          course.Description?.toLowerCase().includes(term) ||
          course.AcademicStaffName?.toLowerCase().includes(term) ||
          course.Room?.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (searchStatus !== "All") {
      const now = new Date();
      filtered = filtered.filter((course) => {
        const startDate = course.DateStart ? new Date(course.DateStart) : null;
        const endDate = course.DateEnd ? new Date(course.DateEnd) : null;

        if (searchStatus === "Active") {
          return startDate && endDate && startDate <= now && now <= endDate;
        } else if (searchStatus === "Completed") {
          return endDate && now > endDate;
        } else if (searchStatus === "Upcoming") {
          return startDate && now < startDate;
        }
        return true;
      });
    }

    // Sorting
    if (searchOrder === "Most Recent") {
      filtered.sort((a, b) => {
        const dateA = a.DateStart ? new Date(a.DateStart).getTime() : 0;
        const dateB = b.DateStart ? new Date(b.DateStart).getTime() : 0;
        return dateB - dateA;
      });
    } else if (searchOrder === "Oldest") {
      filtered.sort((a, b) => {
        const dateA = a.DateStart ? new Date(a.DateStart).getTime() : 0;
        const dateB = b.DateStart ? new Date(b.DateStart).getTime() : 0;
        return dateA - dateB;
      });
    } else if (searchOrder === "Name (A-Z)") {
      filtered.sort((a, b) =>
        (a.CourseName || "").localeCompare(b.CourseName || "")
      );
    } else if (searchOrder === "Name (Z-A)") {
      filtered.sort((a, b) =>
        (b.CourseName || "").localeCompare(a.CourseName || "")
      );
    }

    return filtered;
  }, [courses, searchTerm, searchStatus, searchOrder]);

  return {
    courses,
    displayData,
    filters: {
      searchTerm,
      status: searchStatus,
      sortOrder: searchOrder,
    },
    isLoading,
    error,
    setSearchTerm,
    setSearchStatus: setSearchStatus,
    setSearchOrder: setSearchOrder,
    statusOptions,
    sortOptions,
  };
};
