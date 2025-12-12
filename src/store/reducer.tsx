import {SET_SIDEBAR_OPEN} from "./constants";
import type {State, Action} from "./Context";

const initState: State = {
  isSidebarOpen: false,
};

function reducer(state: State = initState, action: Action): State {
  switch (action.type) {
    case SET_SIDEBAR_OPEN:
      return {
        ...state,
        isSidebarOpen: action.payload,
      };
    default:
      return state;
  }
}

export {initState};
export default reducer;
