import { JewelleryesContext } from "../context/JewelleryContext"
import { useContext } from "react"

export const useJewelleryesContext = () =>{
    const context = useContext(JewelleryesContext)

    if(!context){
        throw Error('useJewelleryContext must be used inside a JewelleryesContextProvider')
    }

    return context
}