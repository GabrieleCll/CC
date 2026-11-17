const API_BASE = "https://cc-web-service-9c1f.onrender.com";

export const EMAIL_ENDPOINT = `${API_BASE}/api/notify`;
export const HEALTH_CHECK = `${API_BASE}/healthz`;

export type NotifyPayload = {
  product: string;
  email: string;
  name?: string;
  phone?: string;
  company?: string;
  message: string;
};

export const sendNotify = (payload: NotifyPayload) =>
  fetch(EMAIL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

// The Render instance sleeps when idle: ping it on page load so the first form submit is fast.
export const warmUpApi = () => {
  fetch(HEALTH_CHECK, { method: "GET", mode: "no-cors", cache: "no-store", keepalive: true }).catch(() => {});
};
