import { useEffect, useState } from "react"

import { useAuthContext } from "../hooks/useAuthContext"
import React from "react";
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

import "../CSS/Vih's.css"
import Header from '../components/Header';

const MyInstallmentsDetailed = () => {

    const {id} = useParams();
    const {user} = useAuthContext()
    const navigate = useNavigate()
    
    const [installment , setInstallment] = useState({
        user:"" , gemID:"", planID:"", noOfMonths:"", totalAmount:"", initialPayment:"", monthlyPayment:"", installmentDates:[], status:""
    })

    const [gems, setGems] = useState([]);
    const [users, setUsers] = useState([]);
    const [plans, setPlans] = useState([]);


    useEffect(() => {
        const fetchInstallments = async () => {
            const response = await fetch(`/api/installments/${id}`)
            const json = await response.json()

            if(response.ok){
                setInstallment(json)
            }
        }

        fetchInstallments()
    },[])


  useEffect(() => {
    const fetchGems = async () => {
      try {
        const response = await fetch(`/api/gems&jewelleries/gems/${installment.gemID}`);
        const json = await response.json();
        setGems(json);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const json = await response.json();
        setUsers(json);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchPlans = async () => {
        try {
          const response = await fetch('/api/plans');
          const json = await response.json();
          setPlans(json);
        } catch (err) {
          console.log(err);
        }
      };

    fetchPlans();
    fetchGems();
    fetchUsers();
  }, []);

  const usersName = users.find((user) => user._id === installment.user);

    return (
        <>
        <Header/>

    <div className="lightBlueBodyBG">
        <div className="lightBlueBox" >
            <div className="img-section-large">
                <div className="gem-image-container">
                    <img
                      src={gems.find((gem) => gem._id === installment.gemID)?.gem_img}
                      alt="Gem"
                      className="gem-card__image"
                    />
                </div>
              </div>
            <h3>{gems.find((gem) => gem._id === installment.gemID)?.name} </h3>
            <h3>{gems.find((gem) => gem._id === installment.gemID)?.color} </h3>
        </div>
        <div className="whiteBox">
            <br></br>
            
            <table className="table table-striped table-hover">
                <tr><td>Purchased Date</td>
                <td>{new Date(installment.installmentDates[0]).toLocaleDateString()}</td>
                </tr>
                <tr><td>Installement Plan</td> <td>{plans.find((plan) => plan._id === installment.planID)?.name}</td></tr>
                <tr><td>Total Amount</td> <td>{installment.totalAmount}</td></tr>
                <tr><td>Initial Payment</td> <td>{installment.initialPayment}</td></tr>
                <tr><td>Monthly Payment</td> <td>{installment.monthlyPayment}</td></tr>
                <tr><td>Total Number of Months to Pay</td> <td>{installment.noOfMonths}</td></tr>

                <br></br>
                <tr><td>Status</td> <td>{installment.status}</td></tr>

            </table>

            
        </div> 
        <div className="whiteBox">

          <h3>Payment Details</h3>
          <hr></hr>
            
          <table className="table table-striped table-hover" >
            <thead> 
              <tr>
                <th>Month</th>
                <th>Date of the Payemnt</th>
                <th>Time of the Payemnt</th>
                <th>Payment Status</th>
              </tr>
            </thead>

            <tbody>
              {installment.installmentDates.map((date, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{new Date(date).toLocaleDateString()}</td>
                  <td>{new Date(date).toLocaleTimeString()}</td>
                  <td>Completed</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button 
            onClick={() => {
                navigate('/payments');
                localStorage.setItem('TamountInfo', installment.monthlyPayment);
                }} > 
                
                Do next payment 
        </button>
            
        </div> 
    </div>
    </>
    )
}




export default MyInstallmentsDetailed