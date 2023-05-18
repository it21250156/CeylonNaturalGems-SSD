import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Home.css';
import Header from '../components/Header';
import HomeSlider from '../components/HomeSlider';
import Footer from '../components/Footer';

// components

const Home = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/users', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
    };

    if (user) {
      fetchWorkouts();
    }
  }, [user]);
  return (
    <>
      <Header />
      <div>
        <div className="slider-space">
          <HomeSlider />
          {/* <video>
          <source src={gemVid} type="video/mp4"></source>
        </video> */}
        </div>
        <div className="welcome-box">
          <p className="line-1">Welcome to</p>
          <p className="line-2">Ceylon Natural Gems</p>
        </div>

        <hr className="hr-home"></hr>

        <Link to="/gems" className="banner">
          <div className="gem-nav-card">
            <div className="gem-img-holder">
              {/* <div className="dark-box"> */}
              <p className="section-name">Gemstones</p>
              {/* </div> */}
            </div>
          </div>
        </Link>

        <Link to="/jwellhomeW" className="banner">
          <div className="womenj-nav-card">
            <div className="womenj-img-holder">
              {/* <div className="dark-box"> */}
              <p className="section-name">Women's Jewellery</p>
              {/* </div> */}
            </div>
          </div>
        </Link>

        <Link to="/jwellhomeM" className="banner">
          <div className="menj-nav-card">
            <div className="menj-img-holder">
              {/* <div className="dark-box"> */}
              <p className="section-name">Men's Jewellery</p>
              {/* </div> */}
            </div>
          </div>
        </Link>

        <hr className="hr-home"></hr>

        <div className="req-box">
          <p className="req-txt-1">Can't find something you like?</p>
          <p className="req-txt-2">Let us help you</p>
          <Link to={'/reqM'}>
            <button className="req-btn">Request Gems</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
