import { createContext, useReducer } from 'react'

export const PlansContext = createContext()

export const plansReducer = (state, action ) => {
    switch (action.type) {
        case 'SET_PLANS':
            return {
                plans: action.payload
            }
        case 'CREATE_PLANS':
            return{
                plans: [action.payload, ...state.plans]
            }
        case 'DELETE_PLANS':
            return{
                plans: state.plans.filter((p) => p._id !== action.payload._id)
            }
        case 'UPDATE_PLANS':
            return{
                plans: state.plans.filter((p) => p._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const PlanContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(plansReducer, {
        plans: null
    })

    return (
        <PlansContext.Provider value={{ ...state, dispatch }}>
            { children }
        </PlansContext.Provider>
    )
}