import { useEffect, useState } from "react";
import API from "../services/api";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Bookings</h2>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>User</th>
            <th>Temple</th>
            <th>Date</th>
            <th>Time</th>
            <th>Persons</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.user?.name}</td>
              <td>{booking.temple?.templeName || "Temple Deleted"}</td>
              <td>{booking.slot?.date || "N/A"}</td>
              <td>{booking.slot?.time || "N/A"}</td>
              <td>{booking.numberOfPersons}</td>
              <td>{booking.bookingStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageBookings;