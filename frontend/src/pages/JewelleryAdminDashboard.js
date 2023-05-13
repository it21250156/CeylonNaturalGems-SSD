import { useEffect, useState } from "react";
import { useJewelleryesContext } from "../hooks/useJewelleryesContext";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import React from "react";

import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import axios from "axios";

// components
import JewelleryDetails from "../components/JewelleryDetails";
import JewelleryAddForm from "../components/JewelleryAddForm";

const JewelleryAdminDashboard = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Male");
  const [filteredJwl, setFilteredJwl] = useState([])

  const handleButtonClick = (gender) => {
    setActiveButton(gender);

  };

  const buttonStyle = {
    padding: "10px 20px",
    margin: "5px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#e6e6e6",
    color: "#333",
  };

  const activeButtonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
  };

  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
    navigate("/");
  };

  //const {jewellery, dispatch} = useJewelleryesContext()
  const [jewellery, setjewellery] = useState(null);

  useEffect(() => {
    const fetchJewelleryes = async () => {
      const response = await fetch("/api/jewelleryes");
      const json = await response.json();

      if (response.ok) {
        //dispatch({type: 'SET_JEWELLERY', payload: json})
        setjewellery(json);
        setFilteredJwl(json.filter(jwl  => jwl.gender == activeButton))
      }
    };

    fetchJewelleryes();

  }, [activeButton]);

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
                <span>Hello Admin</span>
                <button onClick={handleClick}>Log out</button>
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
      <div className="home">
        {/* <JewelleryAddForm/> */}
        <button
          onClick={() => {
            navigate("/AddJewelleryes");
          }}
        >
          Add a new jewellery
        </button>
        <div className="jewelleryes">
          <div className="gender-switch">
            <button
              type="button"
              style={
                activeButton === "Male"
                  ? { ...buttonStyle, ...activeButtonStyle }
                  : buttonStyle
              }
              onClick={() => handleButtonClick("Male")}
            >
              Men
            </button>
            <button
              type="button"
              style={
                activeButton === "Female"
                  ? { ...buttonStyle, ...activeButtonStyle }
                  : buttonStyle
              }
              onClick={() => handleButtonClick("Female")}
            >
              Women
            </button>
          </div>

          {/* {jewellery &&
            jewellery.map((jewellery) => (
              <JewelleryDetails jewellery={jewellery} key={jewellery._id} />
            ))} */}
          {filteredJwl &&
            filteredJwl.map((jewellery) => (
              <JewelleryDetails jewellery={jewellery} key={jewellery._id} />
            ))}
        </div>
      </div>
      <style></style>
    </>
  );
};

export default JewelleryAdminDashboard;
