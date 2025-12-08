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

/**
 * Create lending modal handlers for equipment borrowing flow
 */
export const createLendingModalHandlers = (
  requestBorrow: (lendingData: any) => Promise<void>,
  equipment: any,
  user: any,
  closeLendingModal: () => void,
  onSuccess?: () => void,
  onError?: (error: string) => void
) => ({
  onAccept: async (purpose: string) => {
    try {
      // Construct lending record data matching backend API structure
      const lendingRecordData = {
        BorrowerID: user?.CitizenID || "",
        SuperviseID: equipment?.AcademicStaffCitizenID || "",
        EquipmentID: equipment?.ID || "",
        BorrowDate: new Date().toISOString(),
        ReturnDate: new Date(
          Date.now() + 14 * 24 * 60 * 60 * 1000
        ).toISOString(), // 2 weeks from now
        Purpose: purpose,
        Status: "Pending",
      };

      // Submit lending request
      await requestBorrow(lendingRecordData);

      // Close modal
      closeLendingModal();

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to submit lending request";
      console.error("Failed to submit lending request:", err);

      // Call error callback
      if (onError) {
        onError(errorMessage);
      }

      throw err;
    }
  },
  onCancel: () => {
    closeLendingModal();
  },
});
