import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

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
                <span>
                  Hello {user.title} {user.firstName} {user.lastName}
                </span>
                <button onClick={handleClick}>Log out</button>
                <button
                  onClick={() => {
                    navigate(`/profile/${user._id}`);
                  }}
                >
                  My Profile
                </button>
              </div>
            )}
            {!user && (
              <div className="navUserControl">
                <button
                  onClick={() => {
                    navigate('/login');
                  }}
                >
                  Login
                </button>
                <button
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
                  <a href="#">Men's Jewellery</a>
                </li>
                <li>
                  <a href="#">Women's Jewellery</a>
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
              <Link to="/mycart">Cart {cartData?.length}</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
