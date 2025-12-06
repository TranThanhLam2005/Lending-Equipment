import type {ModalHandlers, FormHandlers} from "@/types/Type";

export type {ModalHandlers, FormHandlers};

/**
 * Create modal handlers
 */
export const createModalHandlers = (
  setIsOpen: (isOpen: boolean) => void,
  onConfirmAction?: () => void | Promise<void>,
  onCancelAction?: () => void
): ModalHandlers => ({
  onOpen: () => {
    setIsOpen(true);
  },
  onClose: () => {
    setIsOpen(false);
    if (onCancelAction) {
      onCancelAction();
    }
  },
  onConfirm: async () => {
    if (onConfirmAction) {
      await onConfirmAction();
    }
    setIsOpen(false);
  },
  onCancel: () => {
    setIsOpen(false);
    if (onCancelAction) {
      onCancelAction();
    }
  },
});

/**
 * Create form handlers
 */
export const createFormHandlers = <T extends Record<string, any>>(
  setFormData: (data: T | ((prev: T) => T)) => void,
  onSubmitAction: (data: T) => void | Promise<void>,
  initialData: T
): FormHandlers<T> => ({
  onSubmit: async (data: T) => {
    await onSubmitAction(data);
  },
  onChange: (field: string, value: any) => {
    setFormData((prev) => ({...prev, [field]: value}));
  },
  onReset: () => {
    setFormData(initialData);
  },
});
