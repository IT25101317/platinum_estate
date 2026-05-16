package com.real_estate_web.backend.payment;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDateTime;

/**
 * Payment entity — maps to the "payments" table in Neon PostgreSQL.
 * Encapsulates all payment-specific fields with lifecycle hooks.
 */
@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Transaction ID is required")
    @Column(name = "transaction_id", nullable = false, unique = true)
    private String transactionId;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    @Column(nullable = false)
    private Double amount;

    @NotBlank(message = "Currency is required")
    @Column(nullable = false)
    private String currency; // LKR, USD, EUR

    @NotBlank(message = "Payment method is required")
    @Column(name = "payment_method", nullable = false)
    private String paymentMethod; // CREDIT_CARD, DEBIT_CARD, BANK_TRANSFER, CASH

    @NotBlank(message = "Status is required")
    @Column(nullable = false)
    private String status; // PENDING, COMPLETED, FAILED, REFUNDED

    @Column(name = "payer_name", nullable = false)
    private String payerName;

    @Column(name = "payer_email")
    private String payerEmail;

    @Column(name = "property_id")
    private Long propertyId;

    @Column(name = "property_title")
    private String propertyTitle;

    @Column(name = "description")
    private String description;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ─── Constructors ──────────────────────────────────────────────────────────

    public Payment() {}

    public Payment(String transactionId, Double amount, String currency,
                   String paymentMethod, String status, String payerName,
                   String payerEmail, Long propertyId, String propertyTitle,
                   String description) {
        this.transactionId  = transactionId;
        this.amount         = amount;
        this.currency       = currency;
        this.paymentMethod  = paymentMethod;
        this.status         = status;
        this.payerName      = payerName;
        this.payerEmail     = payerEmail;
        this.propertyId     = propertyId;
        this.propertyTitle  = propertyTitle;
        this.description    = description;
        this.paymentDate    = LocalDateTime.now();
    }

    // ─── Lifecycle ─────────────────────────────────────────────────────────────

    @PrePersist
    protected void onCreate() {
        this.createdAt   = LocalDateTime.now();
        this.updatedAt   = LocalDateTime.now();
        if (this.paymentDate == null) this.paymentDate = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // ─── Getters & Setters ─────────────────────────────────────────────────────

    public Long getId()                              { return id; }
    public String getTransactionId()                 { return transactionId; }
    public void setTransactionId(String t)           { this.transactionId = t; }
    public Double getAmount()                        { return amount; }
    public void setAmount(Double amount)             { this.amount = amount; }
    public String getCurrency()                      { return currency; }
    public void setCurrency(String currency)         { this.currency = currency; }
    public String getPaymentMethod()                 { return paymentMethod; }
    public void setPaymentMethod(String m)           { this.paymentMethod = m; }
    public String getStatus()                        { return status; }
    public void setStatus(String status)             { this.status = status; }
    public String getPayerName()                     { return payerName; }
    public void setPayerName(String n)               { this.payerName = n; }
    public String getPayerEmail()                    { return payerEmail; }
    public void setPayerEmail(String e)              { this.payerEmail = e; }
    public Long getPropertyId()                      { return propertyId; }
    public void setPropertyId(Long p)                { this.propertyId = p; }
    public String getPropertyTitle()                 { return propertyTitle; }
    public void setPropertyTitle(String t)           { this.propertyTitle = t; }
    public String getDescription()                   { return description; }
    public void setDescription(String d)             { this.description = d; }
    public LocalDateTime getPaymentDate()            { return paymentDate; }
    public void setPaymentDate(LocalDateTime d)      { this.paymentDate = d; }
    public LocalDateTime getCreatedAt()              { return createdAt; }
    public LocalDateTime getUpdatedAt()              { return updatedAt; }
}
