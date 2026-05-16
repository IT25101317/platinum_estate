// frontend/src/services/bookingService.js
// Handles all HTTP communication with the Spring Boot booking API

const BASE_URL = 'http://localhost:8080/api/bookings'

// ─── Helper ───────────────────────────────────────────────────────────────────

async function handleResponse(res) {
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong')
  }
  return data
}

// ─── CREATE ───────────────────────────────────────────────────────────────────

export async function createBooking(bookingData) {
  const res = await fetch(BASE_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(bookingData),
  })
  return handleResponse(res)
}

// ─── READ ALL ─────────────────────────────────────────────────────────────────

export async function getAllBookings() {
  const res = await fetch(BASE_URL)
  return handleResponse(res)
}

// ─── READ ONE ─────────────────────────────────────────────────────────────────

export async function getBookingById(id) {
  const res = await fetch(`${BASE_URL}/${id}`)
  return handleResponse(res)
}

// ─── READ BY USER ─────────────────────────────────────────────────────────────

export async function getBookingsByUser(userId) {
  const res = await fetch(`${BASE_URL}/user/${userId}`)
  return handleResponse(res)
}

// ─── READ BY PROPERTY ────────────────────────────────────────────────────────

export async function getBookingsByProperty(propertyId) {
  const res = await fetch(`${BASE_URL}/property/${propertyId}`)
  return handleResponse(res)
}

// ─── UPDATE ───────────────────────────────────────────────────────────────────

export async function updateBooking(id, bookingData) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method:  'PUT',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(bookingData),
  })
  return handleResponse(res)
}

// ─── UPDATE STATUS ────────────────────────────────────────────────────────────

export async function updateBookingStatus(id, status) {
  const res = await fetch(`${BASE_URL}/${id}/status`, {
    method:  'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ status }),
  })
  return handleResponse(res)
}

// ─── DELETE ───────────────────────────────────────────────────────────────────

export async function deleteBooking(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
  return handleResponse(res)
}
