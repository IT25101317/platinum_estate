import { useState, useEffect, useCallback } from "react";
import {
  getAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  searchProperties,
  getPropertiesByType,
  toggleAvailability,
} from "../services/propertyService";

const useProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const clearError = () => setError(null);

  // Fetch all
  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllProperties();
      setProperties(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load properties.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Create
  const addProperty = async (propertyData) => {
    setLoading(true);
    setError(null);
    try {
      const created = await createProperty(propertyData);
      setProperties((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create property.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update
  const editProperty = async (id, propertyData) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateProperty(id, propertyData);
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      );
      return updated;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update property.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Toggle availability
  const toggleProperty = async (id) => {
    try {
      const updated = await toggleAvailability(id);
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      );
    } catch (err) {
      setError("Failed to toggle availability.");
    }
  };

  // Delete
  const removeProperty = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete property.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Search
  const handleSearch = async (keyword) => {
    if (!keyword.trim()) {
      fetchProperties();
      return;
    }
    setLoading(true);
    try {
      const data = await searchProperties(keyword);
      setProperties(data);
    } catch (err) {
      setError("Search failed.");
    } finally {
      setLoading(false);
    }
  };

  // Filter by type
  const filterByType = async (type) => {
    if (!type || type === "ALL") {
      fetchProperties();
      return;
    }
    setLoading(true);
    try {
      const data = await getPropertiesByType(type);
      setProperties(data);
    } catch (err) {
      setError("Filter failed.");
    } finally {
      setLoading(false);
    }
  };

  return {
    properties,
    loading,
    error,
    selectedProperty,
    setSelectedProperty,
    clearError,
    fetchProperties,
    addProperty,
    editProperty,
    removeProperty,
    toggleProperty,
    handleSearch,
    filterByType,
  };
};

export default useProperty;
