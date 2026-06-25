import { useState, useEffect, useCallback } from "react";
import { fetchNotifications } from "../api/notifications";

const TYPE_WEIGHT = { Placement: 3, Result: 2, Event: 1 };

function computeScore(notif) {
  const weight = TYPE_WEIGHT[notif.Type] || 0;
  const epoch = new Date(notif.Timestamp.replace(" ", "T")).getTime();
  return weight * 1e12 + epoch;
}

export function useNotifications({ limit, page, notification_type }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchNotifications({ limit, page, notification_type });
      setNotifications(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [limit, page, notification_type]);

  useEffect(() => { load(); }, [load]);

  return { notifications, loading, error, refetch: load };
}

export function usePriorityNotifications({ topN = 10, notification_type = "" }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchNotifications({ limit: 100, page: 1 });
        const filtered = notification_type
          ? data.filter((n) => n.Type === notification_type)
          : data;
        const sorted = [...filtered].sort((a, b) => computeScore(b) - computeScore(a));
        setNotifications(sorted.slice(0, topN));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [topN, notification_type]);

  return { notifications, loading, error };
}