package com.real_estate_web.backend.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Concrete implementation of AdminService.
 * All business logic is encapsulated here — the controller stays thin.
 * Custom exceptions are inner classes (OOP encapsulation).
 */
@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;

    @Autowired
    public AdminServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    // ─── READ: all admins ──────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public List<AdminDTO> getAllAdmins() {
        return adminRepository.findAll()
                .stream()
                .map(AdminDTO::new)
                .collect(Collectors.toList());
    }

    // ─── READ: single admin ────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public AdminDTO getAdminById(Long id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new AdminNotFoundException("Admin not found with id: " + id));
        return new AdminDTO(admin);
    }

    // ─── CREATE ────────────────────────────────────────────────────────────────

    @Override
    public AdminDTO createAdmin(AdminDTO dto) {
        if (adminRepository.existsByEmail(dto.getEmail())) {
            throw new AdminAlreadyExistsException("Email already in use: " + dto.getEmail());
        }

        if (dto.getPassword() == null || dto.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password is required when creating an admin");
        }

        Admin admin = new Admin(
                dto.getFullName(),
                dto.getEmail(),
                dto.getPassword(), // store raw here; hash with BCrypt when Spring Security is added
                dto.getPhoneNumber(),
                dto.getRole(),
                dto.getStatus() != null ? dto.getStatus() : "ACTIVE"
        );

        Admin saved = adminRepository.save(admin);
        return new AdminDTO(saved);
    }

    // ─── UPDATE ────────────────────────────────────────────────────────────────

    @Override
    public AdminDTO updateAdmin(Long id, AdminDTO dto) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new AdminNotFoundException("Admin not found with id: " + id));

        // Email uniqueness: allow same email on the same record
        if (!admin.getEmail().equals(dto.getEmail()) &&
             adminRepository.existsByEmail(dto.getEmail())) {
            throw new AdminAlreadyExistsException("Email already in use: " + dto.getEmail());
        }

        admin.setFullName(dto.getFullName());
        admin.setEmail(dto.getEmail());
        admin.setPhoneNumber(dto.getPhoneNumber());
        admin.setRole(dto.getRole());
        admin.setStatus(dto.getStatus());

        // Only update password if a new one was provided
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            admin.setPassword(dto.getPassword());
        }

        Admin updated = adminRepository.save(admin);
        return new AdminDTO(updated);
    }

    // ─── DELETE ────────────────────────────────────────────────────────────────

    @Override
    public void deleteAdmin(Long id) {
        if (!adminRepository.existsById(id)) {
            throw new AdminNotFoundException("Admin not found with id: " + id);
        }
        adminRepository.deleteById(id);
    }

    // ─── SEARCH ────────────────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public List<AdminDTO> searchAdmins(String keyword) {
        return adminRepository.searchAdmins(keyword)
                .stream()
                .map(AdminDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AdminDTO> getAdminsByRole(String role) {
        return adminRepository.findByRole(role)
                .stream()
                .map(AdminDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AdminDTO> getAdminsByStatus(String status) {
        return adminRepository.findByStatus(status)
                .stream()
                .map(AdminDTO::new)
                .collect(Collectors.toList());
    }

    // ─── Encapsulated custom exceptions (OOP) ──────────────────────────────────

    public static class AdminNotFoundException extends RuntimeException {
        public AdminNotFoundException(String message) { super(message); }
    }

    public static class AdminAlreadyExistsException extends RuntimeException {
        public AdminAlreadyExistsException(String message) { super(message); }
    }
}
