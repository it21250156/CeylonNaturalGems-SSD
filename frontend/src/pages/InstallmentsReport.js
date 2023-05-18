import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { useLogout } from '../hooks/useLogout';

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
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Monthly Payment',
            data: monthlyPaymentData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
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
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              // Add more colors if needed
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
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
  const averageInitialPayment = totalInitialPayment / installments.length;

  const totalMonthlyPayment = installments.reduce((sum, installment) => sum + installment.monthlyPayment, 0);
  const averageMonthlyPayment = totalMonthlyPayment / installments.length;

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
      
      <h4>Number of Installments: {numberOfInstallments}</h4>
      
      <h4>Number of Plans: {numberOfPlans}</h4>
      
      <h4>Total Revenue: {totalRevenue}</h4>
      
      <h4>Average Initial Payment: {averageInitialPayment}</h4>
      <h4>Average Monthly Payment: {averageMonthlyPayment}</h4>
      <h4>Average Number of Months: {averageMonths}</h4>
     
      <h2>Initial Payment vs. Monthly Payment</h2>
      <canvas id="barChart2" width="800" height="400"></canvas>

      <h2>Status Distribution</h2>
      <canvas id="pieChart" width="800" height="400"></canvas>
    </div>
    </div>
    </>
  );
  
};

export default InstallmentReport;
