import api from "./api";

const BASE = "/properties";

// ==================== CREATE ====================
export const createProperty = async (propertyData) => {
  const response = await api.post(BASE, propertyData);
  return response.data;
};

// ==================== READ ====================
export const getAllProperties = async () => {
  const response = await api.get(BASE);
  return response.data;
};

export const getPropertyById = async (id) => {
  const response = await api.get(`${BASE}/${id}`);
  return response.data;
};

export const getAvailableProperties = async () => {
  const response = await api.get(`${BASE}/available`);
  return response.data;
};

export const getPropertiesByType = async (type) => {
  const response = await api.get(`${BASE}/type/${type}`);
  return response.data;
};

export const searchProperties = async (keyword) => {
  const response = await api.get(`${BASE}/search`, { params: { keyword } });
  return response.data;
};

export const getPropertiesByPriceRange = async (min, max) => {
  const response = await api.get(`${BASE}/price-range`, { params: { min, max } });
  return response.data;
};

// ==================== UPDATE ====================
export const updateProperty = async (id, propertyData) => {
  const response = await api.put(`${BASE}/${id}`, propertyData);
  return response.data;
};

export const toggleAvailability = async (id) => {
  const response = await api.patch(`${BASE}/${id}/toggle-availability`);
  return response.data;
};

// ==================== DELETE ====================
export const deleteProperty = async (id) => {
  await api.delete(`${BASE}/${id}`);
};
