import {useState, useEffect} from "react";
import React from 'react';
import Axios from "axios";
import { useParams } from "react-router-dom";

function Reply_userView(){
    const {reqId} = useParams()
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        Axios.get(`/getReply/${reqId}`).then((response) => {
            setReplies(response.data);
        })
      }, [])

    return(
        <div>
            <div className='lightBlueBodyBG'>
                    {replies && 
                    replies?.map( reply => 
                        <div className="whiteBodyBG">
                        <h1>Reply: {reply.reply}</h1>
                        
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Reply_userView;
