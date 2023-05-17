import { useEffect, useState } from "react"

import { useAuthContext } from "../hooks/useAuthContext"
import React from "react";
import { useNavigate } from 'react-router-dom'

import axios from 'axios';

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

//import '../CSS/table.css';


const AllUsers = () => {

    const { logout } = useLogout();
    //const {user} = useAuthContext()
    const navigate = useNavigate()

    const handleClick = () => {
      logout();
      navigate('/');
    };

    const [AllUserData, setAllUserData] = useState([]);

  useEffect(() => {
    const fetchAllUserData = async () => {
      try {
        const response = await axios.get('/api/allCurrentAndDeletedUsers');
        setAllUserData(response.data);

      } catch (error) {
        console.log('An error occurred:', error);
      }
    };

    fetchAllUserData();
  }, []);

    // const [Users, setUsers] = useState([]);
    // const [deletedUsers, setDeletedUsers] = useState([]);

    // useEffect(() => {
    //   const fetchUsers = async () => {
    //     try {
    //       const response = await fetch('/api/users/');
    //       const json = await response.json();
    //       setUsers(json);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    //   fetchUsers();
    // }, []);

    // useEffect(() => {
    //   const fetchDeletedUsers = async () => {
    //     try {
    //       const response1 = await fetch('/api/deletedusers/');
    //       const json = await response1.json();
    //       setDeletedUsers(json);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    //   fetchDeletedUsers();
    // }, []);

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
                <h3 className="pageTopic">All Users</h3>
            </div>

                <table className="table table-striped table-hover">
                  <thead style={{backgroundColor: "#144272"}}>
                      <tr> 
                        <th>Customer Name</th>
                        <th>Customer Type</th>
                        <th>Email</th>
                        <th>Phone number</th>
                      </tr>
                    </thead>

                    <tbody>
                      {AllUserData.userData && AllUserData.userData.map((data , index) => (
                        <tr key={index}>
                        <td>{data.title} {data.firstName} {data.lastName}</td>
                        <td> {data.userType} </td>
                        <td> {data.email} </td>
                        <td> {data.phone} </td>
                        </tr>
                      ))}
                      {AllUserData.deletedUserData && AllUserData.deletedUserData.map((data , index) => (
                        <tr key={index}>
                        <td>{data.title} {data.firstName} {data.lastName}</td>
                        <td> {data.userType} </td>
                        <td> {data.email} </td>
                        <td> {data.phone} </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
            </div> 
        </div>
        </>
    )
}


export default AllUsers