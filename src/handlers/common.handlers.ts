/**
 * Event handlers for modal interactions
 */

export interface ModalHandlers {
  onOpen: () => void;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

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
 * Form submission handlers
 */
export interface FormHandlers<T = any> {
  onSubmit: (data: T) => void;
  onChange: (field: string, value: any) => void;
  onReset: () => void;
}

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
