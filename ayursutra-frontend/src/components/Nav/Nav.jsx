import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Nav.module.css";

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, userRole } = useAuth();
  
  // Filter links based on user role
  const patientLinks = [
    { path: "/dashboard", label: "Dashboard", icon: "🏠" },
    { path: "/notifications", label: "Reminders", icon: "🔔" },
    { path: "/feedback", label: "Feedback", icon: "💭" },
    { path: "/progress", label: "Progress", icon: "📊" },
  ];

  const practitionerLinks = [
    { path: "/practitioner", label: "Dashboard", icon: "🏠" },
    { path: "/patients", label: "Patients", icon: "👥" },
    { path: "/schedule", label: "Schedule", icon: "📅" },
  ];

  const links = userRole === "practitioner" ? practitionerLinks : patientLinks;

  const handleLogout = () => {
    // Optional: Add confirmation dialog
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/auth");
    }
  };

  const getWelcomeText = () => {
    return userRole === "practitioner" ? "👨‍⚕️ Practitioner" : "👤 Student";
  };

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link to={userRole === "practitioner" ? "/practitioner" : "/dashboard"} className={styles.logo}>
          <span className={styles.logoIcon}>🌿</span>
          <span className={styles.logoText}>Ayursutra</span>
        </Link>

        {/* Navigation Links */}
        <nav className={styles.nav}>
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${styles.navLink} ${
                location.pathname === link.path ? styles.active : ""
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* User Section with Logout */}
        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            <span className={styles.userRole}>{getWelcomeText()}</span>
          </div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <span>🚪</span>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}