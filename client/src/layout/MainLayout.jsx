import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="ml-64 w-full bg-gray-100 min-h-screen">

        {/* TOP NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT (DYNAMIC CHANGE) */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}