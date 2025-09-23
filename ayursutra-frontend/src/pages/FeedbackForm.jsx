import React, { useState } from 'react'

export default function FeedbackForm() {
  const [rating, setRating] = useState(3)
  const [notes, setNotes] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = { rating, notes, date: new Date().toISOString() }
    console.log('Mock submit feedback:', payload)
    alert('Feedback submitted (mock)! Check console.')
    setNotes('')
    setRating(3)
  }

  return (
    <div className="page">
      <h1 className="page-title">Submit Feedback</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <label className="form-label">
            Rating: <span className="rating-value">{rating}</span>
          </label>
          <input
            type="range"
            min={1}
            max={5}
            value={rating}
            onChange={e => setRating(Number(e.target.value))}
            className="range-input"
          />

          <label className="form-label" style={{ marginTop: '1rem' }}>Notes</label>
          <textarea
            className="textarea"
            rows={5}
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />

          <div style={{ marginTop: '1rem' }}>
            <button className="btn" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
