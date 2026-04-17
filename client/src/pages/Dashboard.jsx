import MainLayout from "../layout/MainLayout";

export default function Dashboard() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">
        Welcome back 👋
      </h1>

      <div className="grid grid-cols-3 gap-4">
        
        <div className="bg-white p-5 rounded-xl shadow">
          <h2>Courses Completed</h2>
          <p className="text-xl font-bold">12</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2>Hours Learned</h2>
          <p className="text-xl font-bold">48.5h</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2>Streak</h2>
          <p className="text-xl font-bold">7 Days 🔥</p>
        </div>

      </div>
    </MainLayout>
  );
}