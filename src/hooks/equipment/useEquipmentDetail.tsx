/**
 * Headless hook for equipment detail page
 * Manages modal state only - actions handled by handlers
 */

import {useState} from "react";
import type {
  UseEquipmentDetailOptions,
  UseEquipmentDetailReturn,
} from "@/types/Type";

export const useEquipmentDetail = (
  options: UseEquipmentDetailOptions
): UseEquipmentDetailReturn => {
  const {initialEquipment, initialUser} = options;

  const equipment = initialEquipment || null;
  const user = initialUser || null;

  // Modal state
  const [isLendingModalOpen, setIsLendingModalOpen] = useState(false);

  return {
    // Data
    equipment,
    user,

    // Modal state
    isLendingModalOpen,

    // Modal actions
    openLendingModal: () => setIsLendingModalOpen(true),
    closeLendingModal: () => setIsLendingModalOpen(false),
  };
};
