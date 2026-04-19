import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import LiveClass from "./pages/LiveClass";
import ClassRoom from "./pages/ClassRoom";
import Profile from "./pages/Profile";
import Lectures from "./pages/Lectures";
import Notes from "./pages/Notes";
import Messages from "./pages/Messages";

import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// 👑 ADMIN IMPORTS
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminStudents from "./pages/AdminStudents";
import AdminStudentDetail from "./pages/AdminStudentDetail";

function App() {
  return (
    <Routes>

      {/* 🔓 PUBLIC */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* 🎓 STUDENT */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="live" element={<LiveClass />} />
        <Route path="live/:id" element={<ClassRoom />} />
        <Route path="profile" element={<Profile />} />
        <Route path="lectures" element={<Lectures />} />
        <Route path="notes" element={<Notes />} />
        <Route path="messages" element={<Messages />} />
      </Route>

      {/* 👑 ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="student/:id" element={<AdminStudentDetail />} />
      </Route>

    </Routes>
  );
}

export default App;