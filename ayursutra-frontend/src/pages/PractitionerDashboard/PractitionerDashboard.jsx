import React from "react";
import styles from "./PractitionerDashboard.module.css";

const patients = [
  { id: 1, name: "Alex Johnson", therapy: "Abhyanga", nextSession: "2025-09-25", progress: 75 },
  { id: 2, name: "Sam Smith", therapy: "Virechana", nextSession: "2025-09-26", progress: 60 },
  { id: 3, name: "Jordan Lee", therapy: "Basti", nextSession: "2025-09-27", progress: 85 },
];

export default function PractitionerDashboard() {
  return (
    <div className={styles.practitionerPage}>
      <h1 className={styles.pageTitle}>Practitioner Dashboard</h1>
      
      {/* Stats Overview */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statValue}>12</div>
          <div className={styles.statLabel}>Active Patients</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📅</div>
          <div className={styles.statValue}>8</div>
          <div className={styles.statLabel}>Sessions Today</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>⭐</div>
          <div className={styles.statValue}>4.9</div>
          <div className={styles.statLabel}>Average Rating</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>💪</div>
          <div className={styles.statValue}>92%</div>
          <div className={styles.statLabel}>Success Rate</div>
        </div>
      </div>

      {/* Patients List */}
      <div className={styles.patientsList}>
        <h2 className={styles.patientsTitle}>Today's Patients</h2>
        {patients.map(patient => (
          <div key={patient.id} className={styles.patientItem}>
            <div className={styles.patientInfo}>
              <div className={styles.patientName}>{patient.name}</div>
              <div className={styles.patientDetails}>
                Therapy: {patient.therapy} | Next Session: {patient.nextSession} | Progress: {patient.progress}%
              </div>
            </div>
            <button className={styles.viewButton}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}