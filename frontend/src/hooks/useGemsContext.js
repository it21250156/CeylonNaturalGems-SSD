import { GemsContext } from "../context/GemContext"
import { useContext } from "react"

export const useGemsContext = () => {
    const context = useContext(GemsContext)

    if (!context) {
        throw Error('useGemsContext must be used inside an GemsContextProvider')
    }

    return context
}