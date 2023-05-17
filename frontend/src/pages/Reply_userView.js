import { useState, useEffect } from "react";
import React from 'react';
import Axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

function Reply_userView() {
    const { reqId } = useParams()
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        Axios.get(`/getReply/${reqId}`).then((response) => {
            setReplies(response.data);
        })
    }, [])

    return (
        <>
            <Header />
            <div className="darkBlueTopicBoxReq">
                <h1 className="pageTopicReq">Replies from admin</h1>
            </div>
            <div>
                <div className='lightBlueBodyBG'>
                    {replies.length > 0 ? (
                        replies.map(reply =>
                            <div className="whiteBodyBG">
                                <h1>{reply.reply}</h1>
                            </div>
                        )
                    ) : (
                        <div className="whiteBodyBG">
                            Sorry, you haven't got a reply from admin.
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Reply_userView;
