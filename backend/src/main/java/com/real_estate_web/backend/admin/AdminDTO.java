package com.real_estate_web.backend.admin;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

/**
 * Data Transfer Object for Admin.
 * Keeps the entity layer decoupled from the API layer (OOP separation of concerns).
 * Password is included for create/update but never returned in responses.
 */
public class AdminDTO {

    private Long id;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    // Only used on create/update — never sent back in responses
    private String password;

    private String phoneNumber;

    @NotBlank(message = "Role is required")
    private String role;

    @NotBlank(message = "Status is required")
    private String status;

    private LocalDateTime lastLogin;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // ─── Constructors ──────────────────────────────────────────────────────────

    public AdminDTO() {}

    /** Map Admin entity → AdminDTO (password excluded from response) */
    public AdminDTO(Admin admin) {
        this.id          = admin.getId();
        this.fullName    = admin.getFullName();
        this.email       = admin.getEmail();
        this.password    = null; // never expose password
        this.phoneNumber = admin.getPhoneNumber();
        this.role        = admin.getRole();
        this.status      = admin.getStatus();
        this.lastLogin   = admin.getLastLogin();
        this.createdAt   = admin.getCreatedAt();
        this.updatedAt   = admin.getUpdatedAt();
    }

    // ─── Getters & Setters ─────────────────────────────────────────────────────

    public Long getId()                          { return id; }
    public void setId(Long id)                   { this.id = id; }
    public String getFullName()                  { return fullName; }
    public void setFullName(String fullName)     { this.fullName = fullName; }
    public String getEmail()                     { return email; }
    public void setEmail(String email)           { this.email = email; }
    public String getPassword()                  { return password; }
    public void setPassword(String password)     { this.password = password; }
    public String getPhoneNumber()               { return phoneNumber; }
    public void setPhoneNumber(String phone)     { this.phoneNumber = phone; }
    public String getRole()                      { return role; }
    public void setRole(String role)             { this.role = role; }
    public String getStatus()                    { return status; }
    public void setStatus(String status)         { this.status = status; }
    public LocalDateTime getLastLogin()          { return lastLogin; }
    public void setLastLogin(LocalDateTime t)    { this.lastLogin = t; }
    public LocalDateTime getCreatedAt()          { return createdAt; }
    public void setCreatedAt(LocalDateTime t)    { this.createdAt = t; }
    public LocalDateTime getUpdatedAt()          { return updatedAt; }
    public void setUpdatedAt(LocalDateTime t)    { this.updatedAt = t; }
}
