import { useState, useEffect } from "react";
import React from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import "../CSS/AppBW.css";
import Header from "../components/Header";
import TextareaAutosize from 'react-textarea-autosize';
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { Link, useParams } from 'react-router-dom';

function Reply_adminView() {
  const { reqId } = useParams();
  const [replies, setReplies] = useState([]);
  const { logout } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    const getReplies = () => {
      Axios.get(`/getReply/${reqId}`).then((response) => {
        setReplies(response.data);
      });
    }
    getReplies();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        Axios.delete(`/deleteReply/${id}`).then(() => {
          setReplies(replies.filter((reply) => reply._id !== id));
        });
      }
    });
  };

  const handleUpdate = (repId) => {
    const data = replies.find(rep => rep._id === repId);
    if (data) {
      Axios
        .put(`/updateReply`, data)
        .then(() => {
          window.location.reload();
        });
    }
  }

  const handleClick = () => {
    logout();
    navigate('/');
  };

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
                <span>Hello Admin</span>
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
      <div className="darkBlueTopicBoxReq">
        <h1 className="pageTopicReq">My Replies</h1>
      </div>
      <div>
        <div className="lightBlueBodyBG">
          {replies.length > 0 ? (
            replies.map((reply) => (
              <div className="whiteBodyBG">
                Update your reply or delete :
                <div>
                  <TextareaAutosize
                    className="replytxt"
                    minRows={3}
                    maxRows={6}
                    placeholder="Enter your reply here"
                    style={{ width: "90%" }}
                    value={reply.reply}
                    onChange={(event) => setReplies(
                      replies.map(rep => rep._id === reply._id ? {...rep, reply: event.target.value} : rep )
                    )}
                  />
                  <button className='Srepbtn' onClick={() => handleUpdate(reply._id)}>Update Reply</button>
                </div>
                <button className="replydeletebtn" onClick={() => handleDelete(reply._id)}>Delete</button>
              </div>
            ))
          ) : (
            <div className="whiteBodyBG">
              You haven't replied to this request
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Reply_adminView;
