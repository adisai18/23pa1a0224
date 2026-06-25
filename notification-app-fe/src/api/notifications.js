const API_BASE = "http://4.224.186.213/evaluation-service/notifications";

export async function fetchNotifications({ limit = 10, page = 1, notification_type = "" } = {}) {
  let url = `${API_BASE}?limit=${limit}&page=${page}`;
  if (notification_type) url += `&notification_type=${notification_type}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  const data = await res.json();
  return data.notifications || [];
}