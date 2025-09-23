import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./Progress.module.css";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Mock data
const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Wellness Score",
      data: [50, 55, 60, 65, 70, 75, 80],
      backgroundColor: "rgba(46, 139, 87, 0.8)", // Ayurvedic green
      borderColor: "rgba(34, 107, 67, 0.9)",
      borderWidth: 2,
      borderRadius: 8,
      borderSkipped: false,
    },
  ],
};

// Chart options with Ayurvedic theme
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#1F2937',
        font: {
          family: 'Inter, sans-serif',
          size: 12,
        },
        padding: 20,
      }
    },
    title: {
      display: true,
      text: 'Weekly Wellness Progress',
      color: '#1F2937',
      font: {
        family: 'Inter, sans-serif',
        size: 16,
        weight: '600',
      },
      padding: { bottom: 20 }
    },
    tooltip: {
      backgroundColor: 'rgba(139, 69, 19, 0.9)',
      titleColor: '#FFFFFF',
      bodyColor: '#FFFFFF',
      borderColor: 'rgba(139, 69, 19, 0.5)',
      borderWidth: 1,
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      grid: {
        color: 'rgba(139, 69, 19, 0.1)',
      },
      ticks: {
        color: '#6B7280',
        font: {
          family: 'Inter, sans-serif',
        }
      }
    },
    x: {
      grid: {
        color: 'rgba(139, 69, 19, 0.1)',
      },
      ticks: {
        color: '#6B7280',
        font: {
          family: 'Inter, sans-serif',
        }
      }
    },
  },
};

// Mock stats and milestones
const stats = [
  { icon: "📈", value: "80", label: "Current Score", trend: "+5" },
  { icon: "🔥", value: "7", label: "Day Streak", trend: "+2" },
  { icon: "✅", value: "12", label: "Sessions Completed", trend: "+1" }
];

const milestones = [
  { icon: "🎯", text: "Reached 70+ wellness score", date: "3 days ago" },
  { icon: "💪", text: "7-day consistency achieved", date: "Today" },
  { icon: "🧠", text: "Mental clarity improved", date: "1 week ago" }
];

const wellnessTips = [
  { icon: "💧", text: "Drink warm water with lemon each morning" },
  { icon: "🌅", text: "Practice 10 minutes of sunrise meditation" },
  { icon: "📝", text: "Journal your mood before bedtime" }
];

export default function Progress() {
  const progressPercentage = 65; // Example progress

  return (
    <div className={styles.progressPage}>
      <h1 className={styles.pageTitle}>Your Wellness Journey</h1>

      <div className={styles.progressGrid}>
        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Stats Overview */}
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div style={{ 
                  color: stat.trend.startsWith('+') ? '#10b981' : '#ef4444',
                  fontSize: '0.8rem',
                  marginTop: '4px'
                }}>
                  {stat.trend} from last week
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className={styles.chartCard}>
            <div className={styles.chartContainer}>
              <Bar data={data} options={options} />
            </div>
          </div>

          {/* Progress Summary */}
          <div className={styles.progressSummary}>
            <div className={styles.summaryHeader}>
              <div className={styles.summaryIcon}>🎯</div>
              <h2 className={styles.summaryTitle}>Monthly Progress</h2>
            </div>
            
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              color: '#6B7280',
              fontSize: '0.9rem'
            }}>
              <span>Start</span>
              <span>{progressPercentage}% Complete</span>
              <span>Goal</span>
            </div>

            <div style={{ marginTop: '24px' }}>
              <h3 style={{ color: '#8B4513', marginBottom: '16px' }}>Recent Milestones</h3>
              {milestones.map((milestone, index) => (
                <div key={index} className={styles.milestone}>
                  <div className={styles.milestoneIcon}>{milestone.icon}</div>
                  <div className={styles.milestoneText}>{milestone.text}</div>
                  <div className={styles.milestoneDate}>{milestone.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          {/* Wellness Tips */}
          <div className={styles.wellnessTips}>
            <h3 className={styles.tipsTitle}>Ayurvedic Tips</h3>
            {wellnessTips.map((tip, index) => (
              <div key={index} className={styles.tipItem}>
                <div className={styles.tipIcon}>{tip.icon}</div>
                <span>{tip.text}</span>
              </div>
            ))}
          </div>

          {/* Weekly Comparison */}
          <div className={styles.comparisonCard}>
            <div className={styles.comparisonHeader}>
              <div className={styles.comparisonIcon}>📊</div>
              <h3 className={styles.comparisonTitle}>Weekly Growth</h3>
            </div>
            <div className={`${styles.comparisonValue} ${styles.positive}`}>
              +15%
            </div>
            <p style={{ 
              textAlign: 'center', 
              color: '#6B7280',
              lineHeight: '1.5'
            }}>
              Your wellness score improved significantly compared to last week!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}