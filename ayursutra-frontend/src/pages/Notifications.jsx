import React from 'react'

const notifications = [
  { type: 'Pre', message: 'Avoid heavy meals 12 hours before therapy', id: 1 },
  { type: 'Pre', message: 'Hydrate well and arrive 15 minutes early', id: 2 },
  { type: 'Post', message: 'Drink warm water and rest for 2 hours', id: 3 },
]

export default function Notifications() {
  return (
    <div className="page">
      <h1 className="page-title">Notifications</h1>

      <div className="card">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`notification-item ${n.type === 'Pre' ? 'pre' : 'post'}`}
          >
            <div className="notification-type">{n.type}-Procedure</div>
            <div className="notification-message">{n.message}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
