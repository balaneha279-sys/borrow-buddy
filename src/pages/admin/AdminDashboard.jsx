import { useEffect, useState } from "react";
import api from "../../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalProducts: 0,
    totalRequests: 0,
    pendingRequests: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await api.get("/admin/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error loading admin stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">

      <div className="mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <p className="text-muted">
          Overview of the Borrow Buddy platform.
        </p>
      </div>

      {loading ? (
        <p className="text-muted">Loading statistics...</p>
      ) : (
        <div className="row g-4">

          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm p-4">
              <h6 className="text-muted">Total Students</h6>
              <h2 className="fw-bold mt-2">
                {stats.totalStudents}
              </h2>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm p-4">
              <h6 className="text-muted">Total Products</h6>
              <h2 className="fw-bold mt-2">
                {stats.totalProducts}
              </h2>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm p-4">
              <h6 className="text-muted">Total Requests</h6>
              <h2 className="fw-bold mt-2">
                {stats.totalRequests}
              </h2>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm p-4">
              <h6 className="text-muted">Pending Requests</h6>
              <h2 className="fw-bold mt-2">
                {stats.pendingRequests}
              </h2>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default AdminDashboard;