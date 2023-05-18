import React from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import profilePic from '../images/UserProfilePhoto.png';
import { useLogout } from '../hooks/useLogout';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import '../CSS/UserProfile.css';
import Header from '../components/Header';

const UserProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useLogout();
  const [showModal, setShowModal] = useState(false);


  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleConfirm = () => {
    setShowModal(false);
    HandleDeleteAccount();
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const { dispatch } = useAuthContext();

  const HandleDeleteAccount = async () => {
    try {
      // send delete user request
      const response = await fetch(`/api/users/${user._id}`, {
        method: 'DELETE',
      });

      const json = await response.json();

      if (response.ok) {
        // get current user details when user trying to delete the account
        const newDeletedUser = {
          userID: userData._id,
          userType: userData.userType,
          title: userData.title,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
        };

        // send user inmportant data to an another collection
        const response1 = await fetch('/api/deletedusers', {
          method: 'POST',
          body: JSON.stringify(newDeletedUser),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await response1.json();

        dispatch({ type: 'CREATE_DELETED_USER', payload: json });

        console.log('new deletedUser added', json);

        // delete a user and set he/she can't login with these user login details again

        dispatch({ type: 'DELETE_USER', payload: json });
        logout();
        navigate('/');
        window.location.reload();
      }
    } catch {}
  };

  const user = JSON.parse(localStorage.getItem('userInfo'));

  /*******************************************************/

  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .get(`/api/users/${user._id}`)
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, []);

  /*******************************************************/

  return (
    <>
      <Header />
      <div className="profileBodyContainer">
        <div className="darkBlueTopicBoxUserprofile">
          <h3 className="pageTopicUserprofile">MY PROFILE</h3>
        </div>
        <div className="lightBlueBodyBGUserprofile">
          <div className="top-pic-btns">
            <div className="profilePhotoDiv">
              <img src={profilePic} />
            </div>
            <div className="top-btns">
              <div>
                <button
                  className="deleteAccountBtn"
                 // onClick={HandleDeleteAccount}
                  onClick={() => setShowModal(true)}
                >
                  DELETE MY PROFILE
                </button>
                <button className="logoutbtn" onClick={handleLogout}>
                  LOGOUT
                </button>
              </div>
            </div>
          </div>
          <div className="details-area">
            <div className="UserName">
              <h1 className="username-h1">
                Hello {userData.title} {userData.firstName} {userData.lastName}
              </h1>
            </div>
            <div className="user-details">
              <table className="profile-table">
                <tr>
                  <td className="detail-label">Name</td>
                  <td className="detail-prop">
                    {userData.firstName} {userData.lastName}
                  </td>
                </tr>
                <tr>
                  <td className="detail-label">Email</td>
                  <td className="detail-prop">{userData.email}</td>
                </tr>
                <tr>
                  <td className="detail-label">Mobile Number</td>
                  <td className="detail-prop">{userData.phone}</td>
                </tr>
                <tr>
                  <td className="detail-label">User Type</td>
                  <td className="detail-prop">{userData.userType}</td>
                </tr>
              </table>
            </div>

            <div className="edt-andreset-pw-btns">
              <button
                className="reset-pw-btn"
                onClick={() => {
                  navigate(`/profile/resetPassword/${user._id}`);
                }}
              >
                RESET PASSWORD
              </button>
              <button
                className="edt-prof-btn"
                onClick={() => {
                  navigate(`/profile/editProfile/${user._id}`);
                }}
              >
                EDIT PROFILE
              </button>
            </div>
          </div>
          <div className="bottom-btns-3"></div>
          <button
            className="my---btn"
            onClick={() => {
              navigate('/MyReq');
            }}
          >
            MY REQUESTS
          </button>
          <Link to={'/UserFeedbacks'}>
            <button className="my---btn">MY FEEDBACKS</button>
          </Link>
          <button
            className="my---btn"
            onClick={() => {
              navigate(`/MyPayments`);
            }}
          >
            MY PAYMENTS
          </button>

          {showModal && (
          <div className="modal-container">
            <div className="modal-content">
              <h2 className="modal-title">Confirm Deletion</h2>
              <p className="modal-message">Are you sure ! <br></br> you want to delete this Account ?</p>
              <div className="modal-actions">
                <button className="modal-button confirm" onClick={handleConfirm}>
                  Confirm
                </button>
                <button className="modal-button cancel" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        </div>
      </div>
    </>
  );
};

export default UserProfile;
