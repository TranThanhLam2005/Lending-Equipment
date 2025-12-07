import {useContext} from "react";
import Context from "@/store/Context";

export const useStore = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useStore must be used within a Provider");
  }
  return context;
};
