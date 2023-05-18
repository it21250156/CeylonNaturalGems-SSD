// components
import { useEffect } from "react"
import JewelleryAddForm from "../components/JewelleryAddForm"
import { useJewelleryesContext } from "../hooks/useJewelleryesContext"

import { useAuthContext } from "../hooks/useAuthContext"
import React from "react";
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import axios from 'axios';

const AddJewellery = () => {

  const { logout } = useLogout();
  const {user} = useAuthContext()
  const navigate = useNavigate()

  const handleClick = () => {
    logout();
    navigate('/');
  }
  const {Jewelleryes, dispatch} = useJewelleryesContext()

  useEffect(() => {
    const fetchJewelleryes = async () => {
    const response = await fetch('/api/jewelleryes')
    const json = await response.json()

    if(response.ok) {

      dispatch({type: 'SET_JEWELLERYES', payload: json})
    }
}
  fetchJewelleryes()


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
    <div className="addJewellery">
      
      <JewelleryAddForm/>
    </div>
    </>
  )
}

export default AddJewellery