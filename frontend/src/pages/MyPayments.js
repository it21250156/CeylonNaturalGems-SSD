import React, { useEffect, useState  } from "react"
//import { BodyTemp } from "../components/BodyTemp"
import { usePaymentContext } from "../hooks/usePaymentsContext"
import '../CSS/table.css';

import Header from '../components/Header';

import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

const MyPayments = () => {

    const navigate = useNavigate()
    const {id} = useParams();

    const [payments , setPayments] = useState(null)

    const user = JSON.parse(localStorage.getItem('userInfo'));

    
    useEffect(() => {
    const fetchPayments = async() => {
       const response = await fetch(`/api/payments/userPayments/${user._id}`);
       const json = await response.json()

       if (response.ok){
         setPayments(json) 
       }
    }

    fetchPayments()
    }, [])  

    

    return (
      <>
      <Header/>
      <div className="lightBlueBodyBG">
        <div className="whiteBodyBG">
            <div className="darkBlueTopicBox">
                <h3 className="pageTopic">MY PAYMENTS</h3>
            </div>
            <div className="mypayments">
            <div className="paymentlist">
                <center>
                <div className="insBtn" onClick={() => {navigate(`/profile/MyPayments/MyInstallments/${id}`)}}> MY INSTALLMENTS </div>
                </center>
      <table>

            <thead>
            <tr>
                <th>Payment ID</th>
                <th>Payment Amount($)</th>
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
    </>
    )
}

const PaymentRow = ({payment}) => {
     const navigate = useNavigate()
    
      const getStatusColor = (status) => {
        if (status === "Delivered" || status === "Picked Up") {
          return "red";
        }
        return "inherit";
      };
  

    return (
    <tr key={payment._id} >
        <td>{payment._id}</td>
        <td>{payment.amount}</td>
        <td>{payment.pmethod}</td>
        <td>{payment.dmethod}</td>
        <td style={{ color: getStatusColor(payment.dStatus) }}>{payment.dStatus}</td>
        <td> {payment.createdAt && (
    <>
      <div>Date: {new Date(payment.createdAt).toLocaleDateString()}</div>
      <div>Time: {new Date(payment.createdAt).toLocaleTimeString()}</div>
    </>
  )}</td>
        
        {/* <td><button onClick={ () => {navigate ('/MyPayments/PaymentUpdate/' + payment._id)}}>UPDATE</button></td>
        {/* <td><button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'DELETE'}
      </button></td> */} 
        <td><button
          disabled = {payment?.dStatus === "Delivered" || payment?.dStatus === "Picked Up"}
          onClick={ () => {navigate ('/MyPayments/PaymentUpdate/' + payment._id)}}>UPDATE</button></td>
        <td><button
          disabled = {payment?.orderID?.length < 1 || payment?.orderID[0].length < 1 || payment?.dStatus !== "Delivered" && payment?.dStatus !=="Picked Up" }
          onClick={ () => {navigate ("/FeedbackForm/"+payment._id)}}
        > FEEDBACK</button></td>
    </tr>
    
    )
}

export default MyPayments