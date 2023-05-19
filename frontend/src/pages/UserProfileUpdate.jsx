import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import '../CSS/UserProfileUpdate.css';

function UserProfileUpdate() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('userInfo'));

  const [userType, setUserType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .get(`/api/users/${user._id}`)
      .then(
        (res) => setUserData(res.data),
        (res) => setUserType(res.data.userType),
        (res) => setFirstName(res.data.firstName),
        (res) => setLastName(res.data.lastName),
        (res) => setEmail(res.data.email),
        (res) => setPhone(res.data.phone)
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <div className="lightBlueBodyBG">
        <div className="whiteBodyBG">
          <div className="darkBlueTopicBoxUpdateProf">
            <h3 className="pageTopic">EDIT MY PROFILE</h3>
          </div>
          <div className="inner-lightblue-box">
            <form
              className="signup"
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
                    document.location.href = `/profile/${user._id}`;
                  })
                  .catch((err) => {
                    console.log(err);
                    alert('User Update Failed');
                  });
              }}
            >
              <label className="label">I Am:</label>
              <select
                id="input"
                className="iAmDropDown"
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="">Select in hear</option>
                <option value="A Gem Merchant" defaultValue={true}>
                  A Gem Merchant
                </option>
                <option value="A Gem Collector">A Gem Collector</option>
                <option value="A Jeweller">A Jeweller</option>
              </select>

              <label className="label">First Name:</label>
              <input
                id="input"
                className="fNameInput"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                readOnly={false}
                placeholder={userData.firstName}
              />

              <label className="label">Last Name:</label>
              <input
                id="input"
                className="lNameInput"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                placeholder={userData.lastName}
              />

              <label className="label">Email address:</label>
              <input
                id="input"
                className="emailInput"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder={userData.email}
              />

              <label className="label">Phone Number:</label>
              <input
                id="input"
                className="phoneInput"
                type="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                placeholder={userData.phone}
              />

              <button className="updateprof-btn" type="submit">
                SAVE CHANGES
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  navigate(`/profile/${user._id}`);
                }}
              >
                CANCEL
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfileUpdate;
