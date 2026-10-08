import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AdminLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>

      <Navbar
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="dashboard-container">

        <Sidebar
          admin={true}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="dashboard-content">
          <Outlet />
        </main>

      </div>

    </>
  );
}

export default AdminLayout;