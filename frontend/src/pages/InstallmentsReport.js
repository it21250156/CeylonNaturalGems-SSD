import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const InstallmentReport = () => {
  const [installments, setInstallments] = useState([]);

  useEffect(() => {
    fetchInstallments();
  }, []);

  const fetchInstallments = async () => {
      const response = await fetch(`/api/installments`)
      const json = await response.json()

      if(response.ok){
        setInstallments(json)
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


/********************** 2nd chart */

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


/**************** 3rd */

// Assuming you have the installment data stored in a variable called 'installments'

// Extract installment dates and sort them in chronological order
const dates = installments.flatMap(installment => installment.installmentDates);
dates.sort((a, b) => a - b); // Assuming dates are in ISO string format


Chart.getChart('lineChart')?.destroy();

// Create a line chart using Chart.js
const ctx3 = document.getElementById('lineChart').getContext('2d');
new Chart(ctx3, {
  type: 'line',
  data: {
    labels: dates,
    datasets: [
      {
        label: 'Installment Dates',
        data: dates,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month' // Adjust the time unit based on your data
        }
      }
    }
  }
});



  };

  return (
    <div>
      <h2>Initial Payment vs. Monthly Payment </h2>
      <canvas id="barChart2" width="800" height="400"></canvas>

      <h2> Status Distribution </h2>
      <canvas id="pieChart" width="800" height="400"></canvas>

      <h2> Installment Dates Over Time </h2>
      <canvas id="lineChart" width="800" height="400"></canvas>

      <canvas id="monthlyPaymentChart" width="800" height="400"></canvas>
    </div>
  );
};

export default InstallmentReport;
