import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditSlot() {
  const { id } = useParams();
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
    fetchSlot();
  }, [id]);

  const fetchTemples = async () => {
    try {
      const res = await API.get("/temples");
      setTemples(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSlot = async () => {
    try {
      const res = await API.get(`/slots/${id}`);

      setForm({
        temple: res.data.temple?._id || "",
        date: new Date(res.data.date).toISOString().split("T")[0],
        time: res.data.time,
        availableSeats: res.data.availableSeats,
      });
    } catch (error) {
      console.error("Fetch Slot Error:", error);
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
      await API.put(`/slots/${id}`, form);

      alert("Slot Updated Successfully");

      navigate("/admin/slots");
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Slot</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Temple</label>

          <select
            className="form-select"
            name="temple"
            value={form.temple}
            onChange={handleChange}
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
          />
        </div>

        <div className="mb-3">
          <label>Time</label>

          <input
            type="text"
            className="form-control"
            name="time"
            value={form.time}
            onChange={handleChange}
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
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Slot
        </button>

      </form>
    </div>
  );
}

export default EditSlot;