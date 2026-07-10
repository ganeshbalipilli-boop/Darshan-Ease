import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditTemple() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    templeName: "",
    location: "",
    description: "",
    image: "",
    timings: "",
  });

  useEffect(() => {
    loadTemple();
  }, []);

  const loadTemple = async () => {
    try {
      const res = await API.get(`/temples/${id}`);
      setForm(res.data);
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
      await API.put(`/temples/${id}`, form);

      alert("Temple Updated Successfully");

      navigate("/admin/temples");
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Temple</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Temple Name</label>
          <input
            type="text"
            className="form-control"
            name="templeName"
            value={form.templeName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={form.location}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            rows="3"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Image URL</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Temple Timings</label>
          <input
            type="text"
            className="form-control"
            name="timings"
            value={form.timings}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary">
          Update Temple
        </button>

      </form>
    </div>
  );
}

export default EditTemple;