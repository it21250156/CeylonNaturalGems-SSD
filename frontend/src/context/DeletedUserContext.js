import { createContext, useReducer } from 'react'

export const DeletedUserContext = createContext()

export const deletedUserReducer = (state, action ) => {
    switch (action.type) {
        case 'CREATE_DELETED_USER':
            return{
                deletedusers: [action.payload, ...state.deletedusers]
            }
        default:
            return state
    }
}

export const deletedUserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(deletedUserReducer, {
        deletedusers: null
    })

    return (
        <DeletedUserContext.Provider value={{ ...state, dispatch }}>
            { children }
        </DeletedUserContext.Provider>
    )
}