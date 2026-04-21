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
import AdminLectures from "./pages/AdminLectures";
import AdminNotes from "./pages/AdminNotes";
import AdminClasses from "./pages/AdminClasses";
import AdminMessages from "./pages/AdminMessages";
import Chat from "./pages/Chat";

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
        <Route path="chat" element={<Chat />} />
      </Route>

      {/* 👑 ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="student/:id" element={<AdminStudentDetail />} />
        <Route path="lectures" element={<AdminLectures />} />
        <Route path="notes" element={<AdminNotes />} />
        <Route path="classes" element={<AdminClasses />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="chat" element={<Chat />} />
      </Route>

    </Routes>
  );
}

export default App;