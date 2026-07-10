import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddTemple() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    templeName: "",
    location: "",
    description: "",
    image: "",
    timings: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/temples", form);

      alert("Temple Added Successfully!");

      navigate("/admin/temples");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add temple");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Temple</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Temple Name</label>
          <input
            type="text"
            className="form-control"
            name="templeName"
            value={form.templeName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={form.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Temple Timings</label>
          <input
            type="text"
            className="form-control"
            name="timings"
            value={form.timings}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Add Temple
        </button>

      </form>
    </div>
  );
}

export default AddTemple;