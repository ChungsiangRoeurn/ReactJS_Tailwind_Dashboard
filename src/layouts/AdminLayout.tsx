import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function AdminLayout() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isOpen} />

      <div className="flex-1 flex flex-col transition-all duration-300">
        <Header toggleSidebar={toggleSidebar} isOpen={isOpen} />
        <div className="flex-1 p-6 bg-grray-100 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
