import React, { useState , useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


function UserLogin() {

  const navigate = useNavigate()
  const location = useLocation();


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:4000/users/login', {
        email,
        password,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(location.state?.from || '/' && window.location.reload());
      
    } catch (errors) {
      setError(true);
    }
  };

  return (
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

      {error &&  <div className="error">Please check your email and password.</div>}
      
      

      <button >Log in</button>
      <button onClick={() => {navigate("/");}}>Cancel</button>

      <p className="">Don't have an account?{'  '}<Link to="/Register" className=""> Register </Link></p>
      
    </form>
  );
}

export default UserLogin ;