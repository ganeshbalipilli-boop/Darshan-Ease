import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashboardChart({ dashboard }) {
  const data = {
    labels: [
      "Users",
      "Temples",
      "Slots",
      "Bookings",
    ],

    datasets: [
      {
        label: "System Statistics",
        data: [
          dashboard.totalUsers,
          dashboard.totalTemples,
          dashboard.totalSlots,
          dashboard.totalBookings,
        ],
      },
    ],
  };

  return (
    <div className="card mt-4 shadow">
      <div className="card-body">
        <h4>System Statistics</h4>

        <Bar data={data} />
      </div>
    </div>
  );
}

export default DashboardChart;