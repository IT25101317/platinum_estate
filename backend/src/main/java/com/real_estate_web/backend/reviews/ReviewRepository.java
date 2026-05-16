package com.real_estate_web.backend.reviews;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Find all reviews for a specific property
    List<Review> findByPropertyId(Long propertyId);

    // Find all reviews by a specific user
    List<Review> findByUserId(Long userId);

    // Find reviews by rating
    List<Review> findByRating(int rating);

    // Find reviews by property ordered by newest first
    List<Review> findByPropertyIdOrderByCreatedAtDesc(Long propertyId);

    // Average rating for a property
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.propertyId = :propertyId")
    Double findAverageRatingByPropertyId(Long propertyId);

    // Count reviews for a property
    long countByPropertyId(Long propertyId);
}
