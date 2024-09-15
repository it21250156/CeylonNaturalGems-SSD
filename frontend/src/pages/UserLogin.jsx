import '../CSS/UserLogin.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

function UserLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const initializeGoogleAuth = () => {
      const auth2 = window.gapi.auth2.init({
        client_id: '580705650526-f68apndtaol1ked1tr1jk5sn8hgmss39.apps.googleusercontent.com',
      });
      console.log("Google Auth initialized:", auth2); // Log to ensure it's initialized
    };

    if (window.gapi) {
      window.gapi.load('auth2', initializeGoogleAuth);
    } else {
      console.error("Google API is not loaded.");
    }
  }, []);

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    const auth2 = window.gapi.auth2.getAuthInstance();
    try {
      const googleUser = await auth2.signIn();
      const id_token = googleUser.getAuthResponse().id_token;
      const { data } = await axios.post('/api/users/google-login', { token: id_token });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(location.state?.from || '/');
    } catch (error) {
      setError('Google login failed. Please try again.');
      console.error("Google login error:", error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let endpoint = '/api/users/login';
      let redirectPath = '/';
      if (email === 'admin@gmail.com' && password === 'Admin@1234') {
        endpoint = '/api/admin/login';
        redirectPath = '/adminHome';
      }
      const { data } = await axios.post(endpoint, { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(location.state?.from || redirectPath);
      window.location.reload();
    } catch (error) {
      setError('Login failed. Please check your email and password.');
      console.error("Login error:", error.response ? error.response.data : error.message);
    }
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
            required
          />
          <label className="label">Password:</label>
          <input
            id="input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <a
            onClick={() => navigate('/ForgotPassword')}
            className="text-gray-800"
            style={{ position: 'absolute', marginLeft: '-15%' }}
          >
            Forgot password?
          </a>
          <br />
          {error && (
            <div className="error">{error}</div>
          )}
          <br />
          <button className="login-btn">Log in</button>
          <button
            className="cancel-btn"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
          
          <button
            className="google-login-btn"
            onClick={handleGoogleLogin}
          >
            Log in with Google
          </button>

          <p className="register-link">
            Don't have an account?{'  '}
            <Link to="/Register">
              <strong>Register</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default UserLogin;
