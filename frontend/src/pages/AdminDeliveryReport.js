import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';


const AdminDeliveryReport = () => {
  const [deliveriesCount, setDeliveriesCount] = useState(0);
  const [pickupsCount, setPickupsCount] = useState(0);

  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        const response = await fetch('/api/payments');
        const payments = await response.json();

        // Count deliveries and pickups
        const deliveries = payments.filter(
          (payment) => payment.dmethod === 'Delivery'
        );
        const pickups = payments.filter(
          (payment) => payment.dmethod === 'Pickup'
        );

        setDeliveriesCount(deliveries.length);
        setPickupsCount(pickups.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDeliveryData();
  }, []);

  const pieChartData = {
    labels: ['Deliveries', 'Pickups'],
    datasets: [
      {
        data: [deliveriesCount, pickupsCount],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };


  return (


    <div className="lightBlueBodyBG">
    <div className="whiteBodyBG">
        <div className="darkBlueTopicBox">
            <h3 className="pageTopic">Deliver Method Count</h3>
        </div>
        <div>
      {/* <h2>Delivery and Pickup Count Report</h2>
      <p>Number of Deliveries: {deliveriesCount}</p>
      <p>Number of Pickups   : {pickupsCount}</p> */}
      {/* You can use any chart library (e.g., Chart.js) to visualize the data */}

      <div>
      <h2>Delivery and Pickup Count Report</h2>
      <div style={{ width: '300px', height: '300px' }}>
        <Pie data={pieChartData} />
      </div>
    </div>
    </div>
        
    </div>
</div>

   
  );
};

export default AdminDeliveryReport;
