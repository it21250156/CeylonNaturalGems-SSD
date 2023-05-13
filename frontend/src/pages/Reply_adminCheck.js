import { useState, useEffect } from "react";
import React from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import TextareaAutosize from 'react-textarea-autosize';

function Reply_adminView() {
  const { reqId } = useParams();
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const getReplies = () => {
      Axios.get(`/getReply/${reqId}`).then((response) => {
        setReplies(response.data);
      });
    }
    getReplies()
  }, []);

  const handleDelete = (id) => {
    Axios.delete(`/deleteReply/${id}`).then(() => {
      setReplies(replies.filter((reply) => reply._id !== id));
    });
  };

  const handleUpdate = (repId) => {
    const data = replies.find(rep => rep._id === repId)
    if (data)
      Axios
        .put(`/updateReply`, data)
        .then(() => {
          window.location.reload()
        });
  }

  return (
    <>
      <Header />
      <div className="darkBlueTopicBoxReq">
        <h1 className="pageTopicReq">My Replies</h1>
      </div>
      {}
      <div>
        <div className="lightBlueBodyBG">
          {replies &&
            replies?.map((reply) => (
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
                <button onClick={() => handleDelete(reply._id)}>Delete</button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Reply_adminView;
