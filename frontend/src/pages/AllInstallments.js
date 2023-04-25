import { useEffect, useState } from "react"

import { useAuthContext } from "../hooks/useAuthContext"
import React from "react";
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

import format from 'date-fns/format'
import '../CSS/table.css';

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

    <div className="lightBlueBodyBG">
        <div className="whiteBodyBG">
            <div className="darkBlueTopicBox">
                <h3 className="pageTopic">All Installments</h3>
            </div>


                <table >
                  <thead>
                    <tr> 
                        <th>User</th>
                        <th>Gem</th>
                        <th>Installment ID</th>
                        <th>Monthly Payment</th>
                        <th>Payment Date</th>
                        
                    </tr>
                  </thead>
                  <tbody>
                    {Installments && Installments.map((installment) => (
                        <InstallmentTableRow key={installment._id} installment={installment} />
                    ))}
                  </tbody>
                </table>
            </div> 
        </div>
        </>
    )
}


//table row
const InstallmentTableRow = ({ installment }) => {
  const [gems, setGems] = useState([]);

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
      fetchGems();
  }, []);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const json = await response.json();
        setUsers(json);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
}, []);

    return(
      
        <tr>
            <td> {users.find((user) => user._id === installment.user)?.firstName} {} </td>
            <td> {gems.find((gem) => gem._id === installment.gemID)?.name} </td>
            <td> {installment._id} </td>
            <td> {installment.monthlyPayment} </td>
            <td>  {format(new Date(installment.createdAt), 'MM/dd/yyyy')} </td>
            
            
        </tr>
    )
}

export default AllInstallments