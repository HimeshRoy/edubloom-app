export default function MobileNavbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="h-14 bg-indigo-600 text-white flex items-center justify-between px-4">
      <h1 className="font-semibold">EduBloom</h1>
      <span className="text-sm">{user.name}</span>
    </div>
  );
}