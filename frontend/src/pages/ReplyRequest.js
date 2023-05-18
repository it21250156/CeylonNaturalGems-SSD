import "../CSS/AppBW.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

import { useAuthContext } from "../hooks/useAuthContext";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import Swal from "sweetalert2";

function ReplyRequest() {
  const { reqId } = useParams();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/");
  };

  const [reply, setReply] = useState("");
  const [replyError, setReplyError] = useState("");

  const createReply = () => {
    if (reply.trim() === "") {
      setReplyError("Please enter your reply.");
      return;
    }

    Axios.post(`/createReply/`, {
      reply,
      reqId,
    }).then((response) => {
      alert("Reply added!");
    });
  };

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
          Swal.fire('Reply added succsessfully!')
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
                <span className="welcomeNoteAdmin">Hello Admin</span>
                <button className="adminLogoutBtn" onClick={handleClick}>
                  Log out
                </button>
              </div>
            </div>

            <ul>
              <li>
                <Link to={"/adminHome"}>Home</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div>
        <div className="darkBlueTopicBoxReq">
          <h1 className="pageTopicReq">Reply</h1>
        </div>

        <div className="lightBlueBodyBG">
          Write your reply:
          <div>
            <TextareaAutosize
              className="replytxt"
              minRows={3}
              maxRows={6}
              placeholder="Enter your reply here"
              style={{ width: "90%" }}
              onChange={(event) => {
                setReply(event.target.value);
              }}
            />
            {replyError && <p className="error">{replyError}</p>}
          </div>
          <button className="Srepbtn" onClick={createReply}>
            Send Reply
          </button>
        </div>
      </div>
    </>
  );
}

export default ReplyRequest;
