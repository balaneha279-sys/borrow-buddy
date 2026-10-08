import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", {
        email,
        password
      });

      const user = response.data.student;

      localStorage.setItem(
        "borrowBuddyUser",
        JSON.stringify(user)
      );

      navigate("/student");

    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Login failed. Please try again.";

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

        <h4 className="mb-3">
          Student Login
        </h4>

        <form onSubmit={handleLogin}>

          <div className="mb-3">

            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="student@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

        <div className="text-center">
          <Link to="/admin/login">
            Admin Login
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Login;