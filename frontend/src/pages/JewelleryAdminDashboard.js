import { useEffect, useState } from "react"
import { useJewelleryesContext } from '../hooks/useJewelleryesContext'
import { useNavigate } from "react-router-dom"


import { useAuthContext } from "../hooks/useAuthContext"
import React from "react";

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import axios from 'axios';

// components
import JewelleryDetails from "../components/JewelleryDetails"
import JewelleryAddForm from "../components/JewelleryAddForm"

const JewelleryAdminDashboard = () => {
  const navigate = useNavigate()

  const { logout } = useLogout();
    const {user} = useAuthContext()
    const handleClick = () => {
      logout();
      navigate('/');
    };

  //const {jewellery, dispatch} = useJewelleryesContext()
  const [jewellery , setjewellery] = useState(null)

  useEffect(() => {
    const fetchJewelleryes = async () => {
      const response = await fetch('/api/jewelleryes')
      const json = await response.json()

      if (response.ok) {
        //dispatch({type: 'SET_JEWELLERY', payload: json})
        setjewellery(json)
      }
    }

    fetchJewelleryes()
  }, [])

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
      <div className="jewelleryes">
        {jewellery && jewellery.map(jewellery => (
          <JewelleryDetails jewellery={jewellery} key={jewellery._id} />
        ))}
      </div>
      {/* <JewelleryAddForm/> */}
      <button onClick={() => {navigate("/AddJewelleryes")}}>Add a new jewellery</button>
    </div>
    </>
  )
}

export default JewelleryAdminDashboard