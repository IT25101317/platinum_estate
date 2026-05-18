// src/pages/payments/components/PaymentFormModal.jsx
import { useState, useEffect } from "react";

const METHODS = ["CREDIT_CARD", "DEBIT_CARD", "BANK_TRANSFER", "CASH", "ONLINE"];
const STATUSES = ["PENDING", "COMPLETED", "FAILED", "REFUNDED"];
const CURRENCIES = ["LKR", "USD", "EUR", "GBP"];

const emptyForm = {
  transactionId: "", amount: "", currency: "LKR",
  paymentMethod: "BANK_TRANSFER", status: "PENDING",
  payerName: "", payerEmail: "", propertyId: "",
  propertyTitle: "", description: "",
};

export default function PaymentFormModal({ isOpen, onClose, onSubmit, editingPayment }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const isEdit = !!editingPayment;

  useEffect(() => {
    if (isOpen) {
      setForm(editingPayment ? {
        transactionId: editingPayment.transactionId || "",
        amount: editingPayment.amount || "",
        currency: editingPayment.currency || "LKR",
        paymentMethod: editingPayment.paymentMethod || "BANK_TRANSFER",
        status: editingPayment.status || "PENDING",
        payerName: editingPayment.payerName || "",
        payerEmail: editingPayment.payerEmail || "",
        propertyId: editingPayment.propertyId || "",
        propertyTitle: editingPayment.propertyTitle || "",
        description: editingPayment.description || "",
      } : emptyForm);
      setErrors({});
    }
  }, [editingPayment, isOpen]);

  if (!isOpen) return null;

  // ─── Validation ─────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.payerName.trim()) e.payerName = "Payer name is required";
    if (!form.amount) e.amount = "Amount is required";
    else if (isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = "Amount must be a positive number";
    if (!form.paymentMethod) e.paymentMethod = "Payment method is required";
    if (!form.status) e.status = "Status is required";
    if (form.payerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.payerEmail))
      e.payerEmail = "Invalid email format";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSaving(true);
    const payload = {
      ...form,
      // ✅ FIX 1: Auto-generate transactionId if blank (prevents @NotBlank backend error)
      transactionId: form.transactionId.trim() || `TXN-${Date.now()}`,
      amount: Number(form.amount),
      propertyId: form.propertyId ? Number(form.propertyId) : null,
    };
    const result = await onSubmit(payload);
    setSaving(false);
    if (result.success) onClose();
    else setErrors({ api: result.message });
  };

  const inputCls = (field) =>
    `w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400
     ${errors[field] ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}`;

  const Field = ({ label, name, type = "text", placeholder = "", children }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
        {label}
      </label>
      {children || (
        <input name={name} type={type} value={form[name]}
          onChange={handleChange} placeholder={placeholder}
          className={inputCls(name)} />
      )}
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {isEdit ? "Edit Payment" : "Record New Payment"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {isEdit ? "Update payment details" : "Add a new payment transaction"}
            </p>
          </div>
          <button onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto space-y-4">
          {errors.api && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
              {errors.api}
            </div>
          )}

          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Payer Name" name="payerName" placeholder="e.g. John Silva" />
            <Field label="Payer Email" name="payerEmail" type="email" placeholder="john@email.com" />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-4">
            <Field label="Amount" name="amount" type="number" placeholder="0.00" />
            <Field label="Currency" name="currency">
              {/* ✅ FIX 2: Added explicit value={c} so submitted value matches backend enum */}
              <select name="currency" value={form.currency} onChange={handleChange} className={inputCls("currency")}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Status" name="status">
              {/* ✅ FIX 2: Added explicit value={s} so submitted value matches backend enum */}
              <select name="status" value={form.status} onChange={handleChange} className={inputCls("status")}>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
            </Field>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Payment Method" name="paymentMethod">
              {/* ✅ FIX 3: value={m} keeps underscore for backend, display replaces _ with space for UI */}
              <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className={inputCls("paymentMethod")}>
                {METHODS.map((m) => (
                  <option key={m} value={m}>{m.replace(/_/g, " ")}</option>
                ))}
              </select>
              {errors.paymentMethod && <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>}
            </Field>
            <Field label="Transaction ID" name="transactionId" placeholder="Auto-generated if blank" />
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Property ID" name="propertyId" type="number" placeholder="Optional" />
            <Field label="Property Title" name="propertyTitle" placeholder="e.g. Villa in Colombo 7" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
              Description
            </label>
            <textarea name="description" value={form.description} onChange={handleChange}
              placeholder="Payment notes or remarks..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none h-20" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-xl flex-shrink-0">
          <button onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={saving}
            className="px-5 py-2 text-sm font-medium bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-60 transition">
            {saving ? "Saving..." : isEdit ? "Update Payment" : "Record Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}