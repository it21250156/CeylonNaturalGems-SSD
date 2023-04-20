import { useEffect }from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import React from "react";
import { useNavigate } from 'react-router-dom'



// components

const Home = () => {
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
        <div className="lightBlueBodyBG">
            <div className="whiteBodyBG">
                <div className="darkBlueTopicBox">
                    <h3 className="pageTopic">ADMIN HOME</h3>
                </div>
                <h1>Home Body</h1>
                <button onClick={() => {navigate(`/UserProfile/${user._id}`)}}>My Profile</button>
            </div>
        </div>
      )
}

export default Home