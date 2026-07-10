import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function ManageSlots() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
  try {
    const res = await API.get("/slots");
    console.log("Slots:", res.data);
    setSlots(res.data);
  } catch (error) {
    console.error(error);
  }
};

  const deleteSlot = async (id) => {
    if (!window.confirm("Delete this slot?")) return;

    try {
      await API.delete(`/slots/${id}`);
      alert("Slot deleted successfully");
      fetchSlots();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Slots</h2>

      <div className="mb-3">
        <Link
          to="/admin/add-slot"
          className="btn btn-success"
        >
          + Add Slot
        </Link>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Temple</th>
            <th>Date</th>
            <th>Time</th>
            <th>Seats</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {slots.map((slot) => (
            <tr key={slot._id}>
              <td>{slot.temple?.templeName}</td>
              <td>{slot.date}</td>
              <td>{slot.time}</td>
              <td>{slot.availableSeats}</td>

              <td>
                <Link to={`/admin/edit-slot/${slot._id}`}
                className="btn btn-warning btn-sm me-2" >
                  Edit
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteSlot(slot._id)}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageSlots;