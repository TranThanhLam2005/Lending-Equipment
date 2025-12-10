/**
 * Headless hook for lending records with client-side search, filter, and sort
 * Separates business logic from UI
 */

import {useState, useMemo} from "react";
import type {
  LendingRecord,
  UseLendingRecordOptions,
  LendingRecordFilters,
} from "@/types/Type";

export type {UseLendingRecordOptions, LendingRecordFilters};

export const useLendingRecords = (options: UseLendingRecordOptions = {}) => {
  const {initialData = []} = options;

  const [records, setRecords] = useState<LendingRecord[]>(initialData);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStatus, setSearchStatus] = useState("All");
  const [searchOrder, setSearchOrder] = useState("Default");

  // Filter options (simple string arrays)
  const statusOptions = ["All", "Borrowed", "Returned", "Overdue", "Pending"];
  const sortOptions = [
    "Default",
    "Most Recent",
    "Oldest",
    "Due Date (Nearest)",
    "Due Date (Farthest)",
  ];

  // Client-side filtering and sorting
  const displayData = useMemo(() => {
    let filtered = [...records];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (record) =>
          record.EquipmentName?.toLowerCase().includes(term) ||
          record.SupervisorName?.toLowerCase().includes(term) ||
          record.Purpose?.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (searchStatus !== "All") {
      filtered = filtered.filter(
        (record) => record.Status?.toLowerCase() === searchStatus.toLowerCase()
      );
    }

    // Sorting
    if (searchOrder === "Most Recent") {
      filtered.sort((a, b) => {
        const dateA = a.BorrowDate ? new Date(a.BorrowDate).getTime() : 0;
        const dateB = b.BorrowDate ? new Date(b.BorrowDate).getTime() : 0;
        return dateB - dateA;
      });
    } else if (searchOrder === "Oldest") {
      filtered.sort((a, b) => {
        const dateA = a.BorrowDate ? new Date(a.BorrowDate).getTime() : 0;
        const dateB = b.BorrowDate ? new Date(b.BorrowDate).getTime() : 0;
        return dateA - dateB;
      });
    } else if (searchOrder === "Due Date (Nearest)") {
      filtered.sort((a, b) => {
        const dateA = a.DueDate ? new Date(a.DueDate).getTime() : Infinity;
        const dateB = b.DueDate ? new Date(b.DueDate).getTime() : Infinity;
        return dateA - dateB;
      });
    } else if (searchOrder === "Due Date (Farthest)") {
      filtered.sort((a, b) => {
        const dateA = a.DueDate ? new Date(a.DueDate).getTime() : 0;
        const dateB = b.DueDate ? new Date(b.DueDate).getTime() : 0;
        return dateB - dateA;
      });
    }

    return filtered;
  }, [records, searchTerm, searchStatus, searchOrder]);

  // Consolidated filters object
  const filters: LendingRecordFilters = {
    searchTerm,
    searchStatus,
    searchOrder,
  };

  return {
    // Data
    records: displayData,
    allRecords: records,
    error,

    // Filters
    filters,

    // Filter setters
    setSearchTerm,
    setSearchStatus,
    setSearchOrder,

    // Data setters
    setRecords,
    setError,

    // Options
    statusOptions,
    sortOptions,
  };
};
