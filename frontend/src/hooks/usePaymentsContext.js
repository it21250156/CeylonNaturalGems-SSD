import { PaymentsContext } from "../context/PaymentContext";
import { useContext } from "react";

export const usePaymentContext = ()=> {
    const context = useContext(PaymentsContext)

    if (!context){
        throw Error('usePaymentsContext must be used inside an PaymentsContextProvider')
    }

    return context
}