package com.everglow.backend.payments;

import java.util.List;

/**
 * Service contract for Payment CRUD operations.
 * Follows Interface Segregation and Dependency Inversion principles.
 */
public interface PaymentService {

    List<PaymentDTO> getAllPayments();

    PaymentDTO getPaymentById(Long id);

    PaymentDTO getPaymentByTransactionId(String transactionId);

    PaymentDTO createPayment(PaymentDTO dto);

    PaymentDTO updatePayment(Long id, PaymentDTO dto);

    void deletePayment(Long id);

    List<PaymentDTO> searchPayments(String keyword);

    List<PaymentDTO> getPaymentsByStatus(String status);

    List<PaymentDTO> getPaymentsByMethod(String method);

    List<PaymentDTO> getPaymentsByProperty(Long propertyId);

    Double getTotalRevenue();
}
