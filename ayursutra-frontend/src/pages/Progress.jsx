import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = {
  labels: ['Day 1','Day 2','Day 3','Day 4','Day 5','Day 6','Day 7'],
  datasets: [
    {
      label: 'Wellness Score',
      data: [50,55,60,65,70,75,80],
      backgroundColor: 'rgba(46,125,50,0.6)' // primary green
    }
  ]
}

export default function Progress() {
  return (
    <div className="page">
      <h1 className="page-title">Weekly Progress</h1>

      <div className="card chart-card">
        <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>
    </div>
  )
}
