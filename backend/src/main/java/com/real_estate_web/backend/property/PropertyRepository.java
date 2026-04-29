package com.everglow.backend.property;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    // Find all available properties
    List<Property> findByAvailableTrue();

    // Find by property type
    List<Property> findByPropertyType(PropertyType propertyType);

    // Find by location (case-insensitive)
    List<Property> findByLocationContainingIgnoreCase(String location);

    // Find by price range
    List<Property> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);

    // Custom query: search by keyword in title or description
    @Query("SELECT p FROM Property p WHERE " +
           "LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.location) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Property> searchByKeyword(@Param("keyword") String keyword);

    // Find by availability and type
    List<Property> findByAvailableTrueAndPropertyType(PropertyType propertyType);
}
