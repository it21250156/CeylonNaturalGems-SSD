import React from "react";
import { Link, useParams } from 'react-router-dom';

function ReplyRequest(){
    return(
        <div>
            reply<button onClick={() => {window.location.href = "./"}}>Home</button>
        </div>
    )
}

export default ReplyRequest;