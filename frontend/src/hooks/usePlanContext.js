import { PlansContext } from "../context/PlansContext";
import { useContext } from "react";

export const usePlansContext = () => {
    const context = useContext(PlansContext)

    if(!context){
        throw Error('userPlanContext must be used inside an PlanContextProvider')
    }

    return context 
}