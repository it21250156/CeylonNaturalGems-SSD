import { useEffect, useState } from "react"

import { useAuthContext } from "../hooks/useAuthContext"
import React from "react";
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';


//components

const AllInstallments = () => {

    const { logout } = useLogout();
    const {user} = useAuthContext()
    const navigate = useNavigate()

    const handleClick = () => {
      logout();
      navigate('/');
    };

    const [Installments , setInstallments] = useState(null)

    useEffect(() => {
        const fetchInstallments = async () => {
            const response = await fetch('/api/installments')
            const json = await response.json()

            if(response.ok){
                setInstallments(json)
            }
        }

        fetchInstallments()
    },[])

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
        <div className="allInstallments">
            <h2>All Installments </h2>
            {<div className="instalments">
                <table border='1' >
                    <tr> 
                        <th>User</th>
                        <th>Gem</th>
                        <th>Monthly Payment</th>
                        <th>Payment Date</th>
                        <th></th>
                    </tr>
                
                    {Installments && Installments.map((installment) => (
                        <InstallmentTableRow key={installment._id} installment={installment} />
                    ))}
                
                </table>
            </div> }
        </div>
        </>
    )
}


//table row
const InstallmentTableRow = ({ installment }) => {
    return(
        <tr>
            <td> {installment.user} </td>
            <td> {installment.gemID} </td>
            <td> {installment.monthlyPayment} </td>
            <td> {installment.createdAt} </td>
            
            <td> <button> Details </button></td>
        </tr>
    )
}

export default AllInstallments