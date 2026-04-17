import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}