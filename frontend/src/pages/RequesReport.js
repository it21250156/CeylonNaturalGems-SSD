import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout';


const RequestReport = () => {
  const [requests, setRequests] = useState([]);
  const { logout } = useLogout();
    const {user} = useAuthContext()
    const navigate = useNavigate()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/getUsers'); 
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClick = () => {
    logout();
    navigate('/');
  };

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
    <div>
    <div className="darkBlueTopicBoxReq">
          <h1 className="pageTopicReq">Request Report</h1>
        </div>
      <table className='reqreportTB'>
        <thead>
          <tr>
            <th className='reqTh'>First Name</th>
            <th className='reqTh'>Last Name</th>
            <th className='reqTh'>Email</th>
            <th className='reqTh'>Phone Number</th>
            <th className='reqTh'>Gem Type</th>
            <th className='reqTh'>Gem Color</th>
            <th className='reqTh'>Gem Shape</th>
            <th className='reqTh'>Description</th>
            <th className='reqTh'>Weight</th>
            <th className='reqTh'>Quantity</th>
            <th className='reqTh'>User</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>{request.FirstName}</td>
              <td>{request.LastName}</td>
              <td>{request.Email}</td>
              <td>{request.PhoneNo}</td>
              <td>{request.GemType}</td>
              <td>{request.GemColor}</td>
              <td>{request.GemShape}</td>
              <td>{request.Description}</td>
              <td>{request.Weight}</td>
              <td>{request.Quantity}</td>
              <td>{request.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default RequestReport;
