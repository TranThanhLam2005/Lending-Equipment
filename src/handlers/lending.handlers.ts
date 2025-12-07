/**
 * Event handlers for lending record-related actions
 * Separated from UI components for better testability and reusability
 */

import {ROUTES} from "@/api/config";
import type {
  LendingRecordSearchHandlers,
  LendingRecordActionHandlers,
} from "@/types/Type";

export type {LendingRecordSearchHandlers, LendingRecordActionHandlers};

/**
 * Create search handlers for lending record filtering
 */
export const createLendingRecordSearchHandlers = (
  setSearchTerm: (value: string) => void,
  setSearchStatus: (value: string) => void,
  setSearchOrder: (value: string) => void
): LendingRecordSearchHandlers => ({
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
 * Create action handlers for lending record operations
 */
export const createLendingRecordActionHandlers = (
  navigate?: (path: string) => void,
  onReturn?: (recordId: string) => Promise<void>,
  onDelete?: (recordId: string) => Promise<void>
): LendingRecordActionHandlers => ({
  onReturnEquipment: async (recordId: string) => {
    if (onReturn) {
      await onReturn(recordId);
    }
  },
  onDeleteRecord: async (recordId: string) => {
    if (onDelete) {
      await onDelete(recordId);
    }
  },
  onViewDetails: (recordId: string) => {
    if (navigate) {
      // Navigate to record details page
      navigate(`${ROUTES.STUDENT_RECORD}/${recordId}`);
    }
  },
});
