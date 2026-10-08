import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function IncomingRequests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIncomingRequests();
  }, []);

  const loadIncomingRequests = async () => {
    try {
      const storedUser =
        localStorage.getItem("borrowBuddyUser");

      if (!storedUser) {
        navigate("/login");
        return;
      }

      const user = JSON.parse(storedUser);

      console.log("Logged-in owner ID:", user.id);

      const response = await api.get(
        `/requests/incoming/${user.id}`
      );

      console.log(
        "Incoming requests:",
        response.data
      );

      setRequests(response.data);

    } catch (error) {
      console.error(
        "Error loading incoming requests:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (
    requestId,
    status
  ) => {
    try {
      await api.patch(
        `/requests/${requestId}/status`,
        {
          status
        }
      );

      // Update the request on the screen
      setRequests((currentRequests) =>
        currentRequests.map((request) =>
          request.id === requestId
            ? { ...request, status }
            : request
        )
      );

      alert(
        status === "APPROVED"
          ? "Request approved successfully."
          : "Request rejected successfully."
      );

    } catch (error) {
      console.error(
        "Update request error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to update request."
      );
    }
  };

  if (loading) {
    return (
      <div className="container py-4">
        <h2 className="fw-bold">
          Incoming Requests
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
          Incoming Requests
        </h2>

        <p className="text-muted mb-0">
          Requests received for your products.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-5">

          <h5>
            No incoming requests
          </h5>

          <p className="text-muted">
            You don't have any requests for your
            products yet.
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

                  <h5 className="fw-bold">
                    {request.product_name}
                  </h5>

                  <p className="mb-2">
                    <strong>Requested by:</strong>{" "}
                    {request.requester_name}
                  </p>

                  <p className="mb-2">
                    <strong>Email:</strong>{" "}
                    {request.requester_email}
                  </p>

                  <p className="mb-2">
                    <strong>Request:</strong>{" "}
                    {request.request_type}
                  </p>

                  <p className="mb-3">
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        request.status === "PENDING"
                          ? "text-warning"
                          : request.status === "APPROVED"
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {request.status}
                    </span>
                  </p>

                  {request.status === "PENDING" && (
                    <div className="d-flex gap-2">

                      <button
                        className="btn btn-success flex-grow-1"
                        onClick={() =>
                          updateRequestStatus(
                            request.id,
                            "APPROVED"
                          )
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-outline-danger flex-grow-1"
                        onClick={() =>
                          updateRequestStatus(
                            request.id,
                            "REJECTED"
                          )
                        }
                      >
                        Reject
                      </button>

                    </div>
                  )}

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default IncomingRequests;