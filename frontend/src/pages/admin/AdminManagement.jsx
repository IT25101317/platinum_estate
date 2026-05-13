// src/pages/admin/AdminManagement.jsx
// Main Admin Management page — wires hook + table + modals together.

import { useState } from "react";
import { useAdmins } from "./hooks/useAdmins";
import AdminFormModal   from "./components/AdminFormModal";
import AdminDeleteModal from "./components/AdminDeleteModal";

// ─── Badge helpers ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    ACTIVE:    "bg-green-100 text-green-700",
    INACTIVE:  "bg-gray-100 text-gray-500",
    SUSPENDED: "bg-red-100 text-red-600",
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${map[status] || "bg-gray-100 text-gray-400"}`}>
      {status}
    </span>
  );
};

const RoleBadge = ({ role }) => {
  const map = {
    SUPER_ADMIN: "bg-purple-100 text-purple-700",
    ADMIN:       "bg-amber-100 text-amber-700",
    MODERATOR:   "bg-blue-100 text-blue-700",
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${map[role] || "bg-gray-100 text-gray-500"}`}>
      {role?.replace("_", " ")}
    </span>
  );
};

// ─── Icon buttons ─────────────────────────────────────────────────────────────
const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminManagement() {
  const {
    admins, loading, error,
    searchTerm, setSearchTerm,
    handleCreate, handleUpdate, handleDelete,
  } = useAdmins();

  const [formModal,   setFormModal]   = useState({ open: false, admin: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, admin: null });
  const [toast, setToast]             = useState(null);

  // ─── Toast ──────────────────────────────────────────────────────────────────
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ─── Open modals ────────────────────────────────────────────────────────────
  const openCreate = ()      => setFormModal({ open: true, admin: null });
  const openEdit   = (admin) => setFormModal({ open: true, admin });
  const openDelete = (admin) => setDeleteModal({ open: true, admin });

  // ─── Submit form (create or update) ────────────────────────────────────────
  const handleFormSubmit = async (formData) => {
    const isEdit = !!formModal.admin;
    const result = isEdit
      ? await handleUpdate(formModal.admin.id, formData)
      : await handleCreate(formData);
    if (result.success) {
      showToast(isEdit ? "Admin updated successfully" : "Admin created successfully");
    }
    return result;
  };

  // ─── Confirm delete ─────────────────────────────────────────────────────────
  const handleConfirmDelete = async () => {
    const result = await handleDelete(deleteModal.admin.id);
    setDeleteModal({ open: false, admin: null });
    showToast(
      result.success ? "Admin deleted successfully" : result.message,
      result.success ? "success" : "error"
    );
  };

  // ─── Stats ──────────────────────────────────────────────────────────────────
  const activeCount = admins.filter((a) => a.status === "ACTIVE").length;
  const superCount  = admins.filter((a) => a.role === "SUPER_ADMIN").length;

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Toast notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium
          ${toast.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
          {toast.message}
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage system administrator accounts
          </p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition shadow-sm whitespace-nowrap">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Admin
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Admins",   value: admins.length,  color: "text-gray-800" },
          { label: "Active",         value: activeCount,    color: "text-green-600" },
          { label: "Super Admins",   value: superCount,     color: "text-purple-600" },
          { label: "Inactive",       value: admins.length - activeCount, color: "text-red-500" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text"
          placeholder="Search admins by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
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
              <span className="text-sm">Loading admins...</span>
            </div>
          </div>
        ) : admins.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-52 text-gray-400">
            <svg className="w-10 h-10 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
            </svg>
            <p className="text-sm">No admins found</p>
            <button onClick={openCreate}
              className="mt-3 text-sm text-amber-500 hover:underline">
              + Add the first admin
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["#", "Full Name", "Email", "Phone", "Role", "Status", "Created", "Actions"].map((h) => (
                    <th key={h}
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {admins.map((admin, idx) => (
                  <tr key={admin.id} className="hover:bg-amber-50/30 transition">
                    <td className="px-4 py-3 text-gray-400 text-xs">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        {/* Avatar initials */}
                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                          {admin.fullName?.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-800">{admin.fullName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{admin.email}</td>
                    <td className="px-4 py-3 text-gray-500">{admin.phoneNumber || "—"}</td>
                    <td className="px-4 py-3"><RoleBadge role={admin.role} /></td>
                    <td className="px-4 py-3"><StatusBadge status={admin.status} /></td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {admin.createdAt
                        ? new Date(admin.createdAt).toLocaleDateString("en-GB")
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openEdit(admin)} title="Edit"
                          className="p-1.5 text-amber-600 hover:bg-amber-100 rounded-lg transition">
                          <EditIcon />
                        </button>
                        <button onClick={() => openDelete(admin)} title="Delete"
                          className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition">
                          <TrashIcon />
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
      <AdminFormModal
        isOpen={formModal.open}
        onClose={() => setFormModal({ open: false, admin: null })}
        onSubmit={handleFormSubmit}
        editingAdmin={formModal.admin}
      />
      <AdminDeleteModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, admin: null })}
        onConfirm={handleConfirmDelete}
        adminName={deleteModal.admin?.fullName}
      />
    </div>
  );
}
