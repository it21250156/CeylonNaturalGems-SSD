import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { useLogout } from '../hooks/useLogout';

import "../CSS/Vih's.css"

const InstallmentReport = () => {

  const { logout } = useLogout();
  const handleClick = () => {
    logout();
    navigate('/');
  };
  const navigate = useNavigate()

  const [installments, setInstallments] = useState([]);

  useEffect(() => {
    fetchInstallments();
  }, []);

  const fetchInstallments = async () => {
    const response = await fetch(`/api/installments`);
    const json = await response.json();

    if (response.ok) {
      setInstallments(json);
    }
  };

  useEffect(() => {
    if (installments.length > 0) {
      generateCharts();
    }
  }, [installments]);

  const generateCharts = () => {
    const initialPaymentData = installments.map(installment => installment.initialPayment);
    const monthlyPaymentData = installments.map(installment => installment.monthlyPayment);

    Chart.getChart('barChart2')?.destroy();

    // Create a bar chart using Chart.js
    const ctx = document.getElementById('barChart2').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: installments.map(installment => installment._id), // Assuming you have some unique identifier for each installment
        datasets: [
          {
            label: 'Initial Payment',
            data: initialPaymentData,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1
          },
          {
            label: 'Monthly Payment',
            data: monthlyPaymentData,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Count the occurrences of each status
    const statusCounts = {};
    installments.forEach(installment => {
      const status = installment.status;
      statusCounts[status] = statusCounts[status] ? statusCounts[status] + 1 : 1;
    });

    // Extract labels and data for the pie chart
    const statusLabels = Object.keys(statusCounts);
    const statusData = Object.values(statusCounts);

    Chart.getChart('pieChart')?.destroy();

    // Create a pie chart using Chart.js
    const ctx2 = document.getElementById('pieChart').getContext('2d');
    new Chart(ctx2, {
      type: 'pie',
      data: {
        labels: statusLabels,
        datasets: [
          {
            data: statusData,
            backgroundColor: [
              '#ff6384', '#36a2eb', '#cc65fe'
              // Add more colors if needed
            ],
            borderColor: [
              '#ff6384', '#36a2eb', '#cc65fe'
              // Add more colors if needed
            ],
            borderWidth: 1
          }
        ]
      }
    });
  };

  if (installments.length === 0) {
    return <div>Loading...</div>;
  }

  const totalMonths = installments.reduce((sum, installment) => sum + installment.noOfMonths, 0);
  const averageMonths = totalMonths / installments.length;

  const totalRevenue = installments.reduce((sum, installment) => sum + installment.totalAmount, 0);

  const totalInitialPayment = installments.reduce((sum, installment) => sum + installment.initialPayment, 0);
  const averageInitialPayment = (totalInitialPayment / installments.length).toFixed(2);

  const totalMonthlyPayment = installments.reduce((sum, installment) => sum + installment.monthlyPayment, 0);
  const averageMonthlyPayment = (totalMonthlyPayment / installments.length).toFixed(2);

  const numberOfPlans = new Set(installments.map(installment => installment.planID)).size;
  const numberOfInstallments = installments.length;


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
                  <h3 className="pageTopic">Installments Report</h3>
              </div>
      <div className="lightBlueBodyBG" >
        <table  className="table table-striped inst-table-1">
          <tr>
            <td className="inst-report-text-row1">Number of Installments:</td>
            <td className="inst-report-text-row1" >{numberOfInstallments}</td>
          </tr>

          <tr>
            <td className="inst-report-text-row2">Number of Plans: </td>
            <td className="inst-report-text-row2">{numberOfPlans}</td>
          </tr>

          <tr>
            <td className="inst-report-text-row1">Total Revenue:</td>
            <td className="inst-report-text-row1">{totalRevenue}</td>
          </tr>

          <tr>
            <td className="inst-report-text-row2">Average Initial Payment:</td>
            <td className="inst-report-text-row2">{averageInitialPayment}</td>
          </tr>

          <tr>
            <td className="inst-report-text-row1">Average Monthly Payment:</td>
            <td className="inst-report-text-row1">{averageMonthlyPayment}</td>
          </tr>

          <tr>
            <td className="inst-report-text-row2">Average Number of Months:</td>
            <td className="inst-report-text-row2">{averageMonths}</td>
          </tr>
          
          </table>
     
     </div> 
     <div className="top-box-inst">
          <div className="col-md-6" > 
            <h2 className="lightBlueBodyBG" >Initial Payment vs. Monthly Payment</h2>
            <canvas id="barChart2" width="400" height="200"></canvas>
        </div>

        <div className="col-md-6">
            <h2 className="lightBlueBodyBG">Status Distribution</h2>
            <canvas id="pieChart" width="400" height="200"></canvas>
        </div>

      </div>
    </div>
    </div>
    </>
  );
  
};

export default InstallmentReport;
