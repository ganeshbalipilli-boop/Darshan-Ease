import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          DarshanEase
        </Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link" to="/">
            Home
          </Link>

          {user ? (
            <>
              <Link className="nav-link" to="/bookings">
                My Bookings
              </Link>

              {user.role === "admin" && (
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              )}

              <span className="navbar-text me-3">
                Welcome, {user.name}
              </span>

              <button
                className="btn btn-danger"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                Login
              </Link>

              <Link className="nav-link" to="/register">
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;