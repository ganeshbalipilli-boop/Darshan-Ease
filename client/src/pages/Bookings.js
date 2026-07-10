import { useEffect, useState } from "react";
import API from "../services/api";

function Bookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {

    try {

      const res = await API.get("/bookings/my");

      setBookings(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="container mt-4">

      <h2>My Bookings</h2>

      {bookings.length === 0 ? (

        <p>No Bookings Found</p>

      ) : (

        bookings.map((booking) => (

          <div className="card mb-3" key={booking._id}>

            <div className="card-body">

              <h4>{booking.temple
              ? booking.temple.templeName
              : "Temple Deleted"}
              </h4>

              <p>Date: {booking.slot ? booking.slot.date : "Date not available"}</p>

              <p>Time: {booking.slot ? booking.slot.time : "Time not available"}</p>

              <p>Persons: {booking.numberOfPersons}</p>

              <p>Status: {booking.bookingStatus}</p>

            </div>

          </div>

        ))

      )}

    </div>
  );
}

export default Bookings;