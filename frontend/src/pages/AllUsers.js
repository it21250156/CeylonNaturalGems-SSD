import { useEffect, useState } from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import React from "react";
import { useNavigate } from "react-router-dom";


import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";


const AllUsers = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/");
  };


  //********************************************************************************************* */

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the users collection
        const userCollectionResponse = await fetch("/api/users/");
        const userData = await userCollectionResponse.json();

        // Fetch data from the deletedUser collection
        const deletedUserCollectionResponse = await fetch("/api/deletedusers/");
        const deletedUserData = await deletedUserCollectionResponse.json();

        // Combine and store the data
        const combinedData = [...userData, ...deletedUserData];
        setData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <Link to={"/adminHome"}>Home</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="lightBlueBodyBG">
        <div className="whiteBodyBG">

          <input
            style={{width:"50%" , marginLeft:"5%"}}
            className="opacity-75"
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search..."
          />
          
          {filteredData.length > 0 ? (
            <>
            <p style={{marginLeft : "80%" , marginTop : "-60px"}}>Number of results: {filteredData.length}</p> 

            <br></br>
            <div className="darkBlueTopicBox">
            <h3 className="pageTopic">All Users</h3>
          </div>
          <table className="table table-striped table-hover">
            <thead style={{ backgroundColor: "#144272" }}>
              <tr>
              <th>#</th>
                <th>Title</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Customer Type</th>
                <th>Email</th>
                <th>Phone number</th>
              </tr>
            </thead>
              {filteredData.map((item , index) => (
                <tbody>
                <tr key={item.id}>
                  <td> {index + 1}</td>
                  <td> {item.title}</td>
                  <td> {item.firstName}</td>
                  <td> {item.lastName}</td>
                  <td> {item.userType} </td>
                  <td> {item.email} </td>
                  <td> {item.phone} </td>
                </tr>
                </tbody>
              )) }
            
          </table> </>
           ): (
            <p style={{color:"red"}}>No results found. Please check again.</p>
          ) } 
        </div>
      </div>
    </>
  );
};

export default AllUsers;
