import GemAdminPriceReport from '../components/GemAdminPriceReport';
import TypeOfGemReport from '../components/TypeOfGemsReport';
import { useAuthContext } from '../hooks/useAuthContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/GemAddForm.css';

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

const GemAdminReportsPage = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
  };

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
      <div>
        <div className="darkBlueTopicBoxGem">
          <h1 className="pageTopicGems">Gem Admin Reports Page</h1>
        </div>

        <div className="lightBlueBodyBGGemForm">
          <div className="white-box-for-tables">
            <h2 className="report-title">Gem Price Report</h2>
            <GemAdminPriceReport />
          </div>
          <div className="white-box-for-tables">
            <h2 className="report-title">Gem Type Report</h2>
            <TypeOfGemReport />
          </div>
        </div>
      </div>
    </>
  );
};

export default GemAdminReportsPage;
