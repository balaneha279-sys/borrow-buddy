import { useEffect, useState } from "react";

function Reports() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    const savedRequests =
      JSON.parse(localStorage.getItem("borrowBuddyRequests")) || [];

    setRequests(savedRequests);
  };

  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const approvedRequests = requests.filter(
    (request) => request.status === "Approved"
  ).length;

  const rejectedRequests = requests.filter(
    (request) => request.status === "Rejected"
  ).length;

  return (
    <div className="container-fluid py-4">

      <div className="mb-4">
        <h2 className="fw-bold">
          Reports
        </h2>

        <p className="text-muted">
          View marketplace request statistics.
        </p>
      </div>

      <div className="row g-4">

        {/* Total */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-1">
                Total Requests
              </p>

              <h2 className="fw-bold">
                {totalRequests}
              </h2>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-1">
                Pending
              </p>

              <h2 className="fw-bold text-warning">
                {pendingRequests}
              </h2>
            </div>
          </div>
        </div>

        {/* Approved */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-1">
                Approved
              </p>

              <h2 className="fw-bold text-success">
                {approvedRequests}
              </h2>
            </div>
          </div>
        </div>

        {/* Rejected */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-1">
                Rejected
              </p>

              <h2 className="fw-bold text-danger">
                {rejectedRequests}
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* Request Table */}
      <div className="card border-0 shadow-sm mt-4">

        <div className="card-body">

          <h5 className="fw-bold mb-3">
            Request Details
          </h5>

          {requests.length === 0 ? (

            <div className="text-center py-4">
              <p className="text-muted mb-0">
                No requests available.
              </p>
            </div>

          ) : (

            <div className="table-responsive">

              <table className="table align-middle">

                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Requester</th>
                    <th>Owner</th>
                    <th>Type</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {requests.map((request) => (

                    <tr key={request.id}>

                      <td>
                        {request.productName}
                      </td>

                      <td>
                        {request.requesterName}
                      </td>

                      <td>
                        {request.ownerName}
                      </td>

                      <td>
                        {request.requestType}
                      </td>

                      <td>

                        <span
                          className={`badge ${
                            request.status === "Approved"
                              ? "bg-success"
                              : request.status === "Rejected"
                              ? "bg-danger"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {request.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Reports;