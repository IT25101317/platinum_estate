import { useState, useEffect, useCallback } from "react";
import {
  getAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  toggleAvailability,
  searchProperties,
  getPropertiesByType,
} from "../services/propertyService";

const useProperty = () => {
  const [properties, setProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]); // master list for client-side filtering
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // ── Fetch all on mount ──
  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllProperties();
      setProperties(data);
      setAllProperties(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load properties.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // ── CREATE ──
  const addProperty = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const created = await createProperty(formData);
      setProperties((prev) => [created, ...prev]);
      setAllProperties((prev) => [created, ...prev]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create property.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ── UPDATE ──
  const editProperty = async (id, formData) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateProperty(id, formData);
      setProperties((prev) => prev.map((p) => (p.id === id ? updated : p)));
      setAllProperties((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update property.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ── DELETE ──
  const removeProperty = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
      setAllProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete property.");
    } finally {
      setLoading(false);
    }
  };

  // ── TOGGLE AVAILABILITY ──
  const toggleProperty = async (id) => {
    setError(null);
    try {
      const updated = await toggleAvailability(id);
      setProperties((prev) => prev.map((p) => (p.id === id ? updated : p)));
      setAllProperties((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to toggle availability.");
    }
  };

  // ── SEARCH (client-side) ──
  const handleSearch = (keyword) => {
    if (!keyword.trim()) {
      setProperties(allProperties);
      return;
    }
    const lower = keyword.toLowerCase();
    setProperties(
      allProperties.filter(
        (p) =>
          p.title?.toLowerCase().includes(lower) ||
          p.location?.toLowerCase().includes(lower) ||
          p.description?.toLowerCase().includes(lower)
      )
    );
  };

  // ── FILTER BY TYPE (client-side) ──
  const filterByType = (type) => {
    if (type === "ALL") {
      setProperties(allProperties);
      return;
    }
    setProperties(allProperties.filter((p) => p.propertyType === type));
  };

  const clearError = () => setError(null);

  return {
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
    refetch: fetchProperties,
  };
};

export default useProperty;