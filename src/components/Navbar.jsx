import { Link, useNavigate } from "react-router-dom";

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("borrowBuddyUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const logout = () => {
    localStorage.removeItem("borrowBuddyUser");
    navigate("/login");
  };

  const isAdmin = user?.role === "ADMIN";

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container-fluid px-3 px-lg-4">

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          ☰
        </button>

        {/* Logo */}
        <Link
          className="navbar-brand"
          to={isAdmin ? "/admin" : "/student"}
        >
          <img
            src="/BorrowBuddyLogo1.png"
            alt="Borrow Buddy"
            className="navbar-logo"
          />

          <span className="brand-name">
            Borrow Buddy
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="desktop-navbar ms-auto">

          {!isAdmin && (
            <>
              <Link className="nav-link" to="/student">
                Home
              </Link>

              <Link className="nav-link" to="/student/products">
                Products
              </Link>

              <Link className="nav-link" to="/student/add-product">
                List Product
              </Link>

              <Link className="nav-link" to="/student/my-requests">
                My Requests
              </Link>
            </>
          )}

          {isAdmin && (
            <>
              <Link className="nav-link" to="/admin">
                Dashboard
              </Link>

              <Link className="nav-link" to="/admin/students">
                Students
              </Link>

              <Link className="nav-link" to="/admin/products">
                Products
              </Link>
            </>
          )}

          {user && (
            <div className="navbar-user">

              <span className="user-name">
                {user.name}
              </span>

              <button
                className="logout-btn"
                onClick={logout}
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;