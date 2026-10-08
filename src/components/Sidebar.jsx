import { NavLink } from "react-router-dom";

function Sidebar({ admin = false, isOpen, onClose }) {

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`sidebar ${isOpen ? "sidebar-open" : ""}`}
      >

        {/* Sidebar Header */}
        <div className="sidebar-header">

          <div>
            <h4 className="sidebar-title">
              Borrow Buddy
            </h4>

            <p className="sidebar-subtitle">
              {admin ? "ADMIN PANEL" : "STUDENT DASHBOARD"}
            </p>
          </div>

          {/* Close button for mobile */}
          <button
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            ×
          </button>

        </div>

        {/* ADMIN SIDEBAR */}
        {admin && (
          <nav className="sidebar-nav">

            <NavLink
              to="/admin"
              end
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              <span>📊</span>
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/admin/students"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              <span>👨‍🎓</span>
              <span>Students</span>
            </NavLink>

            <NavLink
              to="/admin/products"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              <span>📦</span>
              <span>Products</span>
            </NavLink>

          </nav>
        )}

        {/* STUDENT SIDEBAR */}
        {!admin && (
          <nav className="sidebar-nav">

            <NavLink
              to="/student"
              end
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              <span>🏠</span>
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/student/products"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              <span>🔍</span>
              <span>Browse Products</span>
            </NavLink>

            <NavLink
              to="/student/add-product"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              <span>➕</span>
              <span>Add Product</span>
            </NavLink>

            <NavLink
              to="/student/my-listings"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              <span>📦</span>
              <span>My Listings</span>
            </NavLink>

            <NavLink
              to="/student/my-requests"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              <span>📝</span>
              <span>My Requests</span>
            </NavLink>

            <NavLink
              to="/student/incoming-requests"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              <span>📩</span>
              <span>Incoming Requests</span>
            </NavLink>

            <NavLink
              to="/student/profile"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              <span>👤</span>
              <span>Profile</span>
            </NavLink>

          </nav>
        )}

      </aside>
    </>
  );
}

export default Sidebar;