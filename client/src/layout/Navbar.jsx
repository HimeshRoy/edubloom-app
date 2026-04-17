export default function Navbar() {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      
      <input
        type="text"
        placeholder="Search lectures, classes..."
        className="border p-2 rounded w-1/3"
      />

      <div className="flex items-center gap-4">
        <button>🔔</button>
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            alt=""
            className="w-8 h-8 rounded-full"
          />
          <span>Student</span>
        </div>
      </div>
    </div>
  );
}