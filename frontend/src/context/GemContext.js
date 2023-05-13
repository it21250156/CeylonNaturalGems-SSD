import { createContext, useReducer } from 'react';

export const GemsContext = createContext();

export const gemsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_GEMS':
            return {
                gems: action.payload
            };
        case 'CREATE_GEM':
            return {
                gems: [action.payload, ...state.gems]
            };
        case 'DELETE_GEM':
            return {
                gems: state.gems.filter((g) => g._id !== action.payload._id)
            };
        default:
            return state;
    }
};

export const GemsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(gemsReducer, {
        gems: []
    });

    return (
        <GemsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </GemsContext.Provider>
    );
};
