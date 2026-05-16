package com.real_estate_web.backend.payment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDateTime;

/**
 * DTO for Payment — decouples entity from API layer (OOP separation of concerns).
 */
public class PaymentDTO {

    private Long id;

    @NotBlank(message = "Transaction ID is required")
    private String transactionId;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private Double amount;

    @NotBlank(message = "Currency is required")
    private String currency;

    @NotBlank(message = "Payment method is required")
    private String paymentMethod;

    @NotBlank(message = "Status is required")
    private String status;

    @NotBlank(message = "Payer name is required")
    private String payerName;

    private String payerEmail;
    private Long   propertyId;
    private String propertyTitle;
    private String description;
    private LocalDateTime paymentDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // ─── Constructors ──────────────────────────────────────────────────────────

    public PaymentDTO() {}

    /** Map Payment entity → PaymentDTO */
    public PaymentDTO(Payment p) {
        this.id             = p.getId();
        this.transactionId  = p.getTransactionId();
        this.amount         = p.getAmount();
        this.currency       = p.getCurrency();
        this.paymentMethod  = p.getPaymentMethod();
        this.status         = p.getStatus();
        this.payerName      = p.getPayerName();
        this.payerEmail     = p.getPayerEmail();
        this.propertyId     = p.getPropertyId();
        this.propertyTitle  = p.getPropertyTitle();
        this.description    = p.getDescription();
        this.paymentDate    = p.getPaymentDate();
        this.createdAt      = p.getCreatedAt();
        this.updatedAt      = p.getUpdatedAt();
    }

    // ─── Getters & Setters ─────────────────────────────────────────────────────

    public Long getId()                              { return id; }
    public void setId(Long id)                       { this.id = id; }
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
    public void setCreatedAt(LocalDateTime d)        { this.createdAt = d; }
    public LocalDateTime getUpdatedAt()              { return updatedAt; }
    public void setUpdatedAt(LocalDateTime d)        { this.updatedAt = d; }
}
