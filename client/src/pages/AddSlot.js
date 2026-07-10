import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddSlot() {
  const navigate = useNavigate();

  const [temples, setTemples] = useState([]);

  const [form, setForm] = useState({
    temple: "",
    date: "",
    time: "",
    availableSeats: "",
  });

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
      const res = await API.get("/temples");
      setTemples(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/slots", form);

      alert("Slot Added Successfully");

      navigate("/admin/slots");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add slot");
    }
  };

  return (
    <div className="container mt-4">

      <h2>Add Slot</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Temple</label>

          <select
            className="form-select"
            name="temple"
            value={form.temple}
            onChange={handleChange}
            required
          >
            <option value="">Select Temple</option>

            {temples.map((temple) => (
              <option key={temple._id} value={temple._id}>
                {temple.templeName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Date</label>

          <input
            type="date"
            className="form-control"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Time</label>

          <input
            type="text"
            className="form-control"
            name="time"
            placeholder="08:00 AM"
            value={form.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Available Seats</label>

          <input
            type="number"
            className="form-control"
            name="availableSeats"
            value={form.availableSeats}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-success">
          Add Slot
        </button>

      </form>

    </div>
  );
}

export default AddSlot;