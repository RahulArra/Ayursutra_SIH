import React from "react";
import styles from "./Dashboard.module.css";

const sessions = [
  { id: 1, date: "2025-09-24", therapy: "Virechana", status: "Scheduled", time: "10:00 AM" },
  { id: 2, date: "2025-09-25", therapy: "Basti", status: "Scheduled", time: "2:00 PM" },
  { id: 3, date: "2025-09-20", therapy: "Abhyanga", status: "Completed", time: "11:00 AM" },
];

const recentActivity = [
  "Submitted feedback for Abhyanga — 2025-09-20",
  "Completed pre-procedure checklist — 2025-09-23",
  "Updated wellness journal — 2025-09-22",
  "Scheduled follow-up consultation — 2025-09-21"
];

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.grid}>
        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Welcome Banner */}
          <div className={styles.welcomeBanner}>
            <h1 className={styles.welcomeTitle}>Welcome to Your Wellness Journey</h1>
            <p className={styles.welcomeSubtitle}>Your path to mental balance and harmony starts here</p>
          </div>

          {/* Upcoming Sessions */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>📅</div>
              <h2 className={styles.cardTitle}>Upcoming Sessions</h2>
            </div>
            <ul className={styles.sessionsList}>
              {sessions.map((session) => (
                <li key={session.id} className={styles.sessionItem}>
                  <div className={styles.sessionInfo}>
                    <div className={styles.sessionTherapy}>{session.therapy}</div>
                    <div className={styles.sessionDetails}>
                      {session.date} at {session.time}
                    </div>
                    <div className={styles.sessionTherapist}>Therapist: Dr. Anjali</div>
                  </div>
                  <span className={`${styles.sessionStatus} ${
                    session.status === "Completed" ? styles.statusCompleted : styles.statusScheduled
                  }`}>
                    {session.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          {/* Quick Actions */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>⚡</div>
              <h2 className={styles.cardTitle}>Quick Actions</h2>
            </div>
            <div className={styles.quickActions}>
              <div className={styles.actionButtons}>
                <button className={styles.actionButtonPrimary}>
                  📖 Book New Session
                </button>
                <button className={styles.actionButtonSecondary}>
                  💬 Contact Practitioner
                </button>
                <button className={styles.actionButton}>
                  📝 Wellness Journal
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>📊</div>
              <h2 className={styles.cardTitle}>Recent Activity</h2>
            </div>
            <ul className={styles.activityList}>
              {recentActivity.map((activity, index) => (
                <li key={index} className={styles.activityItem}>
                  {activity}
                </li>
              ))}
            </ul>
          </div>

          {/* Wellness Tip */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>🌿</div>
              <h2 className={styles.cardTitle}>Daily Wellness Tip</h2>
            </div>
            <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
              "Start your day with 5 minutes of deep breathing. Inhale peace, exhale stress. 
              This simple practice can balance your Vata dosha and bring mental clarity."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}