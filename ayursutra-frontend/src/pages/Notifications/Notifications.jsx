import React, { useState } from "react";
import styles from "./Notifications.module.css";

const notifications = [
  { 
    type: "Pre", 
    message: "Avoid heavy meals 12 hours before therapy", 
    id: 1,
    time: "2 hours ago",
    icon: "⏰"
  },
  { 
    type: "Pre", 
    message: "Hydrate well and arrive 15 minutes early", 
    id: 2,
    time: "1 day ago",
    icon: "💧"
  },
  { 
    type: "Post", 
    message: "Drink warm water and rest for 2 hours after session", 
    id: 3,
    time: "3 days ago",
    icon: "🧘‍♀️"
  },
  { 
    type: "Post", 
    message: "Follow the dietary recommendations provided by your practitioner", 
    id: 4,
    time: "1 week ago",
    icon: "🍃"
  },
  { 
    type: "General", 
    message: "Your wellness journal entry is due tomorrow", 
    id: 5,
    time: "2 days ago",
    icon: "📔"
  }
];

export default function Notifications() {
  const [filter, setFilter] = useState("All");
  const [readNotifications, setReadNotifications] = useState(new Set());

  const markAsRead = (id) => {
    setReadNotifications(prev => new Set(prev).add(id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "All") return true;
    if (filter === "Pre") return notification.type === "Pre";
    if (filter === "Post") return notification.type === "Post";
    if (filter === "General") return notification.type === "General";
    return true;
  });

  const getNotificationClass = (type) => {
    switch (type) {
      case "Pre": return styles.notificationPre;
      case "Post": return styles.notificationPost;
      default: return styles.notificationGeneral;
    }
  };

  const getTypeClass = (type) => {
    switch (type) {
      case "Pre": return styles.notificationTypePre;
      case "Post": return styles.notificationTypePost;
      default: return styles.notificationTypeGeneral;
    }
  };

  return (
    <div className={styles.notificationsPage}>
      <h1 className={styles.pageTitle}>Wellness Notifications</h1>

      <div className={styles.notificationsCard}>
        <div className={styles.notificationsHeader}>
          <div className={styles.headerIcon}>🔔</div>
          <div>
            <h2 className={styles.headerTitle}>Important Reminders</h2>
            <p className={styles.headerSubtitle}>
              Stay updated with pre and post-therapy instructions for optimal results
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterTabs}>
          {["All", "Pre", "Post", "General"].map((tab) => (
            <button
              key={tab}
              className={`${styles.filterTab} ${filter === tab ? styles.filterTabActive : ''}`}
              onClick={() => setFilter(tab)}
            >
              {tab}-Procedure
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className={styles.notificationsList}>
          {filteredNotifications.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📭</div>
              <h3 className={styles.emptyTitle}>No notifications</h3>
              <p className={styles.emptyText}>
                {filter === "All" 
                  ? "You're all caught up! Check back later for new updates."
                  : `No ${filter.toLowerCase()}-procedure notifications at the moment.`
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`${styles.notificationItem} ${getNotificationClass(notification.type)} ${
                  readNotifications.has(notification.id) ? styles.notificationRead : ''
                }`}
              >
                <div className={styles.notificationIcon}>
                  {notification.icon}
                </div>
                <div className={styles.notificationContent}>
                  <span className={`${styles.notificationType} ${getTypeClass(notification.type)}`}>
                    {notification.type}-Procedure
                  </span>
                  <p className={styles.notificationMessage}>
                    {notification.message}
                  </p>
                  <div className={styles.notificationTime}>
                    <span>⏱</span>
                    {notification.time}
                  </div>
                  {!readNotifications.has(notification.id) && (
                    <button 
                      className={styles.readButton}
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}