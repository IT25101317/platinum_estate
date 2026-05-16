package com.real_estate_web.backend.reviews;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173")   // Vite dev server
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // ─── CREATE ───────────────────────────────────────────────────────────────────

    /**
     * POST /api/reviews
     * Body: { reviewerName, comment, rating, propertyId, userId }
     */
    @PostMapping
    public ResponseEntity<ReviewDTO> createReview(@Valid @RequestBody ReviewDTO dto) {
        ReviewDTO created = reviewService.createReview(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // ─── READ ─────────────────────────────────────────────────────────────────────

    /**
     * GET /api/reviews
     * Returns all reviews
     */
    @GetMapping
    public ResponseEntity<List<ReviewDTO>> getAllReviews() {
        List<ReviewDTO> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }

    /**
     * GET /api/reviews/{id}
     * Returns a single review by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ReviewDTO> getReviewById(@PathVariable Long id) {
        ReviewDTO review = reviewService.getReviewById(id);
        return ResponseEntity.ok(review);
    }

    /**
     * GET /api/reviews/property/{propertyId}
     * Returns all reviews for a given property (newest first)
     */
    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByProperty(@PathVariable Long propertyId) {
        List<ReviewDTO> reviews = reviewService.getReviewsByPropertyId(propertyId);
        return ResponseEntity.ok(reviews);
    }

    /**
     * GET /api/reviews/user/{userId}
     * Returns all reviews by a given user
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByUser(@PathVariable Long userId) {
        List<ReviewDTO> reviews = reviewService.getReviewsByUserId(userId);
        return ResponseEntity.ok(reviews);
    }

    /**
     * GET /api/reviews/property/{propertyId}/stats
     * Returns average rating and count for a property
     */
    @GetMapping("/property/{propertyId}/stats")
    public ResponseEntity<Map<String, Object>> getPropertyReviewStats(@PathVariable Long propertyId) {
        Map<String, Object> stats = new HashMap<>();
        stats.put("averageRating", reviewService.getAverageRatingByPropertyId(propertyId));
        stats.put("totalReviews", reviewService.getReviewCountByPropertyId(propertyId));
        return ResponseEntity.ok(stats);
    }

    // ─── UPDATE ───────────────────────────────────────────────────────────────────

    /**
     * PUT /api/reviews/{id}
     * Body: { reviewerName, comment, rating }
     */
    @PutMapping("/{id}")
    public ResponseEntity<ReviewDTO> updateReview(
            @PathVariable Long id,
            @Valid @RequestBody ReviewDTO dto) {
        ReviewDTO updated = reviewService.updateReview(id, dto);
        return ResponseEntity.ok(updated);
    }

    // ─── DELETE ───────────────────────────────────────────────────────────────────

    /**
     * DELETE /api/reviews/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Review deleted successfully");
        return ResponseEntity.ok(response);
    }

    // ─── Exception Handler ────────────────────────────────────────────────────────

    @ExceptionHandler(ReviewNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleNotFound(ReviewNotFoundException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}
