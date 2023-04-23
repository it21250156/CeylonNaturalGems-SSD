import {createContext, useReducer} from 'react'

export const JewelleryesContext = createContext()

export const jewelleryesReducer = (state, action) => {
    switch(action.type) {
        case 'SET_JEWELLERY':
            return{
                jewelleryes: action.payload
            }

        case 'CREATE_JEWELLERY':
            return{
                jewelleryes: [action.payload, ...state.jewelleryes]
            }
        
        case 'DELETE_JEWELLERY':
            return{
                jewellery: state.jewellery ? state.jewellery.filter(g => g._id !== action.payload._id) : []
            
            }

        default:
            return state
    }
}

export const JewelleryesContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(jewelleryesReducer, {
        jewelleryes: null
    })

    return (
        <JewelleryesContext.Provider value={{...state, dispatch}}>
            {children}
        </JewelleryesContext.Provider>
    )
}