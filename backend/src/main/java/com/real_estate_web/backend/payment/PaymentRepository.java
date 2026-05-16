package com.everglow.backend.payments;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository layer — Spring Data JPA handles all SQL generation.
 */
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByTransactionId(String transactionId);

    boolean existsByTransactionId(String transactionId);

    List<Payment> findByStatus(String status);

    List<Payment> findByPaymentMethod(String paymentMethod);

    List<Payment> findByPropertyId(Long propertyId);

    List<Payment> findByPayerEmail(String payerEmail);

    /** Search by payer name, email, transaction ID, or property title */
    @Query("SELECT p FROM Payment p WHERE " +
           "LOWER(p.payerName)     LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.payerEmail)    LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.transactionId) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.propertyTitle) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Payment> searchPayments(@Param("keyword") String keyword);

    /** Total revenue from completed payments */
    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE p.status = 'COMPLETED'")
    Double getTotalRevenue();
}
