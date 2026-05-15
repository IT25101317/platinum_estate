package com.everglow.backend.bookings;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * BookingController - REST API layer.
 * Exposes all booking endpoints consumed by the React frontend.
 *
 * Base URL: http://localhost:8080/api/bookings
 */
@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173") // Vite dev server
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // ─── CREATE ───────────────────────────────────────────────────────────────
    // POST /api/bookings
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingDTO dto) {
        try {
            BookingDTO created = bookingService.createBooking(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ─── READ ALL ─────────────────────────────────────────────────────────────
    // GET /api/bookings
    @GetMapping
    public ResponseEntity<List<BookingDTO>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    // ─── READ ONE ─────────────────────────────────────────────────────────────
    // GET /api/bookings/{id}
    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(bookingService.getBookingById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", e.getMessage()));
        }
    }

    // ─── READ BY USER ─────────────────────────────────────────────────────────
    // GET /api/bookings/user/{userId}
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingDTO>> getBookingsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUser(userId));
    }

    // ─── READ BY PROPERTY ────────────────────────────────────────────────────
    // GET /api/bookings/property/{propertyId}
    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<BookingDTO>> getBookingsByProperty(@PathVariable Long propertyId) {
        return ResponseEntity.ok(bookingService.getBookingsByProperty(propertyId));
    }

    // ─── UPDATE ───────────────────────────────────────────────────────────────
    // PUT /api/bookings/{id}
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBooking(@PathVariable Long id, @RequestBody BookingDTO dto) {
        try {
            return ResponseEntity.ok(bookingService.updateBooking(id, dto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ─── UPDATE STATUS ────────────────────────────────────────────────────────
    // PATCH /api/bookings/{id}/status
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        try {
            String status = body.get("status");
            return ResponseEntity.ok(bookingService.updateBookingStatus(id, status));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ─── DELETE ───────────────────────────────────────────────────────────────
    // DELETE /api/bookings/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        try {
            bookingService.deleteBooking(id);
            return ResponseEntity.ok(Map.of("message", "Booking deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", e.getMessage()));
        }
    }
}
