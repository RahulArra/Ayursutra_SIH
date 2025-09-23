import React, { useState } from 'react'

const patientsSeed = [
  { id: 1, name: 'Rahul', therapy: 'Virechana', date: '2025-09-24', room: 'Room 1' },
  { id: 2, name: 'Aisha', therapy: 'Basti', date: '2025-09-25', room: 'Room 2' }
]

export default function PractitionerDashboard() {
  const [patients, setPatients] = useState(patientsSeed)

  const handleReschedule = (id) => {
    const newDate = prompt('Enter new date (YYYY-MM-DD):')
    if (!newDate) return
    const updated = patients.map(p => p.id === id ? { ...p, date: newDate } : p)
    setPatients(updated)
    console.log('Rescheduled (mock):', id, newDate)
  }

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Practitioner Dashboard</h1>
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Today's Sessions</h3>
        <ul style={{ padding: 0 }}>
          {patients.map(p => (
            <li key={p.id} className="list-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{p.name}</strong> — {p.therapy}
                  <div style={{ color: 'var(--muted)' }}>Room: {p.room}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div>{p.date}</div>
                  <button
                    className="button"
                    style={{ marginTop: 8 }}
                    onClick={() => handleReschedule(p.id)}
                  >
                    Reschedule
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
