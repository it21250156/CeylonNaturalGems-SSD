import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import gemVid from '../video/vid.mp4';
import '../CSS/Home.css';
import Header from '../components/Header';

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
          {/* <video>
          <source src={gemVid} type="video/mp4"></source>
        </video> */}
        </div>
        <div className="welcome-box">
          <p className="line-1">Welcome to</p>
          <p className="line-2">Ceylon Natural Gems</p>
        </div>

        <div className="gem-nav-card">
          <p className="Section Name"></p>
        </div>
      </div>
    </>
  );
};

export default Home;
