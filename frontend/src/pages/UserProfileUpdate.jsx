import React, { useEffect , useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

function UserProfileUpdate() {

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('userInfo'));

  const [userType, setUserType] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [userData, setUserData] = useState({});

   useEffect(() => {
    axios.get(`/api/users/${user._id}`)
      .then(res => setUserData(res.data),
            res => setUserType(res.data.userType),
            res => setFirstName(res.data.firstName),
            res => setLastName(res.data.lastName),
            res => setEmail(res.data.email),
            res => setPhone(res.data.phone),)
      .catch(err => console.log(err));
  }, []);


  return (
    <>
    <Header/>
    <div className="lightBlueBodyBG">
            <div className="whiteBodyBG">
                <div className="darkBlueTopicBox">
                    <h3 className="pageTopic">EDIT MY PROFILE</h3>
                </div>
                <form className="signup" 
                  onSubmit={async (e) => {
                    e.preventDefault();

                    const updatedUser = {
                      userType,
                      firstName,
                      lastName,
                      email,
                      phone,

                    };

                    await axios
                      .patch(`/api/users/${user._id}`, updatedUser)
                      .then((res) => {
                        document.location.href = `/profile/${user._id}`
                      })
                      .catch((err) => {
                        console.log(err);
                        alert('User Update Failed');
                      });
                  }}>

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
                    readOnly={false}
                    placeholder={userData.firstName} 
                  />

                  <label className="lNameLabel">Last Name:</label>
                  <input className="lNameInput"
                    type="text" 
                    onChange={(e) => setLastName(e.target.value)} 
                    value={lastName} 
                   placeholder={userData.lastName} 
                  />

                  <label className="emailLabel">Email address:</label>
                  <input className="emailInput"
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                   placeholder={userData.email} 
                  />

                  <label className="phoneLabel">Phone Number:</label>
                  <input className="phoneInput" 
                    type="phone" 
                    onChange={(e) => setPhone(e.target.value)} 
                    value={phone} 
                   placeholder={userData.phone} 
                  />

                  <button type="submit" >SAVE CHANGES</button>
                  <button onClick={() => {navigate(`/profile/${user._id}`)}}>CANCEL</button>
                  
                </form>
            </div>
    </div>
    </>
  )
}

export default UserProfileUpdate ;