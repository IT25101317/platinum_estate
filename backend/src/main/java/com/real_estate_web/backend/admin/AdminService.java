package com.real_estate_web.backend.admin;

import java.util.List;

/**
 * Service interface defining the contract for Admin CRUD operations.
 * Follows the Interface Segregation and Dependency Inversion principles.
 * Implementation is in AdminServiceImpl.
 */
public interface AdminService {

    List<AdminDTO> getAllAdmins();

    AdminDTO getAdminById(Long id);

    AdminDTO createAdmin(AdminDTO dto);

    AdminDTO updateAdmin(Long id, AdminDTO dto);

    void deleteAdmin(Long id);

    List<AdminDTO> searchAdmins(String keyword);

    List<AdminDTO> getAdminsByRole(String role);

    List<AdminDTO> getAdminsByStatus(String status);
}
