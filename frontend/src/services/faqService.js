// src/services/faqService.js
// Connects React frontend to Spring Boot backend running on port 8080

const BASE_URL = "http://localhost:8080/api/faqs";

// ─── Helper ──────────────────────────────────────────────────────────
const handleResponse = async (res) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
};

// ─── PUBLIC API (for user-facing FAQ page) ───────────────────────────

// Get all active FAQs
export const getActiveFAQs = () =>
  fetch(`${BASE_URL}/public`).then(handleResponse);

// Get active FAQs filtered by category
export const getFAQsByCategory = (category) =>
  fetch(`${BASE_URL}/public/category?name=${encodeURIComponent(category)}`).then(handleResponse);

// Search FAQs by keyword
export const searchFAQs = (keyword) =>
  fetch(`${BASE_URL}/public/search?keyword=${encodeURIComponent(keyword)}`).then(handleResponse);

// Get all category names
export const getCategories = () =>
  fetch(`${BASE_URL}/public/categories`).then(handleResponse);

// ─── ADMIN API (for admin dashboard) ─────────────────────────────────

// Get ALL FAQs including inactive
export const getAllFAQs = () =>
  fetch(`${BASE_URL}/admin`).then(handleResponse);

// Get single FAQ by ID
export const getFAQById = (id) =>
  fetch(`${BASE_URL}/admin/${id}`).then(handleResponse);

// Create new FAQ
export const createFAQ = (faqData) =>
  fetch(`${BASE_URL}/admin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(faqData),
  }).then(handleResponse);

// Update existing FAQ
export const updateFAQ = (id, faqData) =>
  fetch(`${BASE_URL}/admin/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(faqData),
  }).then(handleResponse);

// Toggle active/inactive status
export const toggleFAQStatus = (id) =>
  fetch(`${BASE_URL}/admin/${id}/toggle`, { method: "PATCH" }).then(handleResponse);

// Delete FAQ
export const deleteFAQ = (id) =>
  fetch(`${BASE_URL}/admin/${id}`, { method: "DELETE" }).then(handleResponse);
