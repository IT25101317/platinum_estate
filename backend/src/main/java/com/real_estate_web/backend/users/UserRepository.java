package com.real_estate_web.backend.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Check if email already exists (for validation)
    boolean existsByEmail(String email);

    // Find user by email
    Optional<User> findByEmail(String email);

    // Check if email exists for a different user (for update validation)
    boolean existsByEmailAndIdNot(String email, Long id);
}
