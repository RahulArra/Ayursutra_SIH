import React from 'react'

const sessions = [
  { id: 1, date: '2025-09-24', therapy: 'Virechana', status: 'Scheduled', time: '10:00 AM' },
  { id: 2, date: '2025-09-25', therapy: 'Basti', status: 'Scheduled', time: '2:00 PM' },
  { id: 3, date: '2025-09-20', therapy: 'Abhyanga', status: 'Completed', time: '11:00 AM' },
]

export default function Dashboard() {
  return (
    <div className="page">
      {/* Header */}
      <div className="header">
        <div>
          <h1 className="page-title">Patient Dashboard</h1>
          <p className="muted-text">Overview of upcoming therapy sessions</p>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="card">
        <h3 className="card-title">Upcoming Sessions</h3>
        <ul className="session-list">
          {sessions.map(s => (
            <li key={s.id} className="session-item">
              <div className="session-info">
                <div>
                  <div className="therapy-name">{s.therapy}</div>
                  <div className="session-meta">
                    {s.date} at {s.time} • Therapist: Dr. Anjali
                  </div>
                </div>
                <div className={`status-badge ${s.status === 'Completed' ? 'completed' : 'scheduled'}`}>
                  {s.status}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid-2">
        <div className="card">
          <h4 className="card-subtitle">Quick Actions</h4>
          <button className="btn">Book Session</button>
          <button className="btn btn-secondary">Contact</button>
        </div>

        <div className="card">
          <h4 className="card-subtitle">Recent Activity</h4>
          <ul className="activity-list">
            <li>Submitted feedback for Abhyanga — 2025-09-20</li>
            <li>Completed pre-procedure checklist — 2025-09-23</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
