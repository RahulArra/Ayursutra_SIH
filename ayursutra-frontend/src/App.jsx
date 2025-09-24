import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import Notifications from "./pages/Notifications/Notifications";
import FeedbackForm from "./pages/FeedbackForm/FeedbackForm";
import Progress from "./pages/Progress/Progress";
import PractitionerDashboard from "./pages/PractitionerDashboard/PractitionerDashboard";
import AuthPage from "./pages/AuthPage/AuthPage";
import BookSession from "./pages/BookSession/BookSession"; // Add this

import { AuthProvider } from "./context/AuthContext";
import Protected from "./components/Protected/Protected";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected routes */}
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
        <Route
          path="/book-session"  // Add this route
          element={
            <Protected>
              <BookSession />
            </Protected>
          }
        />
        <Route
          path="/practitioner"
          element={
            <Protected>
              <PractitionerDashboard />
            </Protected>
          }
        />

        {/* Default redirects */}
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </AuthProvider>
  );
}