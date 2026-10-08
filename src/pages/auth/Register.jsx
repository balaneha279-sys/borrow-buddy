import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/register", {
        name,
        email,
        password,
        college
      });

      alert(response.data.message);

      // After successful registration, go to login
      navigate("/login");

    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      alert(message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="text-center mb-4">
          <img
            src="/BorrowBuddyLogo1.png"
            alt="Borrow Buddy"
            className="auth-logo"
          />

          <p className="text-muted">
            Campus Rental & Sharing Platform
          </p>
        </div>

        <h4 className="mb-3">Student Registration</h4>

        <form onSubmit={handleRegister}>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your college email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">College</label>
            <input
              type="text"
              className="form-control"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="Enter your college"
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "var(--brand-orange)",
              color: "white"
            }}
          >
            Register
          </button>

        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;