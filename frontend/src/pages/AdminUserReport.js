import React, { useEffect, useRef , useState} from "react";

import Chart from "chart.js/auto";


const AdminUserReport = () => {
  const chartRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch("/api/users/");
        const json = await response.json();

        if (response.ok) {
          setUsers(json);
        }
        const response1 = await fetch("/api/deletedusers/");
        const json1 = await response.json();

        if (response1.ok) {
          setDeletedUsers(json1);
        }

        const userTypes = ["A Gem Merchant", "A Gem Collector", "A Jeweller"]; 

        // Count the number of users for each userType
        const userCountByType = userTypes.map(
          (type) => users.filter((user) => user.userType === type).length
        );

        // Count the number of deleted users for each userType
        const deletedUserCountByType = userTypes.map(
          (type) => deletedUsers.filter((user) => user.userType === type).length
        );

        // Create the chart
        const chart = new Chart(chartRef.current, {
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

        // Cleanup the chart on component unmount
        return () => {
          chart.destroy();
        };
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
}

export default AdminUserReport;
