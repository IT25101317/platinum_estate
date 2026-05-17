// frontend/src/services/reviewService.js
// Handles all HTTP communication with the Spring Boot reviews API

const BASE_URL = 'http://localhost:8080/api/reviews'

// ─── Helper ───────────────────────────────────────────────────────────────────

async function handleResponse(res) {
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong')
  }
  return data
}

// ─── CREATE ───────────────────────────────────────────────────────────────────

/**
 * POST /api/reviews
 * @param {{ reviewerName, comment, rating, propertyId, userId }} reviewData
 */
export async function createReview(reviewData) {
  const res = await fetch(BASE_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(reviewData),
  })
  return handleResponse(res)
}

// ─── READ ALL ─────────────────────────────────────────────────────────────────

/**
 * GET /api/reviews
 */
export async function getAllReviews() {
  const res = await fetch(BASE_URL)
  return handleResponse(res)
}

// ─── READ ONE ─────────────────────────────────────────────────────────────────

/**
 * GET /api/reviews/{id}
 */
export async function getReviewById(id) {
  const res = await fetch(`${BASE_URL}/${id}`)
  return handleResponse(res)
}

// ─── READ BY PROPERTY ────────────────────────────────────────────────────────

/**
 * GET /api/reviews/property/{propertyId}
 */
export async function getReviewsByProperty(propertyId) {
  const res = await fetch(`${BASE_URL}/property/${propertyId}`)
  return handleResponse(res)
}

// ─── READ BY USER ─────────────────────────────────────────────────────────────

/**
 * GET /api/reviews/user/{userId}
 */
export async function getReviewsByUser(userId) {
  const res = await fetch(`${BASE_URL}/user/${userId}`)
  return handleResponse(res)
}

// ─── PROPERTY STATS ───────────────────────────────────────────────────────────

/**
 * GET /api/reviews/property/{propertyId}/stats
 * Returns { averageRating, totalReviews }
 */
export async function getPropertyReviewStats(propertyId) {
  const res = await fetch(`${BASE_URL}/property/${propertyId}/stats`)
  return handleResponse(res)
}

// ─── UPDATE ───────────────────────────────────────────────────────────────────

/**
 * PUT /api/reviews/{id}
 * @param {number} id
 * @param {{ reviewerName, comment, rating }} reviewData
 */
export async function updateReview(id, reviewData) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method:  'PUT',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(reviewData),
  })
  return handleResponse(res)
}

// ─── DELETE ───────────────────────────────────────────────────────────────────

/**
 * DELETE /api/reviews/{id}
 */
export async function deleteReview(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
  return handleResponse(res)
}
