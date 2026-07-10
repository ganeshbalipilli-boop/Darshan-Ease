import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Home() {
  const [temples, setTemples] = useState([]);

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
        const res = await API.get("/temples");
        console.log("API Response:", res.data);
        setTemples(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Available Temples</h2>
      <div className="bg-primary text-white rounded p-5 mb-4">
        <h1>🙏 Welcome to DarshanEase</h1>
        <p>Book temple darshan slots online with ease.</p>
        <h2 className="mb-4 text-center">Popular Temples</h2>
      </div>

      <div className="row">
        {temples.map((temple) => (
          <div className="col-md-4 mb-4" key={temple._id}>
            <div className="card h-100">

              <img
                src={
                  temple.image ||
                  process.env.PUBLIC_URL + "/temple-placeholder.svg"
                }
                className="card-img-top"
                alt={temple.templeName}
                style={{ height: "250px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5>{temple.templeName}</h5>

                <p>{temple.location}</p>

                <p>{temple.timings}</p>

                <Link
                  to={`/temple/${temple._id}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;