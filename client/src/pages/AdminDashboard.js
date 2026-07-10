import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import DashboardChart from "../components/DashboardChart";

function AdminDashboard() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setDashboard(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!dashboard)
    return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="row">

        <div className="col-md-3">
          <div className="card bg-primary text-white mb-3">
            <div className="card-body">
              <h5>Total Users</h5>
              <h2>{dashboard.totalUsers}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white mb-3">
            <div className="card-body">
              <h5>Total Temples</h5>
              <h2>{dashboard.totalTemples}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning text-dark mb-3">
            <div className="card-body">
              <h5>Total Slots</h5>
              <h2>{dashboard.totalSlots}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-danger text-white mb-3">
            <div className="card-body">
              <h5>Total Bookings</h5>
              <h2>{dashboard.totalBookings}</h2>
            </div>
          </div>
        </div>

      </div>

      <div className="mb-4">

        <Link
          to="/admin/temples"
          className="btn btn-primary me-2"
        >
          Manage Temples
        </Link>

        <Link
          to="/admin/slots"
          className="btn btn-success me-2"
        >
          Manage Slots
        </Link>

        <Link
          to="/admin/bookings"
          className="btn btn-warning me-2"
        >
          Manage Bookings
        </Link>

        <Link
          to="/admin/users"
          className="btn btn-dark"
        >
          Manage Users
        </Link>

      </div>

      <div className="card shadow">

        <div className="card-header bg-dark text-white">
          Recent Bookings
        </div>

        <div className="card-body">

          <table className="table">

            <thead>
              <tr>
                <th>User</th>
                <th>Temple</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>

              {dashboard.recentBookings.map((booking) => (
                <tr key={booking._id}>

                  <td>{booking.user?.name}</td>

                  <td>{booking.temple?.templeName}</td>

                  <td>{booking.slot?.date}</td>

                  <td>{booking.slot?.time}</td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;