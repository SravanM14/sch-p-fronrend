import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useState } from "react";

const AppLayout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      {isSidebarVisible && <Sidebar />}

      {/* Main Area */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Topbar */}
        <Topbar
          isSidebarVisible={isSidebarVisible}
          onToggleSidebar={() => setIsSidebarVisible((visible) => !visible)}
        />

        {/* Page Content */}
        <main className="flex-grow-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;