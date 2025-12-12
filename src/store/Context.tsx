import {createContext} from "react";

type State = {
  isSidebarOpen: boolean;
};

type Action = {
  type: string;
  payload?: any;
};

type ContextType = [State, React.Dispatch<Action>];

const Context = createContext<ContextType | undefined>(undefined);

export default Context;
export type {State, Action, ContextType};
