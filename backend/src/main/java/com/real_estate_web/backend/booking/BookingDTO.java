package com.real_estate_web.backend.booking;

/**
 * BookingDTO - Data Transfer Object.
 * Used to receive data from frontend and send responses back.
 * Keeps the entity separate from the API layer (OOP encapsulation).
 */
public class BookingDTO {

    private Long id;
    private Long propertyId;
    private Long userId;
    private String userName;
    private String userEmail;
    private String userPhone;
    private String propertyTitle;
    private String checkInDate;
    private String checkOutDate;
    private Double totalPrice;
    private String status;
    private String notes;
    private String createdAt;
    private String updatedAt;

    // ─── Constructors ─────────────────────────────────────────────────────────

    public BookingDTO() {}

    /** Build a DTO from an existing Booking entity (for responses) */
    public static BookingDTO fromEntity(Booking b) {
        BookingDTO dto = new BookingDTO();

        dto.id = b.getId();
        dto.propertyId = b.getPropertyId();
        dto.userId = b.getUserId();
        dto.userName = b.getUserName();
        dto.userEmail = b.getUserEmail();
        dto.userPhone = b.getUserPhone();
        dto.propertyTitle = b.getPropertyTitle();

        dto.checkInDate =
                b.getCheckInDate() != null
                        ? b.getCheckInDate().toString()
                        : null;

        dto.checkOutDate =
                b.getCheckOutDate() != null
                        ? b.getCheckOutDate().toString()
                        : null;

        dto.totalPrice = b.getTotalPrice();

        dto.status =
                b.getStatus() != null
                        ? b.getStatus().name()
                        : null;

        dto.notes = b.getNotes();

        dto.createdAt =
                b.getCreatedAt() != null
                        ? b.getCreatedAt().toString()
                        : null;

        dto.updatedAt =
                b.getUpdatedAt() != null
                        ? b.getUpdatedAt().toString()
                        : null;

        return dto;
    }

    // ─── Getters & Setters ────────────────────────────────────────────────────

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }

    public String getPropertyTitle() {
        return propertyTitle;
    }

    public void setPropertyTitle(String propertyTitle) {
        this.propertyTitle = propertyTitle;
    }

    public String getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(String checkInDate) {
        this.checkInDate = checkInDate;
    }

    public String getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(String checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
}