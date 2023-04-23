import '../CSS/AppBW.css';
import {useState, useEffect} from "react";
import React from 'react';
import Axios from "axios";
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';


const schema = yup.object().shape({
    newGemShape: yup.string(),
    newGemColour: yup.string(),
    newGemDescription: yup.string(),
    newGemWeight: yup.number().positive(),
  });
  

function MyReq(){

    const [listOfRequests, setListOfRequests] = useState([]);
    const [newGemShape, setNewGemShape] = useState('');
    const [newGemColour, setNewGemColour] = useState('');
    const [newGemDescription, setNewnewGemDescription] = useState('');
    const [newGemWeight, setNewnewGemWeight] = useState('');

    const deletereq = (id) => {
        Axios.delete(`/delete/${id}`).then((response) => {
            alert("Deleted Successuflly! Please refresh the page");
          });;
    };

    useEffect(() => {
        Axios.get("/getUsers").then((response) => {
          setListOfRequests(response.data);
        });
      }, []);
    

      const updateGemShape = (id) => {
        if (newGemShape) {
          Axios.put("/updateGshape", {
            id: id,
            newGemShape: newGemShape,
          }).then((response) => {
            alert("Updated Successfully! Please refresh the page");
          });
        }
      }
      
      const updateGemColour = (id) => {
        if (newGemColour) {
          Axios.put("/updateGsCl", {
            id: id,
            newGemColour: newGemColour,
          }).then((response) => {
            alert("Updated Successfully! Please refresh the page");
          });
        }
      }
      
      const updateGemDescription = (id) => {
        if (newGemDescription) {
          Axios.put("/updateDes", {
            id: id,
            newGemDescription: newGemDescription,
          }).then((response) => {
            alert("Updated Successfully! Please refresh the page");
          });
        }
      }
      
      const updateGemWeight = (id) => {
        if (newGemWeight) {
          Axios.put("/updateWt", {
            id: id,
            newGemWeight: newGemWeight,
          }).then((response) => {
            alert("Updated Successfully! Please refresh the page");
          });
        }
      }
      

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
      });
      
    
    return(
        <div className="MyRequests">

        <div className='headding'>
          My Requests
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

                    <form>
                    <input 
                        type='text' 
                        placeholder='Edit gem shape....' 
                        className='edtsp'
                        onChange={(event) => {
                            setNewGemShape(event.target.value);
                        }}/>

                    <input 
                        type='text' 
                        placeholder='Edit gem colour....' 
                        className='edtcl'
                        onChange={(event) => {
                            setNewGemColour(event.target.value);
                        }}/>
                    
                    <TextareaAutosize  minRows={2} maxRows={6} type="textbox"  
                         
                        placeholder='Edit description....' 
                        className='edtds'
                        onChange={(event) => {
                            setNewnewGemDescription(event.target.value);
                        }}/>

                    <input 
                        type='number' 
                        placeholder='Edit weight....' 
                        className='edtwt'
                        onChange={(event) => {
                            setNewnewGemWeight(event.target.value);
                        }}/>

                    <button className='updatebtn' onClick={() => {
                        updateGemColour(user._id)
                        updateGemShape(user._id)
                        updateGemDescription(user._id)
                        updateGemWeight(user._id)
                        }}>Update</button>
                    </form>
                    

                    
                    <button className='delbtn' onClick={() => deletereq(user._id)} >Delete</button>
                
                </div>
            );
            })}

            </div>

            <button className='viewreqbt' onClick={() => {window.location.href = "./reqM"}}>Create a new request</button>
        </div>
    )

}

export default MyReq;