import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function TempleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [temple, setTemple] = useState(null);
  const [slots, setSlots] = useState([]);
  const [persons, setPersons] = useState(1);

  const loadTemple = useCallback(async () => {
    try {
      const res = await API.get(`/temples/${id}`);
      setTemple(res.data);
    } catch (error) {
      console.error("Temple Error:", error);
    }
  }, [id]);

  const loadSlots = useCallback(async () => {
    try {
      const res = await API.get("/slots");

      const filtered = res.data.filter(
        (slot) => slot.temple._id === id
      );

      setSlots(filtered);
    } catch (error) {
      console.error("Slot Error:", error);
    }
  }, [id]);

  useEffect(() => {
    loadTemple();
    loadSlots();
  }, [id, loadTemple, loadSlots]);


  // Book Darshan
  const bookDarshan = async (slotId) => {
    try {
      await API.post("/bookings", {
        temple: id,
        slot: slotId,
        numberOfPersons: persons,
      });

      alert("Darshan Booked Successfully!");

      // Reload slots to update available seats
      loadSlots();

      // Redirect to My Bookings
      navigate("/bookings");

    } catch (error) {
      alert(error.response?.data?.message || "Booking Failed");
    }
  };

  if (!temple) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      <h2 className="mb-3">{temple.templeName}</h2>

      <img
        src={
          temple.image ||
          process.env.PUBLIC_URL + "/temple-placeholder.svg"
        }
        alt={temple.templeName}
        className="img-fluid rounded mb-4"
        style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
      />

      <h5>📍 {temple.location}</h5>

      <p>{temple.description}</p>

      <p>
        <strong>Temple Timings:</strong> {temple.timings}
      </p>

      <hr />

      <h3 className="mb-3">Available Slots</h3>

      {slots.length === 0 ? (
        <div className="alert alert-warning">
          No slots available.
        </div>
      ) : (
        slots.map((slot) => (
          <div className="card mb-3 shadow-sm" key={slot._id}>
            <div className="card-body">

              <h5>Date: {slot.date}</h5>

              <p>Time: {slot.time}</p>

              <p>
                <strong>Available Seats:</strong> {slot.availableSeats}
              </p>

              <div className="mb-3">
                <label className="form-label">
                  Number of Persons
                </label>

                <input
                  type="number"
                  min="1"
                  max={slot.availableSeats}
                  className="form-control"
                  value={persons}
                  onChange={(e) =>
                    setPersons(Number(e.target.value))
                  }
                />
              </div>

              <button
                className="btn btn-success"
                onClick={() => bookDarshan(slot._id)}
              >
                Book Now
              </button>

            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default TempleDetails;