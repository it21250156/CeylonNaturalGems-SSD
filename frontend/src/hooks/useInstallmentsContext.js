import { InstallmentsContext } from "../context/InstallmentsContext";
import { useContext } from "react";

export const useInstallmentsContext = () => {
    const context = useContext(InstallmentsContext)

    if(!context){
        throw Error('userInstallmentsContext must be used inside an InstallmentsContextProvider')
    }

    return context 
}