import { useState, useEffect } from "react";
import React from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

function Reply_adminView() {
  const { reqId } = useParams();
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    Axios.get(`/getReply/${reqId}`).then((response) => {
      setReplies(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    Axios.delete(`/deleteReply/${id}`).then(() => {
      setReplies(replies.filter((reply) => reply._id !== id));
    });
  };

  return (
    <>
      <Header />
      <div className="darkBlueTopicBoxReq">
        <h1 className="pageTopicReq">My Replies</h1>
      </div>
      <div>
        <div className="lightBlueBodyBG">
          {replies &&
            replies?.map((reply) => (
              <div className="whiteBodyBG">
                <h1> {reply.reply}</h1>

                <button onClick={() => handleDelete(reply._id)}>Delete</button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Reply_adminView;
