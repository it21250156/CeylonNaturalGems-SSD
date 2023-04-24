import { useEffect } from "react"
import { useGemsContext } from '../hooks/useGemsContext'
import '../CSS/GemAdmin.css';

import { useAuthContext } from "../hooks/useAuthContext"
import React from "react";
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import axios from 'axios';

// components
import GemDetails from "../components/GemDetails"


const GemAdminHome = () => {

  const { logout } = useLogout();
  const {user} = useAuthContext()
  const navigate = useNavigate()

  const handleClick = () => {
    logout();
    navigate('/');
  };

  const {gems, dispatch} = useGemsContext()

  useEffect(() => {
    const fetchGems = async () => {
      const response = await fetch('/api/gems')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_GEMS', payload: json})
      }
    }

    fetchGems()
  }, [dispatch])

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
    <div className="home">
      <button className="addGemButton" onClick = {() => {window.location.href = "./AddGem"}}> Add a New Gem </button>
      <div className="gems">
        {gems && gems.map(gem => (
          <GemDetails gem={gem} key={gem._id} />
        ))}
      </div>
      {/*<GemAddForm/>*/}
      
    </div>
    </>
  )
}

export default GemAdminHome