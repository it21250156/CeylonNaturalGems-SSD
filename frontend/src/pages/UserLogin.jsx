import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
const jwt_decode = require("jwt-decode");


function UserLogin() {
  
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [error, setError] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (email == "admin@gmail.com" && password == "Admin@1234") {
        
        // set route for admin login
        const {data}  = await axios.post('/api/admin/login' , { email, password});
        navigate(location.state?.from || ('/adminHome' ));
      localStorage.setItem('userInfo', JSON.stringify(data));
      } else{
        
        // set route for regular user login
        const {data}  = await axios.post('/api/users/login' , { email, password});
        navigate(location.state?.from || ('/' && window.location.reload()));
      localStorage.setItem('userInfo', JSON.stringify(data));
      }
    } catch (errors) {
      setError(true);
      console.log(errors)
    }
    // try {
    //   // Call login API
    //   const res = await axios.post("/api/users/login", { email, password });
  
    //   // Save token to local storage
    //   localStorage.setItem("token", res.data.token);
  
    //   // Decode token to get user ID and role
    //   const { userId, role } = jwt_decode(res.data.token);
  
    //   // Redirect based on user role
    //   if (role === "admin") {
    //     window.location.href = "/adminHome";
    //   } else {
    //     window.location.href = '/';
    //   }
    // } catch (err) {
    //   console.error(err.message);
    // }
  };

  return (
    
    <> 
      <Header/>

    <form className="login" onSubmit={submitHandler}>
      <h3>Log In</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required="required"
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required="required"
      />

      {error && (
        <div className="error">Please check your email and password.</div>
      )}

      <button>Log in</button>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        Cancel
      </button>

      <p className="">
        Don't have an account?{'  '}
        <Link to="/Register" className="">
          {' '}
          Register{' '}
        </Link>
      </p>
    </form>

    </>
  );
}

export default UserLogin;
