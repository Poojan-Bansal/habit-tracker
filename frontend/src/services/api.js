const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getToken() {
  return localStorage.getItem("authToken");
}

async function call(endpoint, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `API error: ${method} ${endpoint}`);
  }

  return res.json().catch(() => null);
}

// ✅ Updated paths to match backend: "/api/auth/*"
export const auth = {
  signup: (data) => call("/api/auth/signup", { method: "POST", body: data }),
  login:  (data) => call("/api/auth/login",  { method: "POST", body: data }),
  logout: () => { localStorage.removeItem("authToken"); },
};

// ✅ Habit routes already correctly point to /api/habits
export const habits = {
  list:     () => call("/api/habits", { auth: true }),
  create:   (data) => call("/api/habits", { method: "POST", body: data, auth: true }),
  complete: (id) => call(`/api/habits/${id}/complete`, { method: "PATCH", auth: true }),
  delete:   (id) => call(`/api/habits/${id}`, { method: "DELETE", auth: true }),
};
