/**
 * Headless hook for equipment detail page
 * Manages equipment data, user data, and related actions
 */

import {useState, useEffect} from "react";
import {equipmentService, lendingService, userService} from "@/api";
import type {
  Equipment,
  User,
  UseEquipmentDetailOptions,
  UseEquipmentDetailReturn,
  LendingRecord,
} from "@/types/Type";

export type {UseEquipmentDetailOptions, UseEquipmentDetailReturn};

export const useEquipmentDetail = (
  options: UseEquipmentDetailOptions
): UseEquipmentDetailReturn => {
  const {equipmentId, initialEquipment, initialUser} = options;

  const [equipment, setEquipment] = useState<Equipment | null>(
    initialEquipment || null
  );
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [isLendingModalOpen, setIsLendingModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Fetch equipment and user data if not provided
  useEffect(() => {
    if (initialEquipment && initialUser) {
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [equipmentRes, userRes] = await Promise.all([
          equipmentService.getEquipmentDetail(equipmentId),
          userService.getUserBySession(),
        ]);

        setEquipment(equipmentRes.data);
        setUser(userRes.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [equipmentId, initialEquipment, initialUser]);

  // Request borrow action
  const requestBorrow = async (borrowData: LendingRecord) => {
    setIsLoading(true);
    setError(null);

    try {
      await lendingService.requestBorrow(borrowData);
      setIsLendingModalOpen(false);
      await refreshEquipment();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to request borrow");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh equipment data
  const refreshEquipment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await equipmentService.getEquipmentDetail(equipmentId);
      setEquipment(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to refresh equipment"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // Data
    equipment,
    user,
    isLoading,
    error,

    // Modal states
    isLendingModalOpen,
    isConfirmModalOpen,

    // Modal actions
    openLendingModal: () => setIsLendingModalOpen(true),
    closeLendingModal: () => setIsLendingModalOpen(false),
    openConfirmModal: () => setIsConfirmModalOpen(true),
    closeConfirmModal: () => setIsConfirmModalOpen(false),

    // Equipment actions
    requestBorrow,
    refreshEquipment,
  };
};
