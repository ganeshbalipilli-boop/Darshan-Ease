import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
function ManageTemples() {
  const [temples, setTemples] = useState([]);
  const [search, setSearch] = useState("");

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
  const filteredTemples = temples.filter((temple) =>
    temple.templeName.toLowerCase().includes(search.toLowerCase()) ||
    temple.location.toLowerCase().includes(search.toLowerCase())
  );

  const deleteTemple = async (id) => {
    if (!window.confirm("Delete this temple?")) return;

    try {
      await API.delete(`/temples/${id}`);

      alert("Temple deleted successfully");

      fetchTemples();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="container mt-4">
    <h2>Manage Temples</h2>

    <div className="mb-3">
      <Link
        to="/admin/add-temple"
        className="btn btn-success"
      >
        + Add Temple
      </Link>
    </div>
    <div className="row mb-3">
    <div className="col-md-6">
      <input
      type="text"
      className="form-control"
      placeholder="Search by temple name or location..."
      value={search}
      onChange={(e) => setSearch(e.target.value)} />
    </div>
    </div>

    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Temple</th>
          <th>Location</th>
          <th>Timings</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {filteredTemples.map((temple) => (
          <tr key={temple._id}>
            <td>{temple.templeName}</td>
            <td>{temple.location}</td>
            <td>{temple.timings}</td>
            <td>
              <Link
                to={`/admin/edit-temple/${temple._id}`}
                className="btn btn-warning btn-sm me-2"
              >
                Edit
              </Link>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteTemple(temple._id)}
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

export default ManageTemples;