import {useContext} from "react";
import Context, {type ContextType} from "@/store/Context";

export const useStore = (): ContextType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useStore must be used within a Provider");
  }
  return context;
};
