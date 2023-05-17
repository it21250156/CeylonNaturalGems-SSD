import { useEffect, useState } from "react"

import { useAuthContext } from "../hooks/useAuthContext"
import React from "react";
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

import "../CSS/Vih's.css"

const AllInstallmentsDetailed = () => {

    const {id} = useParams();

    const { logout } = useLogout();
    const {user} = useAuthContext()
    const navigate = useNavigate()


    const handleClick = () => {
      logout();
      navigate('/');
    };

    const [installment , setInstallment] = useState({
        user:"" , gemID:"", planID:"", noOfMonths:"", initialPayment:"", monthlyPayment:"", installmentDates:"", status:""
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
        const response = await fetch('/api/gems&jewelleries/gems');
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
                <span className="welcomeNoteAdmin">Hello Admin</span>
                <button className="adminLogoutBtn" onClick={handleClick}>
                  Log out
                </button>
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
        <div className="lightBlueBox">
            <h3>{gems.find((gem) => gem._id === installment.gemID)?.name} </h3>
            <h3> Customer: {usersName?.firstName} {usersName?.lastName} </h3>
            <br></br>
            
            <table className="table table-striped table-hover">
                <tr><td>Purchased Date</td> <td>{installment.installmentDates[0]}</td></tr>
                <tr><td>Installement Plan</td> <td>{plans.find((plan) => plan._id === installment.planID)?.name}</td></tr>
                <tr><td>Total Amount</td> <td></td></tr>
                <tr><td>Initial Payment</td> <td>{installment.initialPayment}</td></tr>
                <tr><td>Monthly Payment</td> <td>{installment.monthlyPayment}</td></tr>
                <tr><td>Total Number of Months to Pay</td> <td>{installment.noOfMonths}</td></tr>
                <tr><td>Order completion date</td> <td></td></tr>

                <br></br>
                <tr><td>Status</td> <td>{installment.status}</td></tr>

            </table>

            
        </div> 
        <div className="whiteBox">
            

            
        </div> 
    </div>
    </>
    )
}




export default AllInstallmentsDetailed