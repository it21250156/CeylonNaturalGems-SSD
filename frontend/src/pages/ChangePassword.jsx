import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import '../CSS/UserProfileUpdate.css';

function ChangePassword() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('userInfo'));

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <>
      <Header />
      <div className="lightBlueBodyBG">
        <div className="whiteBodyBG">
          <div className="darkBlueTopicBoxUpdateProf">
            <h3 className="pageTopic">CHANGE PASSWORD</h3>
          </div>
          <div className="inner-lightblue-box">
            <form
              className="signup"
              onSubmit={async (e) => {
                e.preventDefault();

                const resetpassword = {
                  password,
                  confirmPassword,
                };

                await axios
                  .patch(`/api/users/${user._id}`, resetpassword)
                  .then((res) => {
                    document.location.href = `/profile/${user._id}`;
                  })
                  .catch((err) => {
                    console.log(err);
                    alert('Password Update Failed');
                  });
              }}
            >
              <label className="label">New Password:</label>
              <input
                id="input"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required="required"
                placeholder="Password..."
              />

              <label className="label">Confirm Password:</label>
              <input
                id="input"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required="required"
                placeholder="Confirm Password..."
              />

              <button className="updateprof-btn" type="submit">
                RESET PASSWORD
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

export default ChangePassword;
