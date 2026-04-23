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
import TestInstructions from "./pages/TestInstructions";
import Tests from "./pages/Tests";
import TestPlayer from "./pages/TestPlayer";
import AdminTests from "./pages/AdminTests";
import AdminTestList from "./pages/AdminTestList";
import Result from "./pages/Result";

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
import AdminEditTest from "./pages/AdminEditTest";


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
        <Route path="/tests" element={<Tests />} />
        <Route path="/test/:id" element={<TestInstructions />} />
        <Route path="/test/:id/start" element={<TestPlayer />} />
        <Route path="/result/:id" element={<Result />} />
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
        <Route path="tests" element={<AdminTests />} />
        <Route path="/admin/test-list" element={<AdminTestList />} />
        <Route path="tests/:id/edit" element={<AdminEditTest />} />
      </Route>
    </Routes>
  );
}

export default App;
