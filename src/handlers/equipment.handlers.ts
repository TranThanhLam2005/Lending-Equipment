/**
 * Event handlers for equipment-related actions
 * Separated from UI components for better testability and reusability
 */

import {ROUTES} from "@/api/config";
import type {
  EquipmentSearchHandlers,
  EquipmentActionHandlers,
} from "@/types/Type";

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

// not used for now
// /**
//  * Create comment handlers for equipment comments
//  */
// export const createEquipmentCommentHandlers = (
//   onSubmit: (content: string, equipmentId: string) => Promise<void>,
//   onEdit?: (commentId: string, content: string) => Promise<void>,
//   onDelete?: (commentId: string) => Promise<void>
// ): EquipmentCommentHandlers => ({
//   onCommentSubmit: async (content: string, equipmentId: string) => {
//     await onSubmit(content, equipmentId);
//   },
//   onCommentEdit: async (commentId: string, content: string) => {
//     if (onEdit) {
//       await onEdit(commentId, content);
//     }
//   },
//   onCommentDelete: async (commentId: string) => {
//     if (onDelete) {
//       await onDelete(commentId);
//     }
//   },
// });
