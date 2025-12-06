/**
 * Event handlers for equipment-related actions
 * Separated from UI components for better testability and reusability
 */

import {ROUTES} from "@/api/config";

export interface EquipmentSearchHandlers {
  onSearchChange: (value: string) => void;
  onStatusChange: (status: string) => void;
  onSortChange: (sort: string) => void;
}

export interface EquipmentActionHandlers {
  onRequestBorrow: (equipmentId: string, data?: any) => void;
  onViewDetails: (equipmentId: string) => void;
}

export interface EquipmentCommentHandlers {
  onCommentSubmit: (content: string, equipmentId: string) => void;
  onCommentEdit: (commentId: string, content: string) => void;
  onCommentDelete: (commentId: string) => void;
}

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
