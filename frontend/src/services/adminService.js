// src/services/adminService.js
// All HTTP calls to the Spring Boot /api/admin/admins endpoints.
// NOTE: This merges with or replaces your existing adminService.js

const BASE_URL  = import.meta.env.VITE_API_URL || "http://localhost:8080";
const ADMINS_URL = `${BASE_URL}/api/admin/admins`;

// ─── Helper: build headers ────────────────────────────────────────────────────
const jsonHeaders = () => ({
  "Content-Type": "application/json",
  // Uncomment when JWT auth is added:
  // "Authorization": `Bearer ${localStorage.getItem("token")}`,
});

// ─── Helper: unified response handler ────────────────────────────────────────
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(
      errorBody.error || errorBody.message || `HTTP error ${res.status}`
    );
  }
  if (res.status === 204) return null; // DELETE returns no body
  return res.json();
};

// ─── ADMIN MANAGEMENT API ─────────────────────────────────────────────────────

/** GET /api/admin/admins */
export const getAllAdmins = async () => {
  const res = await fetch(ADMINS_URL, { headers: jsonHeaders() });
  return handleResponse(res);
};

/** GET /api/admin/admins/:id */
export const getAdminById = async (id) => {
  const res = await fetch(`${ADMINS_URL}/${id}`, { headers: jsonHeaders() });
  return handleResponse(res);
};

/** GET /api/admin/admins/search?keyword= */
export const searchAdmins = async (keyword) => {
  const res = await fetch(
    `${ADMINS_URL}/search?keyword=${encodeURIComponent(keyword)}`,
    { headers: jsonHeaders() }
  );
  return handleResponse(res);
};

/** GET /api/admin/admins/role/:role */
export const getAdminsByRole = async (role) => {
  const res = await fetch(`${ADMINS_URL}/role/${role}`, { headers: jsonHeaders() });
  return handleResponse(res);
};

/** GET /api/admin/admins/status/:status */
export const getAdminsByStatus = async (status) => {
  const res = await fetch(`${ADMINS_URL}/status/${status}`, { headers: jsonHeaders() });
  return handleResponse(res);
};

/** POST /api/admin/admins */
export const createAdmin = async (adminData) => {
  const res = await fetch(ADMINS_URL, {
    method:  "POST",
    headers: jsonHeaders(),
    body:    JSON.stringify(adminData),
  });
  return handleResponse(res);
};

/** PUT /api/admin/admins/:id */
export const updateAdmin = async (id, adminData) => {
  const res = await fetch(`${ADMINS_URL}/${id}`, {
    method:  "PUT",
    headers: jsonHeaders(),
    body:    JSON.stringify(adminData),
  });
  return handleResponse(res);
};

/** DELETE /api/admin/admins/:id */
export const deleteAdmin = async (id) => {
  const res = await fetch(`${ADMINS_URL}/${id}`, {
    method:  "DELETE",
    headers: jsonHeaders(),
  });
  return handleResponse(res);
};
