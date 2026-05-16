package com.real_estate_web.backend.reviews;

import java.util.List;

public interface ReviewService {

    ReviewDTO createReview(ReviewDTO dto);

    ReviewDTO getReviewById(Long id);

    List<ReviewDTO> getAllReviews();

    List<ReviewDTO> getReviewsByPropertyId(Long propertyId);

    List<ReviewDTO> getReviewsByUserId(Long userId);

    ReviewDTO updateReview(Long id, ReviewDTO dto);

    void deleteReview(Long id);

    Double getAverageRatingByPropertyId(Long propertyId);

    long getReviewCountByPropertyId(Long propertyId);
}
