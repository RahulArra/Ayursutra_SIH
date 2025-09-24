import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./AuthPage.module.css";

export default function AuthPage() {
  const { login } = useAuth();
  const navigate = useNavigate(); // Add this
  const [role, setRole] = useState("patient");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login(role);
    
    // Add navigation here
    if (role === "patient") {
      navigate("/dashboard");
    } else {
      navigate("/practitioner");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.header}>
          <div className={styles.ayurvedicIcon}>🌿</div>
          <h1 className={styles.title}>Ayursutra</h1>
          <p className={styles.subtitle}>Your journey to mental wellness begins here</p>
        </div>
        
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Username</label>
            <input
              type="text"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className={styles.roleSelector}>
            <label className={styles.roleLabel}>I am a:</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className={styles.select}
            >
              <option value="patient">Patient</option>
              <option value="practitioner">Ayurvedic Practitioner</option>
            </select>
          </div>

          <button type="submit" className={styles.loginButton}>
            Begin Wellness Journey
          </button>
        </form>
      </div>
    </div>
  );
}