import {useState, useEffect} from "react";
import React from 'react';
import Axios from "axios";

function Myreply(){

    const [listOfReplies, setListOfReplies] = useState([]);

    useEffect(() => {
        Axios.get("/getReply").then((response) => {
          setListOfReplies(response.data);
        })
      }, [])

    return(
        <div>
            <div className='usersDisplay'>
                    {listOfReplies.map((user) => {
                    return(
                        <div>
                        <h1>Reply: {user.reply}</h1>
                        
                        </div>
                    )
                    })}
            </div>
        </div>
    )
}

export default Myreply;
