import React from 'react';
import axios from 'axios';
import { useNavigate  , useLocation  } from 'react-router-dom';
import profilePic from '../images/UserProfilePhoto.png'
import { useLogout } from '../hooks/useLogout'
import { useEffect, useState } from 'react';
import {useAuthContext} from  '../hooks/useAuthContext'


const  UserProfile = ()  => {

  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useLogout()


  const handleLogout = () => {
    logout()
    navigate('/');
  };

    const { dispatch } = useAuthContext()

    const HandleDeleteAccount = async() => {
        const response = await fetch(`/api/users/${user._id}` , {
            method: 'DELETE',
        })

        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_USER', payload: json})
            logout()
            navigate('/');
            window.location.reload()
        }

        
    }

 

  const user = JSON.parse(localStorage.getItem('userInfo'));

   /*******************************************************/ 

   const [userData, setUserData] = useState({});

   useEffect(() => {
    axios.get(`/api/users/${user._id}`)
      .then(res => setUserData(res.data))
      .catch(err => console.log(err));
  }, []);
    
    /*******************************************************/ 

  return (
  
    <div className='profileBodyContainer'>
            <div className="darkBlueTopicBoxUserprofile">
                <h3 className="pageTopicUserprofile">MY PROFILE</h3>
            </div>
            <div className="lightBlueBodyBGUserprofile">
                <div className="whiteBodyBGUserprofile">
                    <div className='profilePhotoDiv'>
                        <img src={profilePic}/>
                    </div>
                        <div className='UserName'>
                            <h1>Hello {userData.title} {userData.firstName} {userData.lastName}</h1>
                        </div> 
                        <button className='deleteAccountBtn' onClick={HandleDeleteAccount}>DELETE MY PROFILE</button>
                        <button className='logoutbtn' onClick={handleLogout}>LOGOUT</button>
                        <div className='UserDetails'>
                            <h3 className='UserDetailsTitle'>NAME :</h3>
                            <div className='UserDetailsContend'>
                                <h3>{userData.firstName} {userData.lastName}</h3>
                            </div>
                            <h3 className='UserDetailsTitle'>EMAIL :</h3>
                            <div>
                                <h3>{userData.email} </h3>
                            </div>
                            <h3 className='UserDetailsTitle'>MOBILE NO :</h3>
                            <div>
                                <h3>{userData.phone} </h3>
                            </div>
                            <h3 className='UserDetailsTitle'>USER TYPE :</h3>
                            <div>
                                <h3>{userData.userType} </h3>
                            </div>
                        </div>
                    <button>RESET PASSWORD</button>
                    <button onClick={() => {navigate(`/profile/editProfile/${user._id}`)}}>EDIT PROFILE</button>
                    <button>MY REQUESTS</button>
                    <button>MY FEEDBACKS</button>
                    <button onClick={() => {navigate(`/MyPayments`)}}>MY PAYMENTS</button>
                </div>
            </div>
    </div>
    

        
    

  );
};

export default UserProfile;
