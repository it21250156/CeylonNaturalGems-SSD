import {useState, useEffect} from "react";
import React from 'react';
import Axios from "axios";

function Reply_userView(){

    const [listOfReplies, setListOfReplies] = useState([]);

    useEffect(() => {
        Axios.get("/getReply").then((response) => {
          setListOfReplies(response.data);
        })
      }, [])

    return(
        <div>
            <div className='lightBlueBodyBG'>
                    {listOfReplies.map((user) => {
                    return(
                        <div className="whiteBodyBG">
                        <h1>Reply: {user.reply}</h1>
                        
                        </div>
                    )
                    })}
            </div>
        </div>
    )
}

export default Reply_userView;
