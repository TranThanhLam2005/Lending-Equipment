/**
 * Headless hook for equipment list with client-side search, filter, and sort
 * Separates business logic from UI
 *
 * Features:
 * - Works with route loader data
 * - Client-side filtering and sorting
 */

import {useState, useMemo} from "react";
import type {
  Equipment,
  UseEquipmentListOptions,
  EquipmentFilters,
} from "@/types/Type";

export type {UseEquipmentListOptions, EquipmentFilters};

export const STATUS_OPTIONS = [
  {text: "All"},
  {text: "Available"},
  {text: "Borrowed"},
  {text: "Under Maintenance"},
  {text: "Pending"},
];

export const SORT_OPTIONS = [
  {text: "Default"},
  {text: "Most Recent"},
  {text: "Oldest"},
  {text: "Name (A-Z)"},
  {text: "Name (Z-A)"},
];

export const useEquipmentList = (options: UseEquipmentListOptions = {}) => {
  const {initialData = []} = options;

  const [equipmentList] = useState<Equipment[]>(initialData);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStatus, setSearchStatus] = useState("All");
  const [searchOrder, setSearchOrder] = useState("Default");

  // Client-side filtering and sorting
  const displayData = useMemo(() => {
    let filtered = [...equipmentList];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (equipment) =>
          equipment.Name?.toLowerCase().includes(term) ||
          equipment.Type?.toLowerCase().includes(term) ||
          equipment.Description?.toLowerCase().includes(term) ||
          equipment.Venue?.toLowerCase().includes(term) ||
          equipment.Condition?.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (searchStatus !== "All") {
      filtered = filtered.filter(
        (equipment) =>
          equipment.Status?.toLowerCase() === searchStatus.toLowerCase()
      );
    }

    // Sorting
    if (searchOrder === "Most Recent") {
      filtered.sort((a, b) => {
        const dateA = a.PurchaseDate ? new Date(a.PurchaseDate).getTime() : 0;
        const dateB = b.PurchaseDate ? new Date(b.PurchaseDate).getTime() : 0;
        return dateB - dateA;
      });
    } else if (searchOrder === "Oldest") {
      filtered.sort((a, b) => {
        const dateA = a.PurchaseDate ? new Date(a.PurchaseDate).getTime() : 0;
        const dateB = b.PurchaseDate ? new Date(b.PurchaseDate).getTime() : 0;
        return dateA - dateB;
      });
    } else if (searchOrder === "Name (A-Z)") {
      filtered.sort((a, b) => (a.Name || "").localeCompare(b.Name || ""));
    } else if (searchOrder === "Name (Z-A)") {
      filtered.sort((a, b) => (b.Name || "").localeCompare(a.Name || ""));
    }

    return filtered;
  }, [equipmentList, searchTerm, searchStatus, searchOrder]);

  return {
    // Data
    equipmentList,
    displayData,

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
  };
};
