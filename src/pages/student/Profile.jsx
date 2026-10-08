import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("borrowBuddyUser")
    ) || {};

  const logout = () => {
    localStorage.removeItem("borrowBuddyUser");
    navigate("/login");
  };

  return (
    <div>

      <h2>My Profile</h2>

      <div className="card border-0 shadow-sm mt-4">

        <div className="card-body">

          <div className="profile-avatar">
            {user.name?.charAt(0)}
          </div>

          <h3 className="mt-3">
            {user.name}
          </h3>

          <p>
            <strong>Email:</strong>{" "}
            {user.email}
          </p>

          <p>
            <strong>College:</strong>{" "}
            {user.college}
          </p>

          <p>
            <strong>Verification:</strong>{" "}
            <span className="badge bg-success">
              Verified
            </span>
          </p>

          <button
            className="btn btn-outline-danger"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;