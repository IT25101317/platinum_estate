// src/services/paymentService.js
// All HTTP calls to the Spring Boot /api/payments endpoints.

const BASE_URL    = import.meta.env.VITE_API_URL || "http://localhost:8080";
const PAYMENTS_URL = `${BASE_URL}/api/payments`;

// ─── Helper: headers ──────────────────────────────────────────────────────────
const jsonHeaders = () => ({
  "Content-Type": "application/json",
  // "Authorization": `Bearer ${localStorage.getItem("token")}`,
});

// ─── Helper: response handler ─────────────────────────────────────────────────
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || errorBody.message || `HTTP error ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
};

// ─── PAYMENT API ──────────────────────────────────────────────────────────────

export const getAllPayments = async () => {
  const res = await fetch(PAYMENTS_URL, { headers: jsonHeaders() });
  return handleResponse(res);
};

export const getPaymentById = async (id) => {
  const res = await fetch(`${PAYMENTS_URL}/${id}`, { headers: jsonHeaders() });
  return handleResponse(res);
};

export const searchPayments = async (keyword) => {
  const res = await fetch(
    `${PAYMENTS_URL}/search?keyword=${encodeURIComponent(keyword)}`,
    { headers: jsonHeaders() }
  );
  return handleResponse(res);
};

export const getPaymentsByStatus = async (status) => {
  const res = await fetch(`${PAYMENTS_URL}/status/${status}`, { headers: jsonHeaders() });
  return handleResponse(res);
};

export const getPaymentsByMethod = async (method) => {
  const res = await fetch(`${PAYMENTS_URL}/method/${method}`, { headers: jsonHeaders() });
  return handleResponse(res);
};

export const getTotalRevenue = async () => {
  const res = await fetch(`${PAYMENTS_URL}/revenue`, { headers: jsonHeaders() });
  return handleResponse(res);
};

export const createPayment = async (paymentData) => {
  const res = await fetch(PAYMENTS_URL, {
    method:  "POST",
    headers: jsonHeaders(),
    body:    JSON.stringify(paymentData),
  });
  return handleResponse(res);
};

export const updatePayment = async (id, paymentData) => {
  const res = await fetch(`${PAYMENTS_URL}/${id}`, {
    method:  "PUT",
    headers: jsonHeaders(),
    body:    JSON.stringify(paymentData),
  });
  return handleResponse(res);
};

export const deletePayment = async (id) => {
  const res = await fetch(`${PAYMENTS_URL}/${id}`, {
    method:  "DELETE",
    headers: jsonHeaders(),
  });
  return handleResponse(res);
};
