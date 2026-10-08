import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "admin@borrowbuddy.com" &&
      password === "admin123"
    ) {
      const adminUser = {
        email: email,
        name: "Admin",
        role: "ADMIN",
      };

      localStorage.setItem(
        "borrowBuddyUser",
        JSON.stringify(adminUser)
      );

      navigate("/admin");
    } else {
      alert("Invalid admin email or password");
    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        {/* Logo */}
        <img
          src="/BorrowBuddyLogo1.png"
          alt="Borrow Buddy"
          className="admin-login-logo"
        />

        {/* Subtitle */}
        <p className="admin-login-subtitle">
          Borrow Buddy Administration
        </p>

        {/* Heading */}
        <h1 className="admin-login-title">
          Admin Login
        </h1>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="admin-form-group">
            <label htmlFor="admin-email">
              Admin Email
            </label>

            <input
              id="admin-email"
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-login-input"
              autoComplete="username"
              required
            />
          </div>

          {/* Password */}
          <div className="admin-form-group">
            <label htmlFor="admin-password">
              Password
            </label>

            <input
              id="admin-password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-login-input"
              autoComplete="current-password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="admin-login-btn"
          >
            Admin Login
          </button>

        </form>

        {/* Student Login Link */}
        <div className="student-login-link">
          <span>Are you a student? </span>

          <Link to="/login">
            Student Login
          </Link>
        </div>

      </div>

    </div>
  );
}

export default AdminLogin;