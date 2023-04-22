import '../CSS/AppBW.css';
import {useState, useEffect} from "react";
import React from 'react';
import Axios from "axios";
import { Link, useParams } from 'react-router-dom';

  

function MyReq(){

    const [listOfRequests, setListOfRequests] = useState([]);
    

    useEffect(() => {
        Axios.get("/getUsers").then((response) => {
          setListOfRequests(response.data);
        });
      }, []);
      
    
    return(
        <div className="MyRequests">

            <div className='headding'>
                     <h1>All Requests</h1>
            </div>

            <div className="requestM">

            {listOfRequests.map((user) => {
            return(
                <div className='requestL'>
                    <div className='reqtextbox'>
                        {/* <pre className='txt1'>Request ID        : {user.requestID}</pre> */}
                        <pre className='txt1'>FirstName         : {user.FirstName}</pre>
                        <pre className='txt1'>LastName          : {user.LastName}</pre>
                        <pre className='txt1'>Email                 : {user.Email}</pre>
                        <pre className='txt1'>PhoneNo           : {user.PhoneNo}</pre>
                        <pre className='txt1'>GemType           : {user.GemType}</pre>
                        <pre className='txt1'>GemColor          : {user.GemColor}</pre>
                        <pre className='txt1'>GemShape        : {user.GemShape}</pre>
                        <p className='txt1'>Description&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {user.Description}</p>
                        <pre className='txt1'>Weight               : {user.Weight}</pre>
                        <pre className='txt1'>Quantity             : {user.Quantity}</pre>
                    </div>
                    
                    <button className='repbtn' onClick={() => {window.location.href = "./reqRp"}}>Reply</button>
                
                </div>
            );
            })}

            </div>
        </div>
    )

}

export default MyReq;