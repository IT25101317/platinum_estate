package com.everglow.backend.bookings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * BookingRepository - Data access layer for Booking entity.
 * Spring Data JPA auto-implements all standard CRUD methods.
 */
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Find all bookings for a specific user
    List<Booking> findByUserId(Long userId);

    // Find all bookings for a specific property
    List<Booking> findByPropertyId(Long propertyId);

    // Find bookings by status
    List<Booking> findByStatus(Booking.BookingStatus status);

    // Find bookings by user email
    List<Booking> findByUserEmail(String userEmail);

    // Check for overlapping bookings on a property (to prevent double booking)
    @Query("""
        SELECT b FROM Booking b
        WHERE b.propertyId = :propertyId
          AND b.status <> 'CANCELLED'
          AND b.checkInDate < :checkOut
          AND b.checkOutDate > :checkIn
    """)
    List<Booking> findOverlappingBookings(
        @Param("propertyId") Long propertyId,
        @Param("checkIn")    LocalDate checkIn,
        @Param("checkOut")   LocalDate checkOut
    );
}
