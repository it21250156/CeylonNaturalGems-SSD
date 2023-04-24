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

        <div className="darkBlueTopicBoxReq">
          <h1 className="pageTopicReq">All requests</h1>
        </div>

            <div className="requestM">

            {listOfRequests.map((user) => {
            return(
                <div className='lightBlueBodyBG'>
                    <div className='whiteBodyBG'>
                    <div className="myreq-column-1">
                    <table>
                      <tr>
                        <td className="req-lable">First Name</td>
                        <td className="req-value">{user.FirstName}</td>
                      </tr>
                      <tr>
                        <td className="req-lable">Last Name</td>
                        <td className="req-value">{user.LastName}</td>
                      </tr>
                      <tr>
                        <td className="req-lable">Email</td>
                        <td className="req-value">{user.Email}</td>
                      </tr>
                      <tr>
                        <td className="req-lable">Mobile Number</td>
                        <td className="req-value">{user.PhoneNo}</td>
                      </tr>
                      <tr>
                        <td className="req-lable">Gem Type</td>
                        <td className="req-value">{user.GemType}</td>
                      </tr>
                      <tr>
                        <td className="req-lable">Gem Color</td>
                        <td className="req-value">{user.GemColor}</td>
                      </tr>
                      <tr>
                        <td className="req-lable">Gem Shape</td>
                        <td className="req-value">{user.GemShape}</td>
                      </tr>
                      <tr>
                        <td className="req-lable">Description</td>
                        <td className="req-value">{user.Description}</td>
                      </tr>
                      <tr>
                        <td className="req-lable">Weight</td>
                        <td className="req-value">{user.Weight}</td>
                      </tr>
                      <tr>
                        <td className="req-lable">Quantity</td>
                        <td className="req-value">{user.Quantity}</td>
                      </tr>
                    </table>
                  </div>
                    </div>
                    
                    <button className='repbtn' onClick={() => {window.location.href = "./reqReply"}}>Reply</button>
                
                </div>
                
            );
            })}
            <Link to={'/Myrep'}>
              <button className="req-btn">View My Replies</button>
            </Link>
            </div>
        </div>
    )

}

export default MyReq;