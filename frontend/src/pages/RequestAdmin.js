import '../CSS/AppBW.css';
import { useState, useEffect } from 'react';
import React from 'react';
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

function MyReq() {
  const uid = JSON.parse(localStorage.getItem('userInfo'))?._id || null;
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [listOfReplyStatus, setListOfReplyStatus] = useState({});
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [listOfRequests, setListOfRequests] = useState([]);

  const handleSort = (e) => {
    const { value } = e.target;
    setSortBy(value);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  useEffect(() => {
    Axios.get(`/getUsers`).then((response) => {
      const sortedRequests = response.data.sort((a, b) =>
        sortBy === 'dateDescending'
          ? a.createdAt.localeCompare(b.createdAt)
          : b.createdAt.localeCompare(a.createdAt)
      );
      const sortedRequestsDescending =
        sortBy === 'dateDescending' ? sortedRequests.reverse() : sortedRequests;
      const sortedRequestsAscending =
        sortBy === 'dateAscending'
          ? sortedRequestsDescending.reverse()
          : sortedRequestsDescending;
      setListOfRequests(sortedRequestsAscending);
      // getReplyStatus(sortedRequestsAscending);
    });
  }, [sortBy]);

  const handleClick = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    Axios.get('/getUsers').then((response) => {
      setListOfRequests(response.data);
    });
  }, []);

  useEffect(() => {
    const results = listOfRequests.filter(
      (request) =>
        request.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.PhoneNo.toString().includes(searchTerm) ||
        request.GemType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.GemColor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.GemShape.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.Weight.toString().includes(searchTerm) ||
        request.Quantity.toString().includes(searchTerm) ||
        request.createdAt.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, listOfRequests]);

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

      <div className="MyRequests">
        <div className="darkBlueTopicBoxReq">
          <h1 className="pageTopicReq">All requests</h1>
        </div>

        <div className="requestM">
          <div className="searchReq">
            <input
              className="gem-search-input"
              type="text"
              placeholder="Search Requests"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <label className="labelSort">Sort by</label>
          <select className="sortRequest" onChange={handleSort}>
            <option value="">Select type</option>
            <option value="dateAscending">Older requests first</option>
            <option value="dateDescending">Latest requests First</option>
          </select>

          {searchResults.map((user) => (
            <div key={user._id} className="lightBlueBoxReq">
              <div className="whiteBodyBG">
                <div className="myreq-column-1">
                  <table>
                    <tbody>
                      <tr>
                        <td className="req-lable">First Name</td>
                        <td className="req-value">{user.FirstName}</td>
                      </tr>
                      <tr>
                        <td className="req-lable">Last Name</td>
                        <td className="req-value">{user.LastName}</td>
                      </tr>
                      <tr>
                        <td className="req-lable">Email</td>
                        <td className="req-value">{user.Email}</td>
                      </tr>
                      <tr>
                        <td className="req-lable">Mobile Number</td>
                        <td className="req-value">{user.PhoneNo}</td>
                      </tr>
                      <tr>
                        <td className="req-lable">Gem Type</td>
                        <td className="req-value">{user.GemType}</td>
                      </tr>
                      <tr>
                        <td className="req-lable">Gem Color</td>
                        <td className="req-value">{user.GemColor}</td>
                      </tr>
                      <tr>
                        <td className="req-lable">Gem Shape</td>
                        <td className="req-value">{user.GemShape}</td>
                      </tr>
                      <tr>
                        <td className="req-lable">Description</td>
                        <td className="req-value">{user.Description}</td>
                      </tr>
                      <tr>
                        <td className="req-lable">Weight</td>
                        <td className="req-value">{user.Weight}</td>
                      </tr>
                      <tr>
                        <td className="req-lable">Quantity</td>
                        <td className="req-value">{user.Quantity}</td>
                      </tr>
                      <tr>
                        <td className="req-lable">Date added</td>
                        <td className="req-value">{user.createdAt}</td>
                      </tr>
                    </tbody>
                  </table>
                  <center>
                    <button
                      className="repbtn"
                      onClick={() => {
                        window.location.href = `./reqReply/${user._id}`;
                      }}
                    >
                      Reply
                    </button>
                  </center>
                </div>
              </div>

              <button
                disabled={
                  listOfReplyStatus[user._id] > 0 ||
                  listOfReplyStatus[user._id] === null
                }
                className="repliesbtnAdmin"
                onClick={() => {
                  window.location.href = `./reply_av/${user._id}`;
                }}
              >
                Your Replies
              </button>
            </div>
          ))}

          <Link to={'/Myrep'}>
            <button className="req-btn">View My Replies</button>
          </Link>
          <Link to={'/reqReport'}>
            <button className="req-btn">Report</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default MyReq;
