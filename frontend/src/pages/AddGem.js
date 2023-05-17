// components
import GemAddForm from '../components/GemAddForm';

import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import axios from 'axios';
import Header from "../components/Header"

const AddGem = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
  };

  return (
  <><Header/>
      <div className="addGem">
        <GemAddForm />
      </div>
      </>
  );
};

export default AddGem;
