import { useEffect }from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import React from "react";
import { useNavigate } from 'react-router-dom'



// components

const AdminHome = () => {
    const {user} = useAuthContext()
    const navigate = useNavigate()


    useEffect(() => {
        const fetchWorkouts = async () => {
          const response = await fetch('/api/ceylonGems', {
            headers: {'Authorization': `Bearer ${user.token}`},
          })
          const json = await response.json()
    
        }

    
        if (user) {
          fetchWorkouts()
        }
      }, [user])
    return (
      <div className="home">
      <h1>hi Admin</h1>
      <button onClick={() => {navigate("/JewelleryAdminDashboard")}}>Jewellery</button>
    </div>
      )
}

export default AdminHome