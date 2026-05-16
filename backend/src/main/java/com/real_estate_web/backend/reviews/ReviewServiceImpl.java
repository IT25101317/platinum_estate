package com.real_estate_web.backend.reviews;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    // ─── Mapper Helpers ───────────────────────────────────────────────────────────

    private ReviewDTO mapToDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setReviewerName(review.getReviewerName());
        dto.setComment(review.getComment());
        dto.setRating(review.getRating());
        dto.setPropertyId(review.getPropertyId());
        dto.setUserId(review.getUserId());
        dto.setCreatedAt(review.getCreatedAt() != null ? review.getCreatedAt().toString() : null);
        dto.setUpdatedAt(review.getUpdatedAt() != null ? review.getUpdatedAt().toString() : null);
        return dto;
    }

    private Review mapToEntity(ReviewDTO dto) {
        Review review = new Review();
        review.setReviewerName(dto.getReviewerName());
        review.setComment(dto.getComment());
        review.setRating(dto.getRating());
        review.setPropertyId(dto.getPropertyId());
        review.setUserId(dto.getUserId());
        return review;
    }

    // ─── CREATE ───────────────────────────────────────────────────────────────────

    @Override
    public ReviewDTO createReview(ReviewDTO dto) {
        Review review = mapToEntity(dto);
        Review saved = reviewRepository.save(review);
        return mapToDTO(saved);
    }

    // ─── READ ─────────────────────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public ReviewDTO getReviewById(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ReviewNotFoundException("Review not found with id: " + id));
        return mapToDTO(review);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewDTO> getAllReviews() {
        return reviewRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewDTO> getReviewsByPropertyId(Long propertyId) {
        return reviewRepository.findByPropertyIdOrderByCreatedAtDesc(propertyId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewDTO> getReviewsByUserId(Long userId) {
        return reviewRepository.findByUserId(userId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ─── UPDATE ───────────────────────────────────────────────────────────────────

    @Override
    public ReviewDTO updateReview(Long id, ReviewDTO dto) {
        Review existing = reviewRepository.findById(id)
                .orElseThrow(() -> new ReviewNotFoundException("Review not found with id: " + id));

        existing.setReviewerName(dto.getReviewerName());
        existing.setComment(dto.getComment());
        existing.setRating(dto.getRating());
        // propertyId and userId are intentionally not updated to preserve ownership

        Review updated = reviewRepository.save(existing);
        return mapToDTO(updated);
    }

    // ─── DELETE ───────────────────────────────────────────────────────────────────

    @Override
    public void deleteReview(Long id) {
        if (!reviewRepository.existsById(id)) {
            throw new ReviewNotFoundException("Review not found with id: " + id);
        }
        reviewRepository.deleteById(id);
    }

    // ─── AGGREGATES ───────────────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public Double getAverageRatingByPropertyId(Long propertyId) {
        Double avg = reviewRepository.findAverageRatingByPropertyId(propertyId);
        return avg != null ? avg : 0.0;
    }

    @Override
    @Transactional(readOnly = true)
    public long getReviewCountByPropertyId(Long propertyId) {
        return reviewRepository.countByPropertyId(propertyId);
    }
}
