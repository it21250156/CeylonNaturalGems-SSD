import React, { useEffect, useRef, useState } from "react";
import { Bar, Pie } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useLogout } from '../hooks/useLogout';
import "../CSS/Vih's.css";

const AdminUserReport = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchDeletedUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      generateCharts();
      performDataAnalysis();
    }
  }, [users]);

  const fetchUsers = async () => {
    const response = await fetch("/api/users/");
    const json = await response.json();
    if (response.ok) {
      setUsers(json);
    }
  }

  const fetchDeletedUsers = async () => {
    const response = await fetch("/api/deletedusers/");
    const json = await response.json();
    if (response.ok) {
      setDeletedUsers(json);
    }
  }

  const generateCharts = () => {
    const userTypes = ["A Gem Merchant", "A Gem Collector", "A Jeweller"];
    const userCountByType = userTypes.map((type) => users.filter((user) => user.userType === type).length);
    const deletedUserCountByType = userTypes.map((type) => deletedUsers.filter((user) => user.userType === type).length);

    Chart.getChart('barChart2')?.destroy();

    const chart = document.getElementById('barChart2').getContext('2d');
    new Chart(chart, {
      type: "bar",
      data: {
        labels: userTypes,
        datasets: [
          {
            label: "Active Users",
            data: userCountByType,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Deleted Users",
            data: deletedUserCountByType,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            precision: 0,
          },
        },
      },
    });
  }

  const performDataAnalysis = () => {
    let totalUserCount = 0;
    let userTypes = {};
    let userTitles = {};

    users.forEach((user) => {
      totalUserCount++;
      const userType = user.userType;
      const title = user.title;

      if (userTypes.hasOwnProperty(userType)) {
        userTypes[userType]++;
      } else {
        userTypes[userType] = 1;
      }

      if (userTitles.hasOwnProperty(title)) {
        userTitles[title]++;
      } else {
        userTitles[title] = 1;
      }
    });

    const summaryData = {
      totalUserCount,
      userTypes,
      userTitles,
    };

    setSummary(summaryData);
  }

  const handleClick = () => {
    logout();
    navigate('/');
  };


  const activeUsersCount = users.length;
  const deletedUsersCount = deletedUsers.length;
  const totalUsersCount = activeUsersCount + deletedUsersCount;
  const activeUsersPercentage = (activeUsersCount / totalUsersCount) * 100;
  const deletedUsersPercentage = (deletedUsersCount / totalUsersCount) * 100;
  const maxUsersPerUserType = summary ? Math.max(...Object.values(summary.userTypes)) : 0;
  const minUsersPerUserType = summary ? Math.min(...Object.values(summary.userTypes)) : 0;
  const userRatio = activeUsersCount / deletedUsersCount;

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

      <div className="lightBlueBodyBG">
        <div className="whiteBodyBG">
          <div className="darkBlueTopicBox">
            <h3 className="pageTopic">Report - Users</h3>
          </div>

          <div className="lightBlueBodyBG">
            <table className="table table-striped inst-table-1">
              <tr>
                <td className="inst-report-text-row1">Number of Active Users:</td>
                <td className="inst-report-text-row1">{activeUsersCount}</td>
              </tr>
              <tr>
                <td className="inst-report-text-row2">Number of Deleted Users:</td>
                <td className="inst-report-text-row2">{deletedUsersCount}</td>
              </tr>
              <tr>
                <td className="inst-report-text-row1">Percentage of Active Users:</td>
                <td className="inst-report-text-row1">{activeUsersPercentage.toFixed(2)}%</td>
              </tr>
              <tr>
                <td className="inst-report-text-row2">Percentage of Deleted Users:</td>
                <td className="inst-report-text-row2">{deletedUsersPercentage.toFixed(2)}%</td>
              </tr>
              <tr>
                <td className="inst-report-text-row1">Max Users per User Type:</td>
                <td className="inst-report-text-row1">{maxUsersPerUserType}</td>
              </tr>
              <tr>
                <td className="inst-report-text-row2">Min Users per User Type:</td>
                <td className="inst-report-text-row2">{minUsersPerUserType}</td>
              </tr>
              <tr>
                <td className="inst-report-text-row1">Ratio of Active Users to Deleted Users:</td>
                <td className="inst-report-text-row1">{userRatio.toFixed(2)}</td>
              </tr>
            </table>
          </div>

          <div className="top-box-inst">
            {summary && (
              <div className="row">
                <div className="col-md-6">
                  <h3 className="lightBlueBodyBG">Users by Type:</h3>
                  <Pie height="500"
                    data={{
                      labels: Object.keys(summary.userTypes),
                      datasets: [
                        {
                          data: Object.values(summary.userTypes),
                          backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
                        },
                      ],
                    }}
                  />
                </div>

                <div className="col-md-6">
                  <h3 className="lightBlueBodyBG">Users by Title:</h3>
                  <Bar height="400"
                    data={{
                      labels: Object.keys(summary.userTitles),
                      datasets: [
                        {
                          data: Object.values(summary.userTitles),
                          backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#cc65fe'],
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <h2 className="lightBlueBodyBG"> Users vs User Types</h2>
            <canvas id="barChart2" width="400" height="200"></canvas>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUserReport;
