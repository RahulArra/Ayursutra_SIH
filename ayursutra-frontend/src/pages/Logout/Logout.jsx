import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Logout.module.css";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    logout();
    navigate("/auth");
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className={styles.logoutPage}>
      <div className={styles.logoutCard}>
        <div className={styles.logoutIcon}>🔐</div>
        <h1 className={styles.logoutTitle}>Logout</h1>
        <p className={styles.logoutText}>
          Are you sure you want to logout?<br />
          You'll need to login again to access your wellness journey.
        </p>
        <div className={styles.logoutButtons}>
          <button onClick={handleCancel} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleConfirmLogout} className={styles.confirmButton}>
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}