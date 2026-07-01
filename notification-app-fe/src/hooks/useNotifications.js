import { useEffect, useState } from "react";
import { fetchNotifications } from "../api/notifications";

export function useNotifications() {
  const [state, setState] = useState({
    notifications: [],
    loading: true,
    error: "",
  });

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

  return state;
}
