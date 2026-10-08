import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function MyRequests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyRequests();
  }, []);

  const loadMyRequests = async () => {
    try {
      const storedUser =
        localStorage.getItem("borrowBuddyUser");

      if (!storedUser) {
        navigate("/login");
        return;
      }

      const user = JSON.parse(storedUser);

      const response = await api.get(
        `/requests/my/${user.id}`
      );

      setRequests(response.data);

    } catch (error) {
      console.error("Error loading my requests:", error);

      alert(
        error.response?.data?.message ||
        "Failed to load requests."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    if (status === "APPROVED") {
      return "text-success";
    }

    if (status === "REJECTED") {
      return "text-danger";
    }

    return "text-warning";
  };

  if (loading) {
    return (
      <div className="container py-4">
        <h2 className="fw-bold">
          My Requests
        </h2>

        <p className="text-muted">
          Loading requests...
        </p>
      </div>
    );
  }

  return (
    <div className="container py-4">

      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          My Requests
        </h2>

        <p className="text-muted mb-0">
          Track the requests you have sent.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-5">

          <h5>
            No requests yet
          </h5>

          <p className="text-muted">
            Your product requests will appear here.
          </p>

        </div>
      ) : (
        <div className="row g-4">

          {requests.map((request) => (
            <div
              className="col-md-6 col-lg-4"
              key={request.id}
            >

              <div className="card h-100 border-0 shadow-sm">

                {request.image_url && (
                  <img
                    src={request.image_url}
                    alt={request.product_name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover"
                    }}
                  />
                )}

                <div className="card-body">

                  <h5 className="fw-bold mb-3">
                    {request.product_name}
                  </h5>

                  <p className="mb-2">
                    <strong>Owner:</strong>{" "}
                    {request.owner_name}
                  </p>

                  <p className="mb-2">
                    <strong>Request:</strong>{" "}
                    {request.request_type}
                  </p>

                  <p className="mb-2">
                    <strong>Status:</strong>{" "}
                    <span
                      className={getStatusClass(
                        request.status
                      )}
                    >
                      {request.status}
                    </span>
                  </p>

                  <p className="text-muted small mb-0">
                    Requested on:{" "}
                    {new Date(
                      request.created_at
                    ).toLocaleDateString()}
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default MyRequests;