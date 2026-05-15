package com.everglow.backend.payments;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST Controller exposing /api/payments endpoints.
 * Kept deliberately thin — all logic delegates to PaymentService.
 *
 * Endpoints:
 *   GET    /api/payments                      → get all
 *   GET    /api/payments/{id}                 → get one
 *   GET    /api/payments/transaction/{txId}   → get by transaction ID
 *   GET    /api/payments/search?keyword=      → search
 *   GET    /api/payments/status/{status}      → filter by status
 *   GET    /api/payments/method/{method}      → filter by method
 *   GET    /api/payments/property/{id}        → filter by property
 *   GET    /api/payments/revenue              → total revenue
 *   POST   /api/payments                      → create
 *   PUT    /api/payments/{id}                 → update
 *   DELETE /api/payments/{id}                 → delete
 */
@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping
    public ResponseEntity<List<PaymentDTO>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentDTO> getPaymentById(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.getPaymentById(id));
    }

    @GetMapping("/transaction/{transactionId}")
    public ResponseEntity<PaymentDTO> getByTransactionId(@PathVariable String transactionId) {
        return ResponseEntity.ok(paymentService.getPaymentByTransactionId(transactionId));
    }

    @GetMapping("/search")
    public ResponseEntity<List<PaymentDTO>> searchPayments(@RequestParam String keyword) {
        return ResponseEntity.ok(paymentService.searchPayments(keyword));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<PaymentDTO>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(paymentService.getPaymentsByStatus(status));
    }

    @GetMapping("/method/{method}")
    public ResponseEntity<List<PaymentDTO>> getByMethod(@PathVariable String method) {
        return ResponseEntity.ok(paymentService.getPaymentsByMethod(method));
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<PaymentDTO>> getByProperty(@PathVariable Long propertyId) {
        return ResponseEntity.ok(paymentService.getPaymentsByProperty(propertyId));
    }

    @GetMapping("/revenue")
    public ResponseEntity<Map<String, Double>> getTotalRevenue() {
        return ResponseEntity.ok(Map.of("totalRevenue", paymentService.getTotalRevenue()));
    }

    @PostMapping
    public ResponseEntity<PaymentDTO> createPayment(@Valid @RequestBody PaymentDTO dto) {
        PaymentDTO created = paymentService.createPayment(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaymentDTO> updatePayment(
            @PathVariable Long id,
            @Valid @RequestBody PaymentDTO dto) {
        return ResponseEntity.ok(paymentService.updatePayment(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }
}
