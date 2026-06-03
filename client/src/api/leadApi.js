import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000"
});

export async function getLeads(params) {
  const response = await api.get("/api/leads", { params });
  return response.data.data;
}

export async function getLead(id) {
  const response = await api.get(`/api/leads/${id}`);
  return response.data.data;
}

export async function createLead(payload) {
  const response = await api.post("/api/leads", payload);
  return response.data.data;
}

export async function updateLead(id, payload) {
  const response = await api.put(`/api/leads/${id}`, payload);
  return response.data.data;
}

export async function deleteLead(id) {
  const response = await api.delete(`/api/leads/${id}`);
  return response.data;
}

export async function getStats() {
  const response = await api.get("/api/leads/stats");
  return response.data.data;
}
