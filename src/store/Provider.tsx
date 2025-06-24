// import libraries
import {useReducer} from 'react';

// import components
import Context from './Context';
import reducer, {initState} from './reducer';

function Provider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initState);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    );
}
export default Provider;