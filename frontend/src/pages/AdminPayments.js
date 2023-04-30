import { useEffect }from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import React from "react";
import { useNavigate } from 'react-router-dom'
import '../CSS/table.css';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import axios from 'axios';


const { useState  } = require("react")

const AdminPayments = () => {

    const { logout } = useLogout();
    const {user} = useAuthContext()
    const navigate = useNavigate()
  
    const handleClick = () => {
      logout();
      navigate('/');
    }

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

        return(

            //payment ID
            //date
            //payment amount
            //payment method
            //order ID
            //user ID

        <>
             <header>
      <div>
        <div className="background">
          <div className="headerNameDiv">
            <h1 className="headerName">Ceylon Natural Gems</h1>
          </div>
        </div>

        <nav>
          <div className="navprofileDiv">
              <div className="navEmal">
                <span>
                  Hello Admin
                </span>
                <button onClick={handleClick}>Log out</button>
              </div>
          </div>

          <ul>
            <li>
              <Link to={'/adminHome'}>Home</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>


<div className="lightBlueBodyBG">
        <div className="whiteBodyBG">
            <div className="darkBlueTopicBox">
                <h3 className="pageTopic"> PAYMENT DETAILS </h3>
            </div>
            
<div className="adminDel">
<table>
    <thead>
        <tr>
            <th>Payment ID</th>
            <th>Order ID </th>
            <th>User ID </th>
            <th>Date</th>
            <th>Payment Amount </th>
            <th>Payment Method</th>
        </tr>
    </thead>

    <tbody>
    {payments && payments.map((payment) => (
                 <PPaymentRow key={payment._id} payment={payment}/>
               ))}
    </tbody>
</table>
</div>

        </div>
    </div>
    </>

        )
}

const PPaymentRow = ({payment}) => {

  //  const [status, setStatus] = useState(payment.dStatus);
  const [error, setError] = useState(null)

    const handleStatusChange = async (e) => {
        e.preventDefault()

      //  const payment = {status}

        const response = await fetch('/api/payments' , {
            method:'POST' ,
            body: JSON.stringify(payment),
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        const json = await response.json()

        // if(!response.ok){
        //   setError(json.error)
        // }
        // if(response.ok){
        //     setStatus('')
        //     setError(null)
        //     console.log('delivery status updated!' , json)
        // }
    }

    return(
        <tr key={payment._id}>
            <td>{payment._id}</td>
            <td>{payment.orderID}</td>
            <td>{payment.userID}</td>
            <td>{payment.createdAt}</td>
            <td>{payment.amount}</td>
            <td>{payment.pmethod}</td>

        </tr>
    )
    }

    export default AdminPayments