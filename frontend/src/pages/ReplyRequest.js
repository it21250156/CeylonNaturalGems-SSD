import '../CSS/AppBW.css';
import {useState, useEffect} from "react";
import Axios from "axios";
import TextareaAutosize from 'react-textarea-autosize';

import { useAuthContext } from "../hooks/useAuthContext"
import React from "react";
import { useNavigate, useParams } from 'react-router-dom'

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';



function ReplyRequest(){
    const {reqId} = useParams()
    const { logout } = useLogout();
    const {user} = useAuthContext()
    const navigate = useNavigate()

    const handleClick = () => {
      logout();
      navigate('/');
    };
    

    // const [listOfReplies, setListOfReplies] = useState([]);
    const [reply, setReply] = useState("");

    // useEffect(() => {
    //     Axios.get("/getReply").then((response) => {
    //       setListOfReplies(response.data);
    //     })
    //   }, [])
    
      const createReply = () => {
        
        Axios.post(`/createReply/`,{
          reply,
          reqId
        }).then((response) => {
          alert("wade goda bosa!");
        })
      }
  

    return(
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
        <div>
            <div className="darkBlueTopicBoxReq">
                <h1 className="pageTopicReq">Reply</h1>
            </div>

            {/* <div className='usersDisplay'>
                    {listOfReplies.map((user) => {
                    return(
                        <div>
                        <h1>Reply: {user.reply}</h1>
                        
                        </div>
                    )
                    })}
            </div> */}

            <div className="lightBlueBodyBG">
                Wtite your reply:

                

                <div>
                    <TextareaAutosize
                        className="replytxt"
                        minRows={3}
                        maxRows={6}
                        placeholder="Enter your reply here"
                        style={{ width: "90%" }}
                        onChange={(event) =>{
                            setReply(event.target.value);
                        }}
                        />

                    {/* <input type="text" placeholder="Name...." onChange={(event) => {
                            setReply(event.target.value);
                            }}></input> */}
                    
                </div>
                
                
                <button className='Srepbtn' onClick={createReply}>Send Reply</button>
                {/* {JSON.stringify(data)} */}
            </div>
        </div>
        </>
    )
}

export default ReplyRequest;