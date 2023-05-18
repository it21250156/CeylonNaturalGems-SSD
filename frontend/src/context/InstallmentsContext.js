import { createContext, useReducer } from 'react'

export const InstallmentsContext = createContext()

export const installmentsReducer = (state, action ) => {
    switch (action.type) {
        case 'SET_INSTALLMENTS':
            return {
                installments: action.payload
            }
        case 'CREATE_INSTALLMENTS':
            return{
                installments: [action.payload, ...state.installments]
            }
        case 'DELETE_INSTALLMENTS':
            return{
                installments: state.installments.filter((p) => p._id !== action.payload._id)
            }
        case 'UPDATE_INSTALLMENTS':
            return{
                installments: state.installments.filter((p) => p._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const InstallmentsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(installmentsReducer, {
        installments: []
    })

    return (
        <InstallmentsContext.Provider value={{ ...state, dispatch }}>
            { children }
        </InstallmentsContext.Provider>
    )
}