import { useState, useEffect, useCallback } from "react";
import {
  getAllPayments,
  createPayment,
  updatePayment,
  deletePayment,
  searchPayments,
  getTotalRevenue,
} from "../../../services/paymentService";

export const usePayments = () => {
  const [payments, setPayments]       = useState([]);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);
  const [searchTerm, setSearchTerm]   = useState("");
  const [totalRevenue, setTotalRevenue] = useState(0);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = searchTerm.trim()
        ? await searchPayments(searchTerm.trim())
        : await getAllPayments();
      setPayments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  const fetchRevenue = useCallback(async () => {
    try {
      const data = await getTotalRevenue();
      setTotalRevenue(data.totalRevenue || 0);
    } catch (err) {
      console.error("Failed to fetch revenue:", err);
    }
  }, []);

  useEffect(() => {
    const delay = setTimeout(fetchPayments, 300);
    return () => clearTimeout(delay);
  }, [fetchPayments]);

  useEffect(() => {
    fetchRevenue();
  }, [fetchRevenue, payments]);

  const handleCreate = async (paymentData) => {
    setLoading(true);
    setError(null);
    try {
      const created = await createPayment(paymentData);
      setPayments((prev) => [created, ...prev]);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, paymentData) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updatePayment(id, paymentData);
      setPayments((prev) => prev.map((p) => (p.id === id ? updated : p)));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deletePayment(id);
      setPayments((prev) => prev.filter((p) => p.id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const completedCount = payments.filter((p) => p.status === "COMPLETED").length;
  const pendingCount   = payments.filter((p) => p.status === "PENDING").length;
  const failedCount    = payments.filter((p) => p.status === "FAILED").length;

  return {
    payments,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    totalRevenue,
    completedCount,
    pendingCount,
    failedCount,
    fetchPayments,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
