import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import AIChatbot from "../components/AIChatbot";
import { useEffect, useState } from "react";
import MobileLayout from "./MobileLayout";

export default function MainLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <MobileLayout />;
  }

  // DESKTOP UI (same as before)
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6">
          <Outlet />
          <AIChatbot />
        </div>
      </div>
    </div>
  );
}