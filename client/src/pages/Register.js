import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
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
      await API.post("/auth/register", form);

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card">

            <div className="card-body">

              <h2 className="mb-4">Register</h2>

              <form onSubmit={handleSubmit}>

                <input
                  className="form-control mb-3"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-3"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-3"
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-3"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                />

                <button className="btn btn-primary w-100">
                  Register
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;