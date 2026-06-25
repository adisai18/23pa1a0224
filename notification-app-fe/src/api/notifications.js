const API_BASE = "http://4.224.186.213/evaluation-service";

const ACCESS_TOKEN =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM3BhMWEwMjI0QGdtYWlsLmNvbSIsImV4cCI6MTc4MjM4MDgyNCwiaWF0IjoxNzgyMzc5OTI0LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZWRlMWM1ZDMtNmM4NC00YjU2LWFkN2ItNDJhNjY5MzgxNDhjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWRpc2FpIGd1bmRhIiwic3ViIjoiMjMwMzE1NTgtZWNlZi00NzhmLTgyNjgtZDA3Zjg4YTRkY2E0In0sImVtYWlsIjoiMjNwYTFhMDIyNEBnbWFpbC5jb20iLCJuYW1lIjoiYWRpc2FpIGd1bmRhIiwicm9sbE5vIjoiMjNwYTFhMDIyNCIsImFjY2Vzc0NvZGUiOiJhaFhqdnAiLCJjbGllbnRJRCI6IjIzMDMxNTU4LWVjZWYtNDc4Zi04MjY4LWQwN2Y4OGE0ZGNhNCIsImNsaWVudFNlY3JldCI6IkRKckN6ZXZDRG1GUWpHdkgifQ.YntsfGVHW84TN65vZNtCdDqAUPJeAXm-ZOHxsBfH4ck";

export async function fetchNotifications(notificationType = "", page = 1, limit = 10) {
  let url = `${API_BASE}/notifications?page=${page}&limit=${limit}`;

  if (notificationType) {
    url += `&notification_type=${encodeURIComponent(notificationType)}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return await response.json();
}