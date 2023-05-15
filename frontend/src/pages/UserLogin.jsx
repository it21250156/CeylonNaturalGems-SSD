import '../CSS/UserLogin.css';
import React, {createContext, useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
const jwt_decode = require('jwt-decode');


function UserLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const RecoveryContext = createContext();


  // const { setOTP } = createContext();

  function nagigateToOtp() {
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      //setOTP(OTP);

      axios
        .post("/send_recovery_email", {
          OTP,
          recipient_email: email,
        })
        navigate('/otp')
        // .catch(console.log);
      return;
    }
    return alert("Please enter your email");
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [error, setError] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (email == 'admin@gmail.com' && password == 'Admin@1234') {
        // set route for admin login
        const { data } = await axios.post('/api/admin/login', {
          email,
          password,
        });
        navigate(location.state?.from || '/adminHome');
        localStorage.setItem('userInfo', JSON.stringify(data));
      } else {
        // set route for regular user login
        const { data } = await axios.post('/api/users/login', {
          email,
          password,
        });
        navigate(location.state?.from || ('/' && window.location.reload()));
        localStorage.setItem('userInfo', JSON.stringify(data));
      }
    } catch (errors) {
      setError(true);
      console.log(errors);
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
      <Header />
      <div className="title-box-login">
        <p className="title-login">Log In</p>
      </div>

      <div className="light-blue-bg-login">
        <form className="login" onSubmit={submitHandler}>
          <label className="label">Email address:</label>
          <input
            id="input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required="required"
          />
          <label className="label">Password:</label>
          <input
            id="input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required="required"
          />
          <a onClick={() => nagigateToOtp()} className="text-gray-800">
              Forgot password?
          </a>
            <br />
          {error && (
            <div className="error">Please check your email and password.</div>
          )}
            <br />
          <button className="login-btn">Log in</button>
          <button
            className="cancel-btn"
            onClick={() => {
              navigate('/');
            }}
          >
            Cancel
          </button>

          <p className="register-link">
            Don't have an account?{'  '}
            <Link to="/Register" className="">
              {' '}
              <strong>Register</strong>{' '}
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default UserLogin;
