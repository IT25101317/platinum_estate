// src/pages/faq/FAQAdminPage.jsx
// Admin-only page — full Create, Read, Update, Delete for FAQs
import { useState } from "react";
import { useAdminFAQ } from "../../hooks/useFAQ";
import FAQModal from "../../components/faq/FAQModal";

const CATEGORY_COLORS = {
  General:    "bg-gray-100 text-gray-700",
  Properties: "bg-blue-100 text-blue-700",
  Bookings:   "bg-purple-100 text-purple-700",
  Payments:   "bg-green-100 text-green-700",
  Reviews:    "bg-amber-100 text-amber-700",
};

const FAQAdminPage = () => {
  const { faqs, loading, error, successMsg, create, update, remove, toggle } = useAdminFAQ();

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData]   = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [actionError, setActionError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCat, setFilterCat] = useState("All");

  const openCreate = () => { setEditData(null); setModalOpen(true); };
  const openEdit   = (faq) => { setEditData(faq); setModalOpen(true); };

  const handleSubmit = async (formData) => {
    try {
      if (editData) await update(editData.id, formData);
      else await create(formData);
    } catch (err) {
      setActionError(err.message);
      throw err;
    }
  };

  const handleDelete = async (id) => {
    try {
      await remove(id);
      setDeleteConfirm(null);
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggle(id);
    } catch (err) {
      setActionError(err.message);
    }
  };

  // Filter FAQs
  const filtered = faqs.filter((f) => {
    const matchCat = filterCat === "All" || f.category === filterCat;
    const matchSearch = !searchTerm ||
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const categories = ["All", ...new Set(faqs.map((f) => f.category))];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
            <p className="text-gray-500 text-sm mt-1">Manage frequently asked questions for users</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition shadow-sm"
          >
            + Add FAQ
          </button>
        </div>

        {/* Success / Error messages */}
        {successMsg && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">
            ✓ {successMsg}
          </div>
        )}
        {actionError && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 flex justify-between">
            ✗ {actionError}
            <button onClick={() => setActionError("")} className="text-red-400 hover:text-red-600">✕</button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total FAQs",    value: faqs.length },
            { label: "Active",        value: faqs.filter((f) => f.isActive).length },
            { label: "Inactive",      value: faqs.filter((f) => !f.isActive).length },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-gray-500 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 flex flex-wrap gap-3 items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search FAQs..."
            className="flex-1 min-w-48 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <span className="text-gray-400 text-sm">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Loading FAQs...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-6 py-4 text-sm">{error}</div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-5 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">Question</th>
                  <th className="text-left px-5 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">Category</th>
                  <th className="text-left px-5 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">Order</th>
                  <th className="text-left px-5 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">Status</th>
                  <th className="text-right px-5 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-gray-400">No FAQs found</td>
                  </tr>
                ) : filtered.map((faq) => (
                  <tr key={faq.id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-4 max-w-xs">
                      <p className="text-gray-800 font-medium truncate">{faq.question}</p>
                      <p className="text-gray-400 text-xs mt-0.5 truncate">{faq.answer}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${CATEGORY_COLORS[faq.category] || "bg-gray-100 text-gray-600"}`}>
                        {faq.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-500">{faq.displayOrder}</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleToggle(faq.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                          faq.isActive
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {faq.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(faq)}
                          className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(faq)}
                          className="px-3 py-1.5 text-xs border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition"
                        >
                          Delete
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

      {/* Create / Edit Modal */}
      <FAQModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        editData={editData}
      />

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete FAQ?</h3>
            <p className="text-gray-500 text-sm mb-1">This action cannot be undone.</p>
            <p className="text-gray-700 text-sm font-medium mb-6 bg-gray-50 rounded-lg px-3 py-2">
              "{deleteConfirm.question}"
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQAdminPage;
