import { SET_SIDEBAR_OPEN } from "./constants";

export const setSidebarOpen = (isOpen: boolean) => {
  return {
    type: SET_SIDEBAR_OPEN,
    payload: isOpen,
  };
};