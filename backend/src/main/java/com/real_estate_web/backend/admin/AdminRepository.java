package com.real_estate_web.backend.admin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository layer — Spring Data JPA handles all SQL generation.
 * Custom JPQL queries added for search and filter operations.
 */
@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> findByEmail(String email);

    boolean existsByEmail(String email);

    List<Admin> findByRole(String role);

    List<Admin> findByStatus(String status);

    /** Case-insensitive search across full name and email */
    @Query("SELECT a FROM Admin a WHERE " +
           "LOWER(a.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(a.email)    LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Admin> searchAdmins(@Param("keyword") String keyword);
}
