/**
 * Event handlers for equipment-related actions
 * Separated from UI components for better testability and reusability
 */

import {ROUTES} from "@/api/config";
import {equipmentService} from "@/api/equipment.service";
import {userService} from "@/api/user.service";
import {lendingService} from "@/api/lending.service";
import type {
  EquipmentSearchHandlers,
  EquipmentActionHandlers,
  EquipmentCommentHandlers,
  Equipment,
  User,
} from "@/types/Type";

export type {
  EquipmentSearchHandlers,
  EquipmentActionHandlers,
  EquipmentCommentHandlers,
};

/**
 * Create search handlers for equipment filtering
 */
export const createEquipmentSearchHandlers = (
  setSearchTerm: (value: string) => void,
  setSearchStatus: (value: string) => void,
  setSearchOrder: (value: string) => void
): EquipmentSearchHandlers => ({
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
 * Create action handlers for equipment operations
 */
export const createEquipmentActionHandlers = (
  navigate?: (path: string) => void,
  onBorrow?: (equipmentId: string, data?: any) => Promise<void>
): EquipmentActionHandlers => ({
  onRequestBorrow: async (equipmentId: string, data?: any) => {
    if (onBorrow) {
      await onBorrow(equipmentId, data);
    }
  },
  onViewDetails: (equipmentId: string) => {
    if (navigate) {
      navigate(ROUTES.STUDENT_EQUIPMENT_DETAIL(equipmentId));
    }
  },
});

/**
 * Prepare borrow modal data
 * Loads supervisor and user data, combines with equipment info
 */
export const prepareBorrowModalData = async (
  equipmentId: string,
  equipmentList: Equipment[]
): Promise<{
  modalData: Equipment;
  currentUser: User;
}> => {
  // Load supervisor info for this equipment
  const supervisorData = await equipmentService.getSupervisorByEquipmentID(
    equipmentId
  );

  // Load current user info
  const userData = await userService.getUserBySession();

  // Find the equipment from the list
  const equipment = equipmentList.find((eq) => eq.ID === equipmentId);

  if (!equipment) {
    throw new Error("Equipment not found");
  }

  // Combine data for modal
  const modalData: Equipment = {
    ...equipment,
    SupervisorID: supervisorData.data.SupervisorID,
    AcademicStaffName: supervisorData.data.AcademicStaffName,
    AcademicStaffCitizenID: supervisorData.data.AcademicStaffCitizenID,
    CurrentUserName: userData.data.FullName || userData.data.Username,
  };

  return {
    modalData,
    currentUser: userData.data,
  };
};

/**
 * Submit borrow request
 */
export const submitBorrowRequest = async (borrowData: any): Promise<void> => {
  await lendingService.requestBorrow(borrowData);
};

/**
 * Create comment handlers for equipment comments
 */
export const createEquipmentCommentHandlers = (
  onSubmit: (content: string, equipmentId: string) => Promise<void>,
  onEdit?: (commentId: string, content: string) => Promise<void>,
  onDelete?: (commentId: string) => Promise<void>
): EquipmentCommentHandlers => ({
  onCommentSubmit: async (content: string, equipmentId: string) => {
    await onSubmit(content, equipmentId);
  },
  onCommentEdit: async (commentId: string, content: string) => {
    if (onEdit) {
      await onEdit(commentId, content);
    }
  },
  onCommentDelete: async (commentId: string) => {
    if (onDelete) {
      await onDelete(commentId);
    }
  },
});
