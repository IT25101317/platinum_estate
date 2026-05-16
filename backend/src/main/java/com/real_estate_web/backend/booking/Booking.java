package com.real_estate_web.backend.booking;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Booking Entity - Represents a property booking in the system.
 * Maps to the "bookings" table in the Neon PostgreSQL database.
 */
@Entity
@Table(name = "bookings")
public class Booking {

    // ─── Fields ───────────────────────────────────────────────────────────────

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "property_id", nullable = false)
    private Long propertyId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(name = "user_phone")
    private String userPhone;

    @Column(name = "property_title", nullable = false)
    private String propertyTitle;

    @Column(name = "check_in_date", nullable = false)
    private LocalDate checkInDate;

    @Column(name = "check_out_date", nullable = false)
    private LocalDate checkOutDate;

    @Column(name = "total_price", nullable = false)
    private Double totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private BookingStatus status = BookingStatus.PENDING;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ─── Lifecycle hooks ──────────────────────────────────────────────────────

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // ─── Booking status enum ──────────────────────────────────────────────────

    public enum BookingStatus {
        PENDING,
        CONFIRMED,
        CANCELLED,
        COMPLETED
    }

    // ─── Constructors ─────────────────────────────────────────────────────────

    public Booking() {}

    public Booking(Long propertyId, Long userId, String userName, String userEmail,
                   String userPhone, String propertyTitle, LocalDate checkInDate,
                   LocalDate checkOutDate, Double totalPrice, String notes) {
        this.propertyId    = propertyId;
        this.userId        = userId;
        this.userName      = userName;
        this.userEmail     = userEmail;
        this.userPhone     = userPhone;
        this.propertyTitle = propertyTitle;
        this.checkInDate   = checkInDate;
        this.checkOutDate  = checkOutDate;
        this.totalPrice    = totalPrice;
        this.notes         = notes;
        this.status        = BookingStatus.PENDING;
    }

    // ─── Getters & Setters ────────────────────────────────────────────────────

    public Long getId()                        { return id; }
    public void setId(Long id)                 { this.id = id; }

    public Long getPropertyId()                { return propertyId; }
    public void setPropertyId(Long propertyId) { this.propertyId = propertyId; }

    public Long getUserId()                    { return userId; }
    public void setUserId(Long userId)         { this.userId = userId; }

    public String getUserName()                { return userName; }
    public void setUserName(String userName)   { this.userName = userName; }

    public String getUserEmail()               { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getUserPhone()               { return userPhone; }
    public void setUserPhone(String userPhone) { this.userPhone = userPhone; }

    public String getPropertyTitle()                   { return propertyTitle; }
    public void setPropertyTitle(String propertyTitle) { this.propertyTitle = propertyTitle; }

    public LocalDate getCheckInDate()                  { return checkInDate; }
    public void setCheckInDate(LocalDate checkInDate)  { this.checkInDate = checkInDate; }

    public LocalDate getCheckOutDate()                 { return checkOutDate; }
    public void setCheckOutDate(LocalDate checkOutDate){ this.checkOutDate = checkOutDate; }

    public Double getTotalPrice()                { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }

    public BookingStatus getStatus()             { return status; }
    public void setStatus(BookingStatus status)  { this.status = status; }

    public String getNotes()                     { return notes; }
    public void setNotes(String notes)           { this.notes = notes; }

    public LocalDateTime getCreatedAt()          { return createdAt; }
    public void setCreatedAt(LocalDateTime t)    { this.createdAt = t; }

    public LocalDateTime getUpdatedAt()          { return updatedAt; }
    public void setUpdatedAt(LocalDateTime t)    { this.updatedAt = t; }
}
