import "../CSS/AppBW.css";
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import Header from '../components/Header';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const schema = yup.object().shape({
  newGemShape: yup.string(),
  newGemColour: yup.string(),
  newGemDescription: yup.string(),
  // newGemWeight: yup.number().positive(),
  newGemQuantity: yup.number().positive(),
});

function MyReq() {
  const uid = JSON.parse(localStorage.getItem("userInfo"))?._id || null;
  const [listOfRequests, setListOfRequests] = useState([]);
  const [listOfReplyStatus, setListOfReplyStatus] = useState([]);
  const [newGemShape, setNewGemShape] = useState("");
  const [newGemColour, setNewGemColour] = useState("");
  const [newGemDescription, setNewnewGemDescription] = useState("");
  // const [newGemWeight, setNewnewGemWeight] = useState('');
  const [newGemQuantity, setNewnewGemQuantity] = useState("");
  const [sortBy, setSortBy] = useState("");
  

  const handleSort = (e) => {
    const { value } = e.target;
    setSortBy(value);
  };
  


  useEffect(() => {
    Axios.get(`/getUsersRequests/${uid}`).then((response) => {
      // Sort the response data based on the createdAt property
      const sortedRequests = response.data.sort((a, b) =>
        sortBy === 'dateDescending' ? a.createdAt.localeCompare(b.createdAt) : b.createdAt.localeCompare(a.createdAt)
      );
      // Reverse the sorted array for descending order
      const sortedRequestsDescending = sortBy === 'dateDescending' ? sortedRequests.reverse() : sortedRequests;
      // Reverse the sorted array again for ascending order
      const sortedRequestsAscending = sortBy === 'dateAscending' ? sortedRequestsDescending.reverse() : sortedRequestsDescending;
      setListOfRequests(sortedRequestsAscending);
      // getReplyStatus(sortedRequestsAscending);
    });
  }, [sortBy]);
  
  
  
  
  

  const gemShapes = [
    "round",
    "oval",
    "pear",
    "marquise",
    "emerald",
    "heart",
    "princess",
    "cushion",
  ];

  const deletereq = (id) => {
    Axios.delete(`/delete/${id}`).then((response) => {
      setListOfRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== id)
);

    });
  };

  // async function getReplyStatus() {
  //   try {
  //     const response = await Axios.get(`/getReplyByUser/${uid}`);
  //     setListOfReplyStatus(response.data);
  //     console.log("got " + response.data);
  //   } catch (error) {
  //     console.log(error);
  //     setListOfReplyStatus([...listOfReplyStatus, { reqId: error.message }]);
  //   }
  // }

  useEffect(() => {
    Axios.get(`/getUsersRequests/${uid}`).then((response) => {
      setListOfRequests(response.data);
      // getReplyStatus(response.data);
    });
    // getReplyStatus();
  }, []);

  const updateGemShape = (id) => {
    if (newGemShape) {
      Axios.put("/updateGshape", {
        id: id,
        newGemShape: newGemShape,
      }).then((response) => {
        
        alert("Updated Successfully!");
      });
    }
  };

  const updateGemColour = (id) => {
    if (newGemColour) {
      Axios.put("/updateGsCl", {
        id: id,
        newGemColour: newGemColour,
      }).then((response) => {
        
        alert("Updated Successfully!");
      });
    }
  };

  const updateGemDescription = (id) => {
    if (newGemDescription) {
      Axios.put("/updateDes", {
        id: id,
        newGemDescription: newGemDescription,
      }).then((response) => {
        
        alert("Updated Successfully!");
      });
    }
  };

  // const updateGemWeight = (id) => {
  //   if (newGemWeight) {
  //     Axios.put('/updateWt', {
  //       id: id,
  //       newGemWeight: newGemWeight,
  //     }).then((response) => {
  //       alert('Updated Successfully! Please refresh the page');
  //     });
  //   }
  // };

  const updateGemQuantity = (id) => {
    if (newGemQuantity) {
      Axios.put("/updateQt", {
        id: id,
        newGemQuantity: newGemQuantity,
      }).then((response) => {
        
        alert("Updated Successfully!");
      });
    }
  };

  const confirmDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      deletereq(id);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Header />
      <div className="MyRequests">
        <div className="darkBlueTopicBoxReq">
          <h1 className="pageTopicReq">My Requests</h1>
        </div>
        {/* {JSON.stringify(listOfReplyStatus)} */}
        <div className="lightBlueBodyBG-my-req">
          <button
            className="add-req-btn"
            onClick={() => {
              window.location.href = "./reqM";
            }}
          >
            Create a new request
          </button>
          <br></br>
          <label className="labelSort">Sort by</label>
          <select className="sortRequest" onChange={handleSort}>
            <option value="">Select type</option>
            <option value="dateAscending">Older requests first</option>
            <option value="dateDescending">Latest requests First</option>
          </select>

          {listOfRequests.map((user) => {
            return (
              <div key={user._id}>
                <div className="whiteBodyBG">
                  <div className="white-content">
                    <div className="myreq-column-1">
                      <table className="infobox">
                        
                        <tr key={user._id}>
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
                        
                      </table>
                    </div>

                    <div className="myreq-column-2">
                      <form className="updatebox">
                        <label className="updatelbl"><strong>Update Request</strong> </label>
                        <hr></hr>
                        <select
                          className="inputupdate"
                          onChange={(event) => {
                            setNewGemShape(event.target.value);
                          }}
                        >
                          <option value="">Select a shape</option>
                          {gemShapes.map((shape) => (
                            <option key={shape} value={shape}>
                              {shape}
                            </option>
                          ))}
                        </select>

                        <input
                          key="gemColour"
                          type="text"
                          placeholder="Edit gem colour...."
                          className="inputupdate"
                          
                          onChange={(event) => {
                            setNewGemColour(event.target.value);
                          }}
                        />

                        <input
                          key="gemDescription"
                          type="text"
                          placeholder="Edit description...."
                          className="inputupdate"
                          
                          onChange={(event) => {
                            setNewnewGemDescription(event.target.value);
                          }}
                        />

                        {/* <input
                          type="number"
                          placeholder="Edit weight...."
                          className="input"
                          onChange={(event) => {
                            setNewnewGemWeight(event.target.value);
                          }}
                        /> */}

                        <input
                          key="gemQty"
                          type="number"
                          placeholder="Edit quantity...."
                          className="inputupdate"
                          
                          onChange={(event) => {
                            setNewnewGemQuantity(event.target.value);
                          }}
                        />

                        <button
                          className="updatebtn"
                          onClick={() => {
                            updateGemColour(user._id);
                            updateGemShape(user._id);
                            updateGemDescription(user._id);
                            // updateGemWeight(user._id);
                            updateGemQuantity(user._id);
                          }}
                        >
                          Update
                        </button>
                      </form>
                    </div>
                  </div>
                  {/* {listOfReplyStatus[user._id] || "jncos"} */}
                  <button
                    
                    disabled={
                      listOfReplyStatus[user._id] > 0 ||
                      listOfReplyStatus[user._id] === null
                        ? true
                        : false
                    }
                    className="repliesbtn"
                    onClick={() => {
                      window.location.href = `./reply_uv/${user._id}`;
                    }}
                  >
                    Replies
                  </button>

                  <button
                    className="btn-del"
                    onClick={() => confirmDelete(user._id)}
                  >

                    <p class="paragraph"> delete </p>
                    <span class="icon-wrapper">
                      <svg
                        class="icon"
                        width="30px"
                        height="30px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MyReq;
