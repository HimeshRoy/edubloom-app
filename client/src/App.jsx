import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import LiveClass from "./pages/LiveClass";
import ClassRoom from "./pages/ClassRoom";
import Profile from "./pages/Profile";
import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Lectures from "./pages/Lectures";
import Notes from "./pages/Notes";
import Messages from "./pages/Messages";

function App() {
  return (
    <Routes>

      {/* 🔓 PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* 🔐 PROTECTED ROUTES */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* CHILD ROUTES */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="live" element={<LiveClass />} />
        <Route path="live/:id" element={<ClassRoom />} />
        <Route path="profile" element={<Profile />} />
        <Route path="lectures" element={<Lectures />} />
        <Route path="notes" element={<Notes />} />
        <Route path="messages" element={<Messages />} />
      </Route>

    </Routes>
  );
}

export default App;