import { useState } from "react";
import useProperty from "../../context/useProperty";
import PropertyCard from "./PropertyCard";
import PropertyForm from "./PropertyForm";

const PROPERTY_TYPES = ["ALL", "APARTMENT", "HOUSE", "VILLA", "STUDIO", "COMMERCIAL", "LAND"];

const PropertyPage = () => {
  const {
    properties,
    loading,
    error,
    selectedProperty,
    setSelectedProperty,
    clearError,
    addProperty,
    editProperty,
    removeProperty,
    toggleProperty,
    handleSearch,
    filterByType,
  } = useProperty();

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState("ALL");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleOpenCreate = () => {
    setSelectedProperty(null);
    setShowForm(true);
    clearError();
  };

  const handleOpenEdit = (property) => {
    setSelectedProperty(property);
    setShowForm(true);
    clearError();
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedProperty(null);
    clearError();
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedProperty) {
        await editProperty(selectedProperty.id, formData);
        showSuccess("Property updated successfully!");
      } else {
        await addProperty(formData);
        showSuccess("Property added successfully!");
      }
      handleCloseForm();
    } catch {
      // error already in state via hook
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmId) return;
    await removeProperty(deleteConfirmId);
    setDeleteConfirmId(null);
    showSuccess("Property deleted.");
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    handleSearch(val);
  };

  const handleTypeFilter = (type) => {
    setActiveType(type);
    filterByType(type);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Property Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">{properties.length} properties listed</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow transition"
        >
          + Add Property
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm font-medium">
          ✅ {successMsg}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex justify-between">
          <span>⚠️ {error}</span>
          <button onClick={clearError} className="font-bold ml-2">✕</button>
        </div>
      )}

      {/* Search & Filters */}
      <div className="mb-5 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="🔍 Search by title, location, description..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      {/* Type Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {PROPERTY_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => handleTypeFilter(type)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition border ${
              activeType === type
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-emerald-400"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-16 text-gray-400">
          <div className="animate-spin text-3xl mb-2">⟳</div>
          <p className="text-sm">Loading properties...</p>
        </div>
      )}

      {/* Property Grid */}
      {!loading && properties.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-3">🏗️</div>
          <p className="font-semibold text-gray-500">No properties found</p>
          <p className="text-sm mt-1">Click "Add Property" to get started.</p>
        </div>
      )}
      {!loading && properties.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {properties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onEdit={handleOpenEdit}
              onDelete={(id) => setDeleteConfirmId(id)}
              onToggle={toggleProperty}
            />
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-extrabold text-gray-800">
                  {selectedProperty ? "Edit Property" : "Add New Property"}
                </h2>
                <button
                  onClick={handleCloseForm}
                  className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                >
                  ✕
                </button>
              </div>
              <PropertyForm
                onSubmit={handleSubmit}
                onCancel={handleCloseForm}
                initialData={selectedProperty}
                loading={loading}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center">
            <div className="text-4xl mb-3">🗑️</div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">Delete Property?</h2>
            <p className="text-sm text-gray-500 mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl text-sm transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold py-2.5 rounded-xl text-sm transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyPage;
