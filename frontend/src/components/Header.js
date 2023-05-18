import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import '../CSS/Header.css';

const Header = () => {
  const { logout } = useLogout();
  const { user, cartData, setCartData } = useAuthContext();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // const [userData, setUserData] = useState({});

  // useEffect(() => {
  //  axios.get(`http://localhost:4000/users/${userInfo._id}`)
  //    .then(res => setUserData(res.data))
  //    .catch(err => console.log(err));
  // }, []);

  const navigate = useNavigate();
  // const [cartData, setCartData] = useState([]);

  const handleClick = () => {
    logout();
    navigate('/');
  };
  // const userid = JSON.parse(localStorage.getItem('userInfo'))._id;

  var crt = [];

  // useEffect(() => {
  // //   fetch(`/api/cart/user/${userid}`)
  // //     .then((res) => res.json())
  // //     .then((json) => setCartData(json));
  // // }, []);
  // const cart = JSON.parse(localStorage.getItem('cartInfo')) || {};

  return (
    <header>
      <div>
        <div className="background">
          <div className="headerNameDiv">
            <h1 className="headerName">Ceylon Natural Gems</h1>
          </div>
        </div>

        <nav>
          <div className="navprofileDiv">
            {user && (
              <div className="navEmal">
                <span className="welcomeNote">
                  Hello {user.title} {user.firstName} {user.lastName}
                </span>
                <button className="headerLogoutBtn" onClick={handleClick}>
                  Log out
                </button>
                <span
                  class="headerProfile"
                  onClick={() => {
                    navigate(`/profile/${user._id}`);
                  }}
                ></span>
              </div>
            )}
            {!user && (
              <div className="navUserControl">
                <button
                  className="header-btn-login"
                  onClick={() => {
                    navigate('/login');
                  }}
                >
                  Login
                </button>
                <button
                  className="header-btn-register"
                  onClick={() => {
                    navigate('/Register');
                  }}
                >
                  Register
                </button>
              </div>
            )}
          </div>

          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to="/gems">Gemstones</Link>
            </li>
            <li className="jewelleryDropdown">
              <a href="#">Jewelleries</a>
              <ul className="jewelleryDropdownContent">
                <li>
                  <Link to="/jwellhomeM">Men's Jewellery</Link>
                </li>
                <li>
                  <Link to="/jwellhomeW">Women's Jewellery</Link>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <Link to="/feedbacks">Feedbacks</Link>
            </li>
            <li>
              <Link to="/mycart">
                Cart{'  '}{' '}
                <span class="badge text-bg-light fw-light">
                  {cartData?.length}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
