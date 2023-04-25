import { useEffect, useState } from "react"

import { useAuthContext } from "../hooks/useAuthContext"
import React from "react";
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';


const AllUsers = () => {

    const { logout } = useLogout();
    const {user} = useAuthContext()
    const navigate = useNavigate()

    const handleClick = () => {
      logout();
      navigate('/');
    };

    const [Users, setUsers] = useState([]);

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
        <div className="allUsers">
            <h2>All Users </h2>
            {<div className="instalments">
                <table border='1' >
                    <tr> 
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone number</th>

                        
                    </tr>
                
                    {Users && Users.map((user) => (
                        <UsersTableRow key={user._id} user={user} />
                    ))}
                
                </table>
            </div> }
        </div>
        </>
    )
}


//table row
const UsersTableRow = ({ user }) => {

    return(
      
        <tr>
            <td> {user.firstName} </td>
            <td> {user.lastName} </td>
            <td> {user.email} </td>
            <td> {user.phone} </td>
            
            
        </tr>
    )
}

export default AllUsers