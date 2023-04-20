
import { useEffect, useState }from 'react'
import React from "react";


// components

const AdminUsers = () => {

    const [users , setUsers] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
        const response = await fetch('/api/user')
        const json = await response.json()
        
        if(response.ok){
            setUsers(json)
        }
    }
    fetchUsers()
    },[])

    return (
        <div className="lightBlueBodyBG">
            <div className="whiteBodyBG">
                <div className="darkBlueTopicBox">
                    <h3 className="pageTopic">All users</h3>
                </div>
                {users && users.map((user) => (
                    <p key={user._id}>{user._id} | {user.firstName} </p>  
                ))}
            </div>
        </div>
      )
}

const UserDetailBox = ({ user }) => {
    
    return(
    
        <div> 
            <h4> {user.title} {user.firstName} {user.lastName} </h4>  
        </div>
    )
}

export default AdminUsers