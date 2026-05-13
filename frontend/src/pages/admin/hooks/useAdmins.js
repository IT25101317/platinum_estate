// src/pages/admin/hooks/useAdmins.js
// Custom hook — isolates all admin state and CRUD logic from the UI.

import { useState, useEffect, useCallback } from "react";
import {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  searchAdmins,
} from "../../../services/adminService";

export const useAdmins = () => {
  const [admins, setAdmins]           = useState([]);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);
  const [searchTerm, setSearchTerm]   = useState("");

  // ─── Fetch (with debounced search) ──────────────────────────────────────────
  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = searchTerm.trim()
        ? await searchAdmins(searchTerm.trim())
        : await getAllAdmins();
      setAdmins(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const delay = setTimeout(fetchAdmins, 300);
    return () => clearTimeout(delay);
  }, [fetchAdmins]);

  // ─── Create ──────────────────────────────────────────────────────────────────
  const handleCreate = async (adminData) => {
    setLoading(true);
    setError(null);
    try {
      const created = await createAdmin(adminData);
      setAdmins((prev) => [created, ...prev]);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ─── Update ──────────────────────────────────────────────────────────────────
  const handleUpdate = async (id, adminData) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateAdmin(id, adminData);
      setAdmins((prev) => prev.map((a) => (a.id === id ? updated : a)));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ─── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteAdmin(id);
      setAdmins((prev) => prev.filter((a) => a.id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    admins,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    fetchAdmins,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
