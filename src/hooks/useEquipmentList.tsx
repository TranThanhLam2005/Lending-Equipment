/**
 * Headless hook for equipment list with search and filter
 * Separates business logic from UI
 */

import {useState, useEffect} from "react";
import {equipmentService} from "@/api";
import type {Equipment} from "@/api";
import useDebounce from "./useDebounce";

export interface UseEquipmentListOptions {
  initialData?: Equipment[];
  debounceMs?: number;
  isVisitor?: boolean; // Flag to use visitor endpoint
}

export interface EquipmentFilters {
  searchTerm: string;
  searchStatus: string;
  searchOrder: string;
}

export const STATUS_OPTIONS = [
  {text: "All"},
  {text: "Available"},
  {text: "Borrowed"},
];

export const SORT_OPTIONS = [
  {text: "Default"},
  {text: "Most Recent"},
  {text: "Oldest"},
];

export const useEquipmentList = (options: UseEquipmentListOptions = {}) => {
  const {initialData = [], debounceMs = 500, isVisitor = false} = options;

  const [equipmentList, setEquipmentList] = useState<Equipment[]>(initialData);
  const [filteredList, setFilteredList] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStatus, setSearchStatus] = useState("All");
  const [searchOrder, setSearchOrder] = useState("Default");

  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);

  // Determine if we should show filtered results
  const shouldFilter =
    debouncedSearchTerm !== "" ||
    searchStatus !== "All" ||
    searchOrder !== "Default";

  // Fetch filtered data when filters change
  useEffect(() => {
    if (!shouldFilter) {
      setFilteredList([]);
      return;
    }

    const fetchFilteredEquipment = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await equipmentService.queryEquipment(
          {
            searchValue: debouncedSearchTerm,
            searchStatus: searchStatus,
            searchOrder: searchOrder,
          },
          isVisitor
        );
        setFilteredList(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch equipment"
        );
        setFilteredList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredEquipment();
  }, [debouncedSearchTerm, searchStatus, searchOrder, shouldFilter]);

  // Get display data - filtered or original
  const displayData = shouldFilter ? filteredList : equipmentList;

  return {
    // Data
    equipmentList,
    displayData,
    isLoading,
    error,

    // Filter states
    filters: {
      searchTerm,
      searchStatus,
      searchOrder,
    },

    // Filter setters
    setSearchTerm,
    setSearchStatus,
    setSearchOrder,

    // Options
    statusOptions: STATUS_OPTIONS,
    sortOptions: SORT_OPTIONS,

    // Methods
    setEquipmentList,
    refreshData: () => setEquipmentList([...equipmentList]),
  };
};
