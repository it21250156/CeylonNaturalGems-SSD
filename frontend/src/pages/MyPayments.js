import React, { useEffect, useState  } from "react"
//import { BodyTemp } from "../components/BodyTemp"
import { usePaymentContext } from "../hooks/usePaymentsContext"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

const MyPayments = () => {

    // const {payments , dispatch} = usePaymentContext()
    const navigate = useNavigate()
    const {id} = useParams();

    const [payments , setPayments] = useState(null)


    useEffect(() => {
    const fetchPayments = async() => {
       const response = await fetch('/api/payments')
       const json = await response.json()

       if (response.ok){
         setPayments(json) 
       }
    }

    fetchPayments()
    }, [])  

    return (
      
      <div className="lightBlueBodyBG">
        <div className="whiteBodyBG">
            <div className="darkBlueTopicBox">
                <h3 className="pageTopic">MY PAYMENTS</h3>
            </div>
            <div className="mypayments">
            <div className="paymentlist">

                <div className="insBtn" onClick={() => {navigate(`/profile/MyPayments/MyInstallments/${id}`)}}> MY INSTALLMENTS </div>

      <table>

            <thead>
            <tr>
                <th>Payment ID</th>
                <th>Payment Amount(LKR)</th>
                <th>Payment Method</th>
                <th>Delivery Method</th>
                <th>Delivery Status</th>
                <th>Date</th>
            </tr>
        </thead>
            <tbody>
               {payments && payments.map((payment) => (
                 <PaymentRow key={payment._id} payment={payment}/>
               ))}
               </tbody>
               </table>
            </div>
            </div>
        </div>
    </div>
    
    )
}

const PaymentRow = ({payment}) => {

    const {dispatch} = usePaymentContext()

    const handleDelete = async () => {
        const response = await fetch('api/payments/' + payment._id , {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type:'DELETE_PAYMENT' , payload: json})
            window.location.reload();
        }
    }
    

    return (
    <tr key={payment._id}>
        <td>{payment._id}</td>
        <td>{payment.amount}</td>
        <td>{payment.pmethod}</td>
        <td>{payment.dmethod}</td>
        <td>{payment.dStatus}</td>
        <td>{payment.createdAt}</td>
        <td><button onClick={handleDelete}>DELETE</button></td>
        <td><button >UPDATE</button></td>
    </tr>
    )
}

export default MyPayments