import { useEffect, useState } from "react";
import api from "../../services/api";

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  // GET ALL STUDENTS
  const loadStudents = async () => {
    try {
      const response = await api.get("/admin/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error loading students:", error);
      alert("Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  // BLOCK / UNBLOCK STUDENT
  const toggleBlockStudent = async (student) => {
    try {
      const newStatus = !student.blocked;

      await api.patch(`/admin/students/${student.id}/block`, {
        blocked: newStatus
      });

      setStudents((currentStudents) =>
        currentStudents.map((item) =>
          item.id === student.id
            ? { ...item, blocked: newStatus }
            : item
        )
      );

      alert(
        newStatus
          ? "Student blocked successfully."
          : "Student unblocked successfully."
      );
    } catch (error) {
      console.error("Block student error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update student."
      );
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="container py-4">
        <h2 className="fw-bold">Manage Students</h2>
        <p className="text-muted">Loading students...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">

      {/* PAGE HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">Manage Students</h2>

        <p className="text-muted">
          View and manage registered students on Borrow Buddy.
        </p>
      </div>

      {/* STUDENTS TABLE */}
      <div className="card border-0 shadow-sm">

        <div className="table-responsive">

          <table className="table table-hover align-middle mb-0">

            {/* TABLE HEADER */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>College</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>

              {students.length === 0 ? (

                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4"
                  >
                    No students found.
                  </td>
                </tr>

              ) : (

                students.map((student) => (

                  <tr key={student.id}>

                    {/* ID */}
                    <td>
                      {student.id}
                    </td>

                    {/* NAME */}
                    <td className="fw-semibold">
                      {student.name}
                    </td>

                    {/* EMAIL */}
                    <td>
                      {student.email}
                    </td>

                    {/* COLLEGE */}
                    <td>
                      {student.college}
                    </td>

                    {/* ROLE */}
                    <td>
                      <span className="badge bg-primary">
                        {student.role}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td>
                      {student.blocked ? (

                        <span className="badge bg-danger">
                          Blocked
                        </span>

                      ) : (

                        <span className="badge bg-success">
                          Active
                        </span>

                      )}
                    </td>

                    {/* ACTION */}
                    <td>

                      <button
                        className={
                          student.blocked
                            ? "btn btn-outline-success btn-sm"
                            : "btn btn-outline-danger btn-sm"
                        }
                        onClick={() =>
                          toggleBlockStudent(student)
                        }
                      >
                        {student.blocked
                          ? "Unblock"
                          : "Block"}
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ManageStudents;