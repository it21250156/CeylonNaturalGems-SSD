import {useEffect }from 'react'
import { useFeedbacksContext }from '../hooks/useFeedbackContext'

import { useAuthContext } from "../hooks/useAuthContext"
import React from "react";
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

//components

import FeedbackDetailsAdmin from '../components/FeedbackDetailsAdmin'

const AdminFeedbacks = () =>{
  const {feedbacks, dispatch} = useFeedbacksContext()

  const { logout } = useLogout();
    const {user} = useAuthContext()
    const navigate = useNavigate()

    const handleClick = () => {
      logout();
      navigate('/');
    };

  useEffect(() =>{
    const fetchFeedbacks = async () => {
      const response = await fetch('/api/feedbacks')
      const json = await response.json()

      if(response.ok) {

        dispatch({type: 'SET_FEEDBACKS', payload: json})
        
      }
    }

    fetchFeedbacks()
  },[dispatch])

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
        <div className="Adminfeedbacks">
          <div classname = "feedbacks">
            {feedbacks && feedbacks.map((feedback) =>(
              <FeedbackDetailsAdmin key={feedback._id} feedback={feedback} />
            ))}

          </div>
          {/* <FeedbackForm/> */}
          {/* <button onClick= {() => {window.location.href = "./FeedbackForm"}}> Add Feedback</button> */}
        </div>
</>
        
    )
}
export default  AdminFeedbacks 
