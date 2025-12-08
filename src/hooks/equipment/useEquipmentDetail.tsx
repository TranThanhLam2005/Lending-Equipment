/**
 * Headless hook for equipment detail page
 * Manages modal state and borrow request action
 */

import {useState} from "react";
import {lendingService} from "@/api";
import type {
  UseEquipmentDetailOptions,
  UseEquipmentDetailReturn,
  LendingRecord,
} from "@/types/Type";

export type {UseEquipmentDetailOptions, UseEquipmentDetailReturn};

export const useEquipmentDetail = (
  options: UseEquipmentDetailOptions
): UseEquipmentDetailReturn => {
  const {initialEquipment, initialUser} = options;

  const equipment = initialEquipment || null;
  const user = initialUser || null;
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [isLendingModalOpen, setIsLendingModalOpen] = useState(false);

  // Request borrow action
  const requestBorrow = async (borrowData: LendingRecord) => {
    setError(null);

    try {
      await lendingService.requestBorrow(borrowData);
      setIsLendingModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to request borrow");
      throw err;
    }
  };

  return {
    // Data
    equipment,
    user,
    error,

    // Modal state
    isLendingModalOpen,

    // Modal actions
    openLendingModal: () => setIsLendingModalOpen(true),
    closeLendingModal: () => setIsLendingModalOpen(false),

    // Equipment actions
    requestBorrow,
  };
};
