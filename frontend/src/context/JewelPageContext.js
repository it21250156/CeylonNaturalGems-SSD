import {createContext, useReducer} from 'react'

export const JewelContext = createContext()

export const JwelReducer = (state, action) => {
    switch (action.type) {
        case 'SET_Jewel' :
            return {
                Jewel:action.payload
            }
        case 'CREATE_Jewel' :
            return {
                Jewel: [action.payload, ...state.Jewel]
            }
        default:
            return state
    }
}

export const JewelContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(JwelReducer, {
        Jewel: null
    })

    return (
        <JewelContext.Provider value={{...state, dispatch}}>
            {children}
        </JewelContext.Provider>
        
    )
}