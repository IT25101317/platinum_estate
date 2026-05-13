package com.real_estate_web.backend.admin;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

/**
 * Admin entity — maps to the "admins" table in Neon PostgreSQL.
 * Encapsulates all admin-specific fields with lifecycle hooks.
 */
@Entity
@Table(name = "admins")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Full name is required")
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Password is required")
    @Column(nullable = false)
    private String password;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(nullable = false)
    private String role; // SUPER_ADMIN, ADMIN, MODERATOR

    @Column(nullable = false)
    private String status; // ACTIVE, INACTIVE, SUSPENDED

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ─── Constructors ──────────────────────────────────────────────────────────

    public Admin() {}

    public Admin(String fullName, String email, String password,
                 String phoneNumber, String role, String status) {
        this.fullName    = fullName;
        this.email       = email;
        this.password    = password;
        this.phoneNumber = phoneNumber;
        this.role        = role;
        this.status      = status;
    }

    // ─── Lifecycle ─────────────────────────────────────────────────────────────

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // ─── Getters & Setters ─────────────────────────────────────────────────────

    public Long getId()                          { return id; }
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
    public LocalDateTime getUpdatedAt()          { return updatedAt; }
}
