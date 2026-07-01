const defaultApiUrl = "/api/notifications";

function normalizeNotification(notification) {
  return {
    id: notification.ID,
    type: notification.Type,
    message: notification.Message,
    timestamp: notification.Timestamp,
  };
}

export async function fetchNotifications() {
  const token = import.meta.env.VITE_NOTIFICATIONS_TOKEN;
  const apiUrl = import.meta.env.VITE_NOTIFICATIONS_API_URL || defaultApiUrl;

  const response = await fetch(apiUrl, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!response.ok) {
    throw new Error(`Failed to load notifications (${response.status})`);
  }

  const data = await response.json();
  const notifications = Array.isArray(data.notifications) ? data.notifications : [];

  return {
    notifications: notifications.map(normalizeNotification),
  };
}
