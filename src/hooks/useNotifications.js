import { useEffect, useState } from "react";
import { fetchNotifications } from "../api/notifications";

const viewedStorageKey = "notification-app-viewed-ids";

function readViewedIds() {
  try {
    const savedValue = localStorage.getItem(viewedStorageKey);
    return savedValue ? JSON.parse(savedValue) : [];
  } catch {
    return [];
  }
}

function writeViewedIds(viewedIds) {
  try {
    localStorage.setItem(viewedStorageKey, JSON.stringify(viewedIds));
  } catch {
    // Ignore storage errors and keep the app working.
  }
}

export function useNotifications() {
  const [state, setState] = useState({
    notifications: [],
    loading: true,
    error: "",
  });
  const [viewedIds, setViewedIds] = useState(() => readViewedIds());

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      setState((currentState) => ({ ...currentState, loading: true, error: "" }));

      try {
        const data = await fetchNotifications();

        if (isActive) {
          setState({
            notifications: data.notifications ?? [],
            loading: false,
            error: "",
          });
        }
      } catch (err) {
        if (isActive) {
          setState({
            notifications: [],
            loading: false,
            error: err instanceof Error ? err.message : "Unable to load notifications",
          });
        }
      }
    };

    load();
    return () => {
      isActive = false;
    };
  }, []);

  function markAsViewed(notificationId) {
    setViewedIds((currentViewedIds) => {
      if (currentViewedIds.includes(notificationId)) {
        return currentViewedIds;
      }

      const nextViewedIds = [...currentViewedIds, notificationId];
      writeViewedIds(nextViewedIds);
      return nextViewedIds;
    });
  }

  const notifications = state.notifications.map((notification) => ({
    ...notification,
    isViewed: viewedIds.includes(notification.id),
  }));

  return {
    notifications,
    loading: state.loading,
    error: state.error,
    markAsViewed,
  };
}
