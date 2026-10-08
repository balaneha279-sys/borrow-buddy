import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function StudentLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>

      <Navbar
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="dashboard-container">

        <Sidebar
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

export default StudentLayout;