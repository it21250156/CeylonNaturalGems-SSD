import { useEffect, useState } from 'react';
import { useJewelleryesContext } from '../hooks/useJewelleryesContext';
import { useNavigate } from 'react-router-dom';
import '../CSS/JewellAdmin.css';
import '../CSS/jewelNew.css';
import { useAuthContext } from '../hooks/useAuthContext';
import React from 'react';

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import axios from 'axios';

// components
import JewelleryDetails from '../components/JewelleryDetails';
import JewelleryAddForm from '../components/JewelleryAddForm';

const JewelleryAdminDashboard = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('Male');
  const [filteredJwl, setFilteredJwl] = useState([]);
  const [sortOption, setSortOption] = useState('');

  const handleButtonClick = (gender) => {
    setActiveButton(gender);
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    borderRadius: '5px',
    border: '2px solid #144272',
    backgroundColor: 'white',
    color: '#144272',
  };

  const activeButtonStyle = {
    backgroundColor: '#144272',
    color: 'white',
  };

  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
    navigate('/');
  };

  const [jewellery, setjewellery] = useState(null);

  useEffect(() => {
    const fetchJewelleryes = async () => {
      if (user) {
        const response = await fetch('/api/jewelleryes', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const json = await response.json();

        if (response.ok) {
          setjewellery(json);
          const filteredJewellery = json.filter(
            (jwl) => jwl.gender === activeButton
          );
          setFilteredJwl(filteredJewellery);
        }
      }
    };

    fetchJewelleryes();
  }, [activeButton, user]);

  useEffect(() => {
    const sortedJewellery = [...filteredJwl];
    if (sortOption === 'priceAscending') {
      sortedJewellery.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceDescending') {
      sortedJewellery.sort((a, b) => b.price - a.price);
    }

    setFilteredJwl(sortedJewellery);
  }, [sortOption]);

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

      <div className="home">
        <div className="darkBlueTopicBox">
          <h3 className="pageTopic">Admin Jewelleries</h3>
        </div>
        <div className="jewelleryes">
          <div className="gender-switch">
            <button
              className="add-jew-btn"
              onClick={() => {
                navigate('/AddJewelleryes');
              }}
            >
              Add a new jewellery
            </button>
            <p></p>

            <button
              className="genderbtn"
              type="button"
              style={
                activeButton === 'Male'
                  ? { ...buttonStyle, ...activeButtonStyle }
                  : buttonStyle
              }
              onClick={() => handleButtonClick('Male')}
            >
              Men's Jewelleries
            </button>
            <button
              className="genderbtn"
              type="button"
              style={
                activeButton === 'Female'
                  ? { ...buttonStyle, ...activeButtonStyle }
                  : buttonStyle
              }
              onClick={() => handleButtonClick('Female')}
            >
              Women's Jewelleries
            </button>
            <br></br>
            <select
              className="select_sort_jewel"
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Select type</option>
              <option value="priceAscending">Price ascending</option>
              <option value="priceDescending">Price descending</option>
            </select>
          </div>
          <div className="jewellery-details">
            {filteredJwl &&
              filteredJwl.map((jewellery) => (
                <JewelleryDetails jewellery={jewellery} key={jewellery._id} />
              ))}
          </div>
        </div>
      </div>
      <style></style>
    </>
  );
};

export default JewelleryAdminDashboard;
