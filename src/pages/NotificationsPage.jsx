import { NotificationCard } from "../components/NotificationCard";
import { useNotifications } from "../hooks/useNotifications";

export function NotificationsPage() {
  const { notifications, loading, error } = useNotifications();

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <p className="stage-label">NOTIFICATIONS</p>
        <h1>Notifications</h1>
        <p className="page-note">Latest 10 notifications from the API.</p>
      </div>

      {!loading && !error && notifications.length > 0 && (
        <div className="notifications-summary">
          <span className="summary-pill">Total: {notifications.length}</span>
          <span className="summary-text">Simple card view from the API response</span>
        </div>
      )}

      {loading && <p className="status-text">Loading notifications...</p>}

      {!loading && error && <p className="status-text error">Failed to load notifications: {error}</p>}

      {!loading && !error && notifications.length === 0 && (
        <p className="status-text info">No notifications found.</p>
      )}

      {!loading && !error && notifications.length > 0 && (
        <div className="notifications-list">
          {notifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
      )}
    </div>
  );
}
