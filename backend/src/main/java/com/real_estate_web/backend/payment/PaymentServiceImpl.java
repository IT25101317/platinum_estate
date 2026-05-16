package com.real_estate_web.backend.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Concrete implementation of PaymentService.
 * All business logic lives here — controller stays thin.
 * Custom exceptions encapsulated as inner classes (OOP).
 */
@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    @Autowired
    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    // ─── READ: all payments ────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public List<PaymentDTO> getAllPayments() {
        return paymentRepository.findAll()
                .stream()
                .map(PaymentDTO::new)
                .collect(Collectors.toList());
    }

    // ─── READ: single payment by ID ────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public PaymentDTO getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found with id: " + id));
        return new PaymentDTO(payment);
    }

    // ─── READ: single payment by transaction ID ────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public PaymentDTO getPaymentByTransactionId(String transactionId) {
        Payment payment = paymentRepository.findByTransactionId(transactionId)
                .orElseThrow(() -> new PaymentNotFoundException(
                        "Payment not found with transaction ID: " + transactionId));
        return new PaymentDTO(payment);
    }

    // ─── CREATE ────────────────────────────────────────────────────────────────

    @Override
    public PaymentDTO createPayment(PaymentDTO dto) {
        // Auto-generate transaction ID if not provided
        String txId = (dto.getTransactionId() != null && !dto.getTransactionId().isBlank())
                ? dto.getTransactionId()
                : "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        if (paymentRepository.existsByTransactionId(txId)) {
            throw new PaymentAlreadyExistsException(
                    "Transaction ID already exists: " + txId);
        }

        Payment payment = new Payment(
                txId,
                dto.getAmount(),
                dto.getCurrency() != null ? dto.getCurrency() : "LKR",
                dto.getPaymentMethod(),
                dto.getStatus() != null ? dto.getStatus() : "PENDING",
                dto.getPayerName(),
                dto.getPayerEmail(),
                dto.getPropertyId(),
                dto.getPropertyTitle(),
                dto.getDescription()
        );

        Payment saved = paymentRepository.save(payment);
        return new PaymentDTO(saved);
    }

    // ─── UPDATE ────────────────────────────────────────────────────────────────

    @Override
    public PaymentDTO updatePayment(Long id, PaymentDTO dto) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found with id: " + id));

        // Allow transaction ID change only if not taken by another record
        if (!payment.getTransactionId().equals(dto.getTransactionId()) &&
             paymentRepository.existsByTransactionId(dto.getTransactionId())) {
            throw new PaymentAlreadyExistsException(
                    "Transaction ID already in use: " + dto.getTransactionId());
        }

        payment.setTransactionId(dto.getTransactionId());
        payment.setAmount(dto.getAmount());
        payment.setCurrency(dto.getCurrency());
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setStatus(dto.getStatus());
        payment.setPayerName(dto.getPayerName());
        payment.setPayerEmail(dto.getPayerEmail());
        payment.setPropertyId(dto.getPropertyId());
        payment.setPropertyTitle(dto.getPropertyTitle());
        payment.setDescription(dto.getDescription());

        Payment updated = paymentRepository.save(payment);
        return new PaymentDTO(updated);
    }

    // ─── DELETE ────────────────────────────────────────────────────────────────

    @Override
    public void deletePayment(Long id) {
        if (!paymentRepository.existsById(id)) {
            throw new PaymentNotFoundException("Payment not found with id: " + id);
        }
        paymentRepository.deleteById(id);
    }

    // ─── SEARCH ────────────────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public List<PaymentDTO> searchPayments(String keyword) {
        return paymentRepository.searchPayments(keyword)
                .stream()
                .map(PaymentDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentDTO> getPaymentsByStatus(String status) {
        return paymentRepository.findByStatus(status)
                .stream()
                .map(PaymentDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentDTO> getPaymentsByMethod(String method) {
        return paymentRepository.findByPaymentMethod(method)
                .stream()
                .map(PaymentDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentDTO> getPaymentsByProperty(Long propertyId) {
        return paymentRepository.findByPropertyId(propertyId)
                .stream()
                .map(PaymentDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Double getTotalRevenue() {
        return paymentRepository.getTotalRevenue();
    }

    // ─── Encapsulated custom exceptions (OOP) ──────────────────────────────────

    public static class PaymentNotFoundException extends RuntimeException {
        public PaymentNotFoundException(String message) { super(message); }
    }

    public static class PaymentAlreadyExistsException extends RuntimeException {
        public PaymentAlreadyExistsException(String message) { super(message); }
    }
}
