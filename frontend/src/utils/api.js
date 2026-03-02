import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email, password, role) =>
    api.post("/auth/login", { email, password, role }),
  register: (email, password, name) =>
    api.post("/auth/register", { email, password, name, role: "student" }),
};

export const eventAPI = {
  getApprovedEvents: () => api.get("/events/approved"),
  getEventById: (id) => api.get(`/events/${id}`),
  createEvent: (data) => api.post("/events", data),
  getOrganizerEvents: () => api.get("/events/organizer/events"),
  updateEvent: (id, data) => api.put(`/events/${id}`, data),
  deleteEvent: (id) => api.delete(`/events/${id}`),
  getAllEvents: () => api.get("/events/admin/all"),
  approveEvent: (id) => api.put(`/events/${id}/approve`),
  rejectEvent: (id, reason) => api.put(`/events/${id}/reject`, { reason }),
  registerForEvent: (eventId) => api.post("/events/register", { eventId }),
  unregisterFromEvent: (eventId) => api.post("/events/unregister", { eventId }),
  getStudentRegistrations: () => api.get("/events/student/registrations"),
};

export default api;
