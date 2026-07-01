export function NotificationCard({ notification }) {
  return (
    <div className="notification-card">
      <div className="notification-top">
        <h2>{notification.type}</h2>
        <span className="notification-type">{notification.type}</span>
      </div>

      <p className="notification-message">{notification.message}</p>

      <div className="notification-meta">
        <span className="notification-id">ID: {notification.id}</span>
        <span className="notification-time">{notification.timestamp}</span>
      </div>
    </div>
  );
}