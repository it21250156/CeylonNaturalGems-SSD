import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Home.css';
import Header from '../components/Header';
import HomeSlider from '../components/HomeSlider';
import Footer from '../components/Footer';

const Home = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleRequestGems = () => {
    if (user) {
      // User is logged in, proceed with the request
      navigate('/reqM');
    } else {
      // User is not logged in, show the login popup
      setShowLoginPopup(true);
    }
  };

  return (
    <>
      <Header />
      <div>
        <div className="slider-space">
          <HomeSlider />
        </div>
        <div className="welcome-box">
          <p className="line-1">Welcome to</p>
          <p className="line-2">Ceylon Natural Gems</p>
        </div>

        <hr className="hr-home" />

        <Link to="/gems" className="banner">
          <div className="gem-nav-card">
            <div className="gem-img-holder">
              <p className="section-name">Gemstones</p>
            </div>
          </div>
        </Link>

        <Link to="/jwellhomeW" className="banner">
          <div className="womenj-nav-card">
            <div className="womenj-img-holder">
              <p className="section-name">Women's Jewellery</p>
            </div>
          </div>
        </Link>

        <Link to="/jwellhomeM" className="banner">
          <div className="menj-nav-card">
            <div className="menj-img-holder">
              <p className="section-name">Men's Jewellery</p>
            </div>
          </div>
        </Link>

        <hr className="hr-home" />

        <div className="req-box">
          <p className="req-txt-1">Can't find something you like?</p>
          <p className="req-txt-2">Let us help you</p>
          <button className="req-btn" onClick={handleRequestGems}>
            Request Gems
          </button>
        </div>
      </div>

      {showLoginPopup && (
        <div className="login-popup">
          <p>
            <strong>Please login first!</strong>
          </p>
          <button
            className="logincheckbtn"
            onClick={() => setShowLoginPopup(false)}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
