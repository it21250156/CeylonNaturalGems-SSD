import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import Axios from 'axios';
import Header from '../components/Header';

function Myreply() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [listOfReplies, setListOfReplies] = useState([]);
  const { logout } = useLogout();
  
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
  };

  const deletereq = (id) => {
    Axios.delete(`/deleteRep/${id}`).then((response) => {
      window.location.reload();
    });
  };

  const confirmDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      deletereq(id);
    }
  };

  useEffect(() => {
    Axios.get('/getReply').then((response) => {
      setListOfReplies(response.data);
    });
  }, []);

  const handleClick = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header>
        <div>
          <div className="background">
            <div className="headerNameDiv">
              <h1 className="headerName">Ceylon Natural Gems</h1>
            </div>
          </div>

          <nav>
            <div className="navprofileDiv">
              <div className="navEmal">
                <span className="welcomeNoteAdmin">Hello Admin</span>
                <button className="adminLogoutBtn" onClick={handleClick}>
                  Log out
                </button>
              </div>
            </div>

            <ul>
              <li>
                <Link to={'/adminHome'}>Home</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div>
        <div className="lightBlueBodyBG">
          {listOfReplies.map((user) => {
            return (
              <div className="whiteBodyBG">
                <h1>Reply: {user.reply}</h1>
                <button class="btn-del" onClick={() => confirmDelete(user._id)}>
                  <p class="paragraph"> delete </p>
                  <span class="icon-wrapper">
                    <svg
                      class="icon"
                      width="30px"
                      height="30px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Myreply;
