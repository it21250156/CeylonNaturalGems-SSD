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

const GemAdminHome = () => {

  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
  };
  const { gems, dispatch } = useGemsContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchGems = async () => {
      const response = await fetch("/api/gems");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_GEMS", payload: json });
      }
    };

    fetchGems();
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    let results = gems.filter((gem) =>
      gem.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === "addedDate") {
      results = results.sort(
        (a, b) =>
          (sortOrder === "asc" ? 1 : -1) * (new Date(a.createdAt) - new Date(b.createdAt))
      );
    } else if (sortBy === "quantity") {
      results = results.sort(
        (a, b) => (sortOrder === "asc" ? 1 : -1) * (a.quantity - b.quantity)
      );
    } else if (sortBy === "price") {
      results = results.sort(
        (a, b) => (sortOrder === "asc" ? 1 : -1) * (a.price - b.price)
      );
    }

    setSearchResults(results);
  }, [gems, searchTerm, sortBy, sortOrder]);

  const handleSortChange = (event) => {
    const selectedSortBy = event.target.value;
    setSortBy(selectedSortBy);

    switch (selectedSortBy) {
      case "date":
        setSearchResults((prevResults) =>
          prevResults.sort((a, b) =>
            sortOrder === "asc"
              ? new Date(a.createdAt) - new Date(b.createdAt)
              : new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        break;
      case "quantity":
        setSearchResults((prevResults) =>
          prevResults.sort((a, b) =>
            sortOrder === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity
          )
        );
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        break;
      case "price":
        setSearchResults((prevResults) =>
          prevResults.sort((a, b) =>
            sortOrder === "asc" ? a.price - b.price : b.price - a.price
          )
        );
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        break;
      default:
        break;
    }
  };

  return (
    <><header>
      <div>
        <div className="background">
          <div className="headerNameDiv">
            <h1 className="headerName">Ceylon Natural Gems</h1>
          </div>
        </div>

        <nav>
          <div className="navprofileDiv">
            <div className="navEmal">
              <span>Hello Admin</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          </div>

          <ul>
            <li>
              <Link to={'/adminHome'}>Home</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header><div className="home">
        <div className="search">
          <input
            type="text"
            placeholder="Search by gem name"
            value={searchTerm}
            onChange={handleSearchChange} />
        </div>

        <div className="sort">
          <label htmlFor="sort-select">Sort by: </label>
          <select id="sort-select" value={sortBy} onChange={handleSortChange}>
            <option value="">--Select--</option>
            <option value="date">Added Date</option>
            <option value="quantity">Quantity</option>
            <option value="price">Price</option>
          </select>
        </div>

        <button
          className="addGemButton"
          onClick={() => {
            window.location.href = "./AddGem";
          }}
        >
          {" "}
          Add a New Gem{" "}
        </button>

        <Link to={`/GemAdminReports`}>
          <button className="reportsButton">Reports</button>
        </Link>

        <div className="gems">
          {searchResults.length > 0 ? (
            searchResults.map((gem) => <GemDetails gem={gem} key={gem._id} />)
          ) : (
            <p>No results found. Please check the gem name.</p>
          )}
        </div>
      </div></>
  );
};

export default GemAdminHome;
