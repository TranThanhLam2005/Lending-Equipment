import { SET_SIDEBAR_OPEN } from './constants';

const initState = {
    isSidebarOpen: false,
};

function reducer(state = initState, action: any) {
    console.log('Reducer received:', action);
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

export { initState };
export default reducer;
