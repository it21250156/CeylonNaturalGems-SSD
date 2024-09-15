import { useState, useEffect } from 'react';
import { useGemsContext } from '../hooks/useGemsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import axios from 'axios';

// components
import GemDetails from '../components/GemDetails';
import '../CSS/GemAdminHome.css';
import Header from '../components/Header';

const GemAdminHome = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext(); // Accessing the user from the Auth context
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
  };

  const { gems, dispatch } = useGemsContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchGems = async () => {
      if (user) {  // Ensure user is logged in and has the token
        const response = await fetch('/api/gems', {
          headers: {
            'Authorization': `Bearer ${user.token}`, // Attach the token in the Authorization header
          },
        });

        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_GEMS', payload: json });
        } else {
          console.error("Failed to fetch gems:", json);
        }
      }
    };

    fetchGems();
  }, [dispatch, user]); // Depend on user so the token is always included

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    let results = gems.filter((gem) =>
      gem.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'addedDate') {
      results = results.sort(
        (a, b) =>
          (sortOrder === 'asc' ? 1 : -1) *
          (new Date(a.createdAt) - new Date(b.createdAt))
      );
    } else if (sortBy === 'quantity') {
      results = results.sort(
        (a, b) => (sortOrder === 'asc' ? 1 : -1) * (a.quantity - b.quantity)
      );
    } else if (sortBy === 'price') {
      results = results.sort(
        (a, b) => (sortOrder === 'asc' ? 1 : -1) * (a.price - b.price)
      );
    }

    setSearchResults(results);
  }, [gems, searchTerm, sortBy, sortOrder]);

  const handleSortChange = (event) => {
    const selectedSortBy = event.target.value;

    if (selectedSortBy === sortBy) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(selectedSortBy);
      setSortOrder('asc');
    }
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
      <div className="gem-admin-home">
        <div className="darkBlueTopicBoxGem">
          <h3 className="pageTopicGems">Gem Admin</h3>
        </div>
        <div class="gem-admin-search-wrapper">
          <div class="gem-admin-search">
            <input
              type="text"
              placeholder="Search by gem name"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div class="gem-admin-sort">
          <label htmlFor="sort-select">Sort by: </label>
          <select id="sort-select" value={sortBy} onChange={handleSortChange}>
            <option value="">--Select--</option>
            <option value="date">Added Date</option>
            <option value="quantity">Quantity</option>
            <option value="price">Price</option>
          </select>
        </div>

        <div className="gem-buttons-container">
          <button
            className="gem-admin-buttons"
            onClick={() => {
              window.location.href = './AddGem';
            }}
          >
            Add a New Gem
          </button>

          <Link to={`/GemAdminReports`}>
            <button className="gem-admin-buttons">Reports</button>
          </Link>
        </div>
        <div className="card-container-ammaar">
          {searchResults.length > 0 ? (
            searchResults.map((gem) => <GemDetails gem={gem} key={gem._id} />)
          ) : (
            <p>No results found. Please check the gem name.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default GemAdminHome;
