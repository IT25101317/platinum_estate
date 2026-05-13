package com.real_estate_web.backend.admin;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller exposing /api/admin/admins endpoints.
 * Kept deliberately thin — all logic delegates to AdminService.
 * Frontend calls these via adminService.js.
 *
 * Endpoints:
 *   GET    /api/admin/admins              → get all
 *   GET    /api/admin/admins/{id}         → get one
 *   GET    /api/admin/admins/search       → search by keyword
 *   GET    /api/admin/admins/role/{role}  → filter by role
 *   GET    /api/admin/admins/status/{s}   → filter by status
 *   POST   /api/admin/admins              → create
 *   PUT    /api/admin/admins/{id}         → update
 *   DELETE /api/admin/admins/{id}         → delete
 */
@RestController
@RequestMapping("/api/admin/admins")
@CrossOrigin(origins = "http://localhost:5173") // Vite dev server
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // GET all
    @GetMapping
    public ResponseEntity<List<AdminDTO>> getAllAdmins() {
        return ResponseEntity.ok(adminService.getAllAdmins());
    }

    // GET one
    @GetMapping("/{id}")
    public ResponseEntity<AdminDTO> getAdminById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getAdminById(id));
    }

    // SEARCH  ?keyword=john
    @GetMapping("/search")
    public ResponseEntity<List<AdminDTO>> searchAdmins(@RequestParam String keyword) {
        return ResponseEntity.ok(adminService.searchAdmins(keyword));
    }

    // FILTER by role
    @GetMapping("/role/{role}")
    public ResponseEntity<List<AdminDTO>> getByRole(@PathVariable String role) {
        return ResponseEntity.ok(adminService.getAdminsByRole(role));
    }

    // FILTER by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<AdminDTO>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(adminService.getAdminsByStatus(status));
    }

    // CREATE
    @PostMapping
    public ResponseEntity<AdminDTO> createAdmin(@Valid @RequestBody AdminDTO dto) {
        AdminDTO created = adminService.createAdmin(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<AdminDTO> updateAdmin(
            @PathVariable Long id,
            @Valid @RequestBody AdminDTO dto) {
        return ResponseEntity.ok(adminService.updateAdmin(id, dto));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.noContent().build();
    }
}
