import { useEffect }from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import React from "react";
import { useNavigate } from 'react-router-dom'
import '../CSS/table.css';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import axios from 'axios';


const { useState  } = require("react")

const AdminDelivery = () =>{

    const { logout } = useLogout();
  const {user} = useAuthContext()
  const navigate = useNavigate()

  const handleClick = () => {
    logout();
    navigate('/');
  }

    const [payments , setPayments] = useState(null)
    const [reload , setReload] = useState(true)

    useEffect(() => {
        const fetchPayments = async() => {
           const response = await fetch('/api/payments')
           const json     = await response.json()
    
           if (response.ok){
             setPayments(json)
            }
            setReload(false)
        }
    
        fetchPayments()
        }, [reload])


    return(
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
                <h3 className="pageTopic"> DELIVERY DETAILS </h3>
            </div>
            
<div className="adminDel">
<table>
    <thead>
        <tr>
            <th>Payment ID</th>
            <th>Date</th>
            <th>Address</th>
            <th>District</th>
            <th>Country</th>
            <th>Delivery Method</th>
            <th>Delivery Status</th>
        </tr>
    </thead>

    <tbody>
    {payments && payments.map((payment) => (
                 <PDeliveryRow key={payment._id} payment={payment} reload={reload} setReload={setReload}/>
               ))}
    </tbody>
</table>
</div>

        </div>
    </div>
    </>

    )
}

const PDeliveryRow = ({payment, setReload}) => {

    const [status, setStatus] = useState("");
  const [error, setError] = useState(null)

    const handleStatusChange = async (e) => {
          // e.preventDefault()
          setStatus(e.target.value);

        // const payment = {status}

        // const response = await fetch('/api/payments' , {
        //     method:'POST' ,
        //     body: JSON.stringify(payment),
        //     headers: {
        //         'Content-Type' : 'application/json'
        //     }
        // })

        // const json = await response.json()

            // if(!response.ok){
            //   setError(json.error)
            // }
            // if(response.ok){
            //     setStatus('')
            //     setError(null)
            //     console.log('delivery status updated!' , json)
            // }
          const updatedPayment = {
            ...payment,
            dStatus: e.target.value
          };
          console.log(updatedPayment)
      
          try {
            const response = await fetch(`/api/payments/${payment._id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedPayment)
            });
            console.log(response)
            if (response.ok) {
              setStatus('');
              setError(null);
              console.log('Delivery status updated!', response.data);
              setReload(true)
            } else {
              setError('Error updating delivery status.');
            }
          } catch (error) {
            setError(error.message);
          }
        }
      

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {

      const confirmDelete = window.confirm("Are you sure you want to delete this item?");
      if (confirmDelete) {
        try {
          setIsDeleting(true);
          const response = await fetch(`api/payments/${payment._id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            window.location.reload();
          } else {
            const json = await response.json();
            // Handle error response
            console.error(json.error);
          }
        } catch (error) {
          // Handle fetch error
          console.error(error);
        } finally {
          setIsDeleting(false);
        }

      }
      };

    return(
        <tr key={payment._id}>
            <td>{payment._id}</td>
            <td>{payment.createdAt}</td>
            <td>{payment.address}</td>
            <td>{payment.district}</td>
            <td>{payment.country}</td>
            <td>{payment.dmethod}</td>
            <td>
            <input type="radio" name={"status_"+payment._id} value="Pending" checked={payment.dStatus === "Pending"} onChange={(e) => handleStatusChange(e)} />
<label for="pending">Pending</label>

<input type = "radio" name = {"status_"+payment._id} value = "In Process" checked = {payment.dStatus === "In Process"} onChange={(e) => handleStatusChange(e)} />
<label for="inprocess">In Process</label>

<input type = "radio" name = {"status_"+payment._id} value = "Delivered" checked = {payment.dStatus === "Delivered"} onChange = {(e) => handleStatusChange(e)} />
<label for  = "delivered">Delivered</label>

</td>
<td><button onClick = {handleDelete} disabled = {isDeleting}>
        {isDeleting ? 'Deleting...' : 'DELETE'}
      </button></td>

        </tr>
    )
    }

export default AdminDelivery