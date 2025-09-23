import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Notifications from "./pages/Notifications/Notifications";
import FeedbackForm from "./pages/FeedbackForm/FeedbackForm";
import Progress from "./pages/Progress/Progress";
import PractitionerDashboard from "./pages/PractitionerDashboard/PractitionerDashboard";
import AuthPage from "./pages/AuthPage/AuthPage";
import Logout from "./pages/Logout/Logout"; // Optional logout page

// Import context and components
import { AuthProvider } from "./context/AuthContext";
import Protected from "./components/Protected/Protected";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/logout" element={<Logout />} />

        {/* Patient routes */}
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/notifications"
          element={
            <Protected>
              <Notifications />
            </Protected>
          }
        />
        <Route
          path="/feedback"
          element={
            <Protected>
              <FeedbackForm />
            </Protected>
          }
        />
        <Route
          path="/progress"
          element={
            <Protected>
              <Progress />
            </Protected>
          }
        />

        {/* Practitioner route */}
        <Route
          path="/practitioner"
          element={
            <Protected>
              <PractitionerDashboard />
            </Protected>
          }
        />

        {/* Default redirect to auth */}
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </AuthProvider>
  );
}