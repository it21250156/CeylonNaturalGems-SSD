import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { useSignup } from "../hooks/useSignup"


function UserRegistration() {

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [userType, setUserType] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const {signup, error, isLoading} = useSignup()


  return (
    <div className="lightBlueBodyBG">
            <div className="whiteBodyBG">
                <div className="darkBlueTopicBox">
                    <h3 className="pageTopic">REGISTRATION</h3>
                </div>
                <form className="signup" 
                  onSubmit={async (e) => {
                  e.preventDefault();

                  await signup(title, userType ,firstName , lastName ,  email, phone , password , confirmPassword)

                  // const newUser = {
                  //   title,
                  //   userType,
                  //   firstName,
                  //   lastName,
                  //   email,
                  //   phone,
                  //   password,
                  //   confirmPassword,

                  // };

                  // await axios
                  //   .post('http://localhost:4000/users/Register', newUser)
                  //   .then((res) => {
                  //     document.location.href = '/login';
                  //   })
                  //   .catch((err) => {
                  //     console.log(err);
                  //     alert('User Registration Failed');
                  //   });
                }}>


                <label className="titleLabel">Title:</label>
                  <select className="titleDropDown" onChange={(e) => setTitle(e.target.value)}>
                    <option value="" >Select</option>
                    <option value="Mr." >Mr.</option>
                    <option value="Miss.">Miss.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Rev.">Rev.</option>
                  </select>

                  <label className="iAmLabel">I Am:</label>
                  <select className="iAmDropDown" onChange={(e) => setUserType(e.target.value)}>
                  <option value="" >Select in hear</option>
                    <option value="A Gem Merchant" defaultValue={true} >A Gem Merchant</option>
                    <option value="A Gem Collector">A Gem Collector</option>
                    <option value="A Jeweller">A Jeweller</option>
                  </select>

                  <label className="fNameLabel">First Name:</label>
                  <input className="fNameInput"
                    type="text" 
                    onChange={(e) => setFirstName(e.target.value)} 
                    value={firstName} 
                    required="required"
                    placeholder="Enter your first name hear..."
                  />

                  <label className="lNameLabel">Last Name:</label>
                  <input className="lNameInput"
                    type="text" 
                    onChange={(e) => setLastName(e.target.value)} 
                    value={lastName} 
                    required="required"
                    placeholder="Enter your last name hear..."
                  />

                  <label className="emailLabel">Email address:</label>
                  <input className="emailInput"
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                    required="required"
                    placeholder="Enter your Email hear..."
                  />

                  <label className="phoneLabel">Phone Number:</label>
                  <input className="phoneInput" 
                    type="phone" 
                    onChange={(e) => setPhone(e.target.value)} 
                    value={phone} 
                    required="required"
                    placeholder="0761760579 or +94761760579"
                  />

                  <label className="pwLabel">Password:</label>
                  <input 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                    required="required"
                    placeholder="Password..."
                  />

                  <label>Confirm Password:</label>
                  <input 
                    type="password" 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    value={confirmPassword} 
                    required="required"
                    placeholder="Confirm Password..."
                  />

                  {error && <div className="error">{error}</div>}
                  <button type="submit" disabled={isLoading}>REGISTER</button>
                  <button onClick={() => {navigate("/");}} disabled={isLoading}>CANCEL</button>

                  <p className="">All ready have an account?{'  '}<Link to="/login" className=""> LOGIN </Link></p>
                  
                </form>
            </div>
    </div>
    
  )
}

export default UserRegistration ;