// src/pages/payments/PaymentManagement.jsx
// Main Payment Management page — full CRUD UI with stats dashboard.

import { useState } from "react";
import { usePayments } from "./hooks/usePayments";
import PaymentFormModal   from "./components/PaymentFormModal";
import PaymentDeleteModal from "./components/PaymentDeleteModal";

// ─── Status badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    COMPLETED: "bg-green-100 text-green-700",
    PENDING:   "bg-yellow-100 text-yellow-700",
    FAILED:    "bg-red-100 text-red-600",
    REFUNDED:  "bg-blue-100 text-blue-700",
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${map[status] || "bg-gray-100 text-gray-500"}`}>
      {status}
    </span>
  );
};

// ─── Method badge ─────────────────────────────────────────────────────────────
const MethodBadge = ({ method }) => {
  const map = {
    CREDIT_CARD:   "bg-purple-100 text-purple-700",
    DEBIT_CARD:    "bg-indigo-100 text-indigo-700",
    BANK_TRANSFER: "bg-teal-100 text-teal-700",
    CASH:          "bg-amber-100 text-amber-700",
    ONLINE:        "bg-cyan-100 text-cyan-700",
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${map[method] || "bg-gray-100 text-gray-500"}`}>
      {method?.replace("_", " ")}
    </span>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, color, prefix = "" }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className={`text-2xl font-bold ${color}`}>{prefix}{value}</p>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PaymentManagement() {
  const {
    payments, loading, error,
    searchTerm, setSearchTerm,
    totalRevenue, completedCount, pendingCount, failedCount,
    handleCreate, handleUpdate, handleDelete,
  } = usePayments();

  const [formModal,   setFormModal]   = useState({ open: false, payment: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, payment: null });
  const [toast, setToast]             = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL");

  // ─── Toast ──────────────────────────────────────────────────────────────────
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openCreate = ()        => setFormModal({ open: true, payment: null });
  const openEdit   = (payment) => setFormModal({ open: true, payment });
  const openDelete = (payment) => setDeleteModal({ open: true, payment });

  const handleFormSubmit = async (formData) => {
    const isEdit = !!formModal.payment;
    const result = isEdit
      ? await handleUpdate(formModal.payment.id, formData)
      : await handleCreate(formData);
    if (result.success)
      showToast(isEdit ? "Payment updated successfully" : "Payment recorded successfully");
    return result;
  };

  const handleConfirmDelete = async () => {
    const result = await handleDelete(deleteModal.payment.id);
    setDeleteModal({ open: false, payment: null });
    showToast(
      result.success ? "Payment deleted successfully" : result.message,
      result.success ? "success" : "error"
    );
  };

  // ─── Filter by status ────────────────────────────────────────────────────────
  const filtered = statusFilter === "ALL"
    ? payments
    : payments.filter((p) => p.status === statusFilter);

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium
          ${toast.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track and manage all payment transactions</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition shadow-sm whitespace-nowrap">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Record Payment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
        <StatCard label="Total Payments" value={payments.length}  color="text-gray-800" />
        <StatCard label="Completed"      value={completedCount}   color="text-green-600" />
        <StatCard label="Pending"        value={pendingCount}      color="text-yellow-600" />
        <StatCard label="Failed"         value={failedCount}       color="text-red-500" />
        <StatCard label="Total Revenue"  value={totalRevenue.toLocaleString()} color="text-amber-600" prefix="LKR " />
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text"
            placeholder="Search by payer, transaction ID, or property..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white">
          <option value="ALL">All Statuses</option>
          <option value="COMPLETED">Completed</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
          <option value="REFUNDED">Refunded</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-5">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-52">
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <svg className="animate-spin w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              <span className="text-sm">Loading payments...</span>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-52 text-gray-400">
            <svg className="w-10 h-10 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <p className="text-sm">No payments found</p>
            <button onClick={openCreate} className="mt-3 text-sm text-amber-500 hover:underline">
              + Record the first payment
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["#", "Transaction ID", "Payer", "Property", "Amount", "Method", "Status", "Date", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((payment, idx) => (
                  <tr key={payment.id} className="hover:bg-amber-50/30 transition">
                    <td className="px-4 py-3 text-gray-400 text-xs">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                        {payment.transactionId}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">{payment.payerName}</p>
                      <p className="text-xs text-gray-400">{payment.payerEmail || "—"}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      {payment.propertyTitle || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-800">
                        {payment.currency} {Number(payment.amount).toLocaleString()}
                      </p>
                    </td>
                    <td className="px-4 py-3"><MethodBadge method={payment.paymentMethod} /></td>
                    <td className="px-4 py-3"><StatusBadge status={payment.status} /></td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {payment.paymentDate
                        ? new Date(payment.paymentDate).toLocaleDateString("en-GB")
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openEdit(payment)} title="Edit"
                          className="p-1.5 text-amber-600 hover:bg-amber-100 rounded-lg transition">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => openDelete(payment)} title="Delete"
                          className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <PaymentFormModal
        isOpen={formModal.open}
        onClose={() => setFormModal({ open: false, payment: null })}
        onSubmit={handleFormSubmit}
        editingPayment={formModal.payment}
      />
      <PaymentDeleteModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, payment: null })}
        onConfirm={handleConfirmDelete}
        transactionId={deleteModal.payment?.transactionId}
      />
    </div>
  );
}
