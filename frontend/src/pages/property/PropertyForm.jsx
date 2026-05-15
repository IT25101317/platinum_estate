import { useState, useEffect } from "react";

const PROPERTY_TYPES = ["APARTMENT", "HOUSE", "VILLA", "STUDIO", "COMMERCIAL", "LAND"];

const emptyForm = {
  title: "",
  description: "",
  location: "",
  price: "",
  propertyType: "APARTMENT",
  bedrooms: 0,
  bathrooms: 0,
  areaSqFt: 0,
  available: true,
  imageUrl: "",
};

const PropertyForm = ({ onSubmit, onCancel, initialData = null, loading }) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (form.title.trim().length < 3) newErrors.title = "Title must be at least 3 characters";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.price || Number(form.price) <= 0) newErrors.price = "Price must be greater than 0";
    if (!form.propertyType) newErrors.propertyType = "Property type is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({
      ...form,
      price: parseFloat(form.price),
      bedrooms: parseInt(form.bedrooms),
      bathrooms: parseInt(form.bathrooms),
      areaSqFt: parseFloat(form.areaSqFt),
    });
  };

  const inputClass = (field) =>
    `w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${
      errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Beachfront Villa in Galle"
          className={inputClass("title")}
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="Describe the property..."
          className={inputClass("description")}
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
      </div>

      {/* Location & Price */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Colombo, Sri Lanka"
            className={inputClass("location")}
          />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Price (LKR)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="5000000"
            min="0"
            className={inputClass("price")}
          />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
        </div>
      </div>

      {/* Type & Area */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Property Type</label>
          <select
            name="propertyType"
            value={form.propertyType}
            onChange={handleChange}
            className={inputClass("propertyType")}
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Area (sq ft)</label>
          <input
            type="number"
            name="areaSqFt"
            value={form.areaSqFt}
            onChange={handleChange}
            min="0"
            className={inputClass("areaSqFt")}
          />
        </div>
      </div>

      {/* Bedrooms & Bathrooms */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Bedrooms</label>
          <input
            type="number"
            name="bedrooms"
            value={form.bedrooms}
            onChange={handleChange}
            min="0"
            className={inputClass("bedrooms")}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Bathrooms</label>
          <input
            type="number"
            name="bathrooms"
            value={form.bathrooms}
            onChange={handleChange}
            min="0"
            className={inputClass("bathrooms")}
          />
        </div>
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Image URL (optional)</label>
        <input
          type="url"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="https://..."
          className={inputClass("imageUrl")}
        />
      </div>

      {/* Available Toggle */}
      <div className="flex items-center gap-3 py-2">
        <input
          type="checkbox"
          name="available"
          id="available"
          checked={form.available}
          onChange={handleChange}
          className="w-4 h-4 accent-emerald-600"
        />
        <label htmlFor="available" className="text-sm text-gray-700 font-medium">
          Mark as Available
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-60"
        >
          {loading ? "Saving..." : initialData ? "Update Property" : "Add Property"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-lg text-sm transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;
