import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Notifications from './pages/Notifications'
import FeedbackForm from './pages/FeedbackForm'
import Progress from './pages/Progress'
import PractitionerDashboard from './pages/PractitionerDashboard'
import Nav from './components/Nav'

export default function App() {
  return (
    <div className="app">
      {/* Navigation */}
      <Nav />

      {/* Main content */}
      <main className="page">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/practitioner" element={<PractitionerDashboard />} />
        </Routes>
      </main>
    </div>
  )
}
