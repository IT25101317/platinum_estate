// src/components/faq/FAQModal.jsx
import { useState, useEffect } from "react";

const CATEGORIES = ["General", "Properties", "Bookings", "Payments", "Reviews"];

const FAQModal = ({ isOpen, onClose, onSubmit, editData }) => {
  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "General",
    isActive: true,
    displayOrder: 0,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm({
        question: editData.question || "",
        answer: editData.answer || "",
        category: editData.category || "General",
        isActive: editData.isActive !== undefined ? editData.isActive : true,
        displayOrder: editData.displayOrder || 0,
      });
    } else {
      setForm({ question: "", answer: "", category: "General", isActive: true, displayOrder: 0 });
    }
    setErrors({});
  }, [editData, isOpen]);

  const validate = () => {
    const errs = {};
    if (!form.question.trim()) errs.question = "Question is required";
    else if (form.question.length > 500) errs.question = "Max 500 characters";
    if (!form.answer.trim()) errs.answer = "Answer is required";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setSubmitting(true);
    try {
      await onSubmit({ ...form, displayOrder: Number(form.displayOrder) });
      onClose();
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">
            {editData ? "Edit FAQ" : "Add New FAQ"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
              {errors.submit}
            </div>
          )}

          {/* Question */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="question"
              value={form.question}
              onChange={handleChange}
              placeholder="e.g. How do I book a property?"
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.question ? "border-red-400 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.question && <p className="text-red-500 text-xs mt-1">{errors.question}</p>}
          </div>

          {/* Answer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Answer <span className="text-red-500">*</span>
            </label>
            <textarea
              name="answer"
              value={form.answer}
              onChange={handleChange}
              rows={4}
              placeholder="Write a clear and helpful answer..."
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                errors.answer ? "border-red-400 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.answer && <p className="text-red-500 text-xs mt-1">{errors.answer}</p>}
          </div>

          {/* Category & Order */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
              <input
                type="number"
                name="displayOrder"
                value={form.displayOrder}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Active toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="w-4 h-4 rounded accent-blue-600"
            />
            <label htmlFor="isActive" className="text-sm text-gray-700">
              Active (visible to users)
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-60"
            >
              {submitting ? "Saving..." : editData ? "Update FAQ" : "Create FAQ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FAQModal;
