// src/pages/admin/components/AdminFormModal.jsx
import { useState, useEffect } from "react";

const ROLES    = ["SUPER_ADMIN", "ADMIN", "MODERATOR"];
const STATUSES = ["ACTIVE", "INACTIVE", "SUSPENDED"];

const emptyForm = {
  fullName: "", email: "", password: "",
  phoneNumber: "", role: "ADMIN", status: "ACTIVE",
};

export default function AdminFormModal({ isOpen, onClose, onSubmit, editingAdmin }) {
  const [form, setForm]     = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const isEdit = !!editingAdmin;

  // Pre-fill form when editing
  useEffect(() => {
    if (isOpen) {
      setForm(
        editingAdmin
          ? {
              fullName:    editingAdmin.fullName,
              email:       editingAdmin.email,
              password:    "", // leave blank = keep existing password
              phoneNumber: editingAdmin.phoneNumber || "",
              role:        editingAdmin.role,
              status:      editingAdmin.status,
            }
          : emptyForm
      );
      setErrors({});
      setShowPass(false);
    }
  }, [editingAdmin, isOpen]);

  if (!isOpen) return null;

  // ─── Validation ─────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.fullName.trim())  e.fullName = "Full name is required";
    if (!form.email.trim())     e.email    = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email format";
    if (!isEdit && !form.password.trim())
      e.password = "Password is required";
    if (form.password && form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    if (!form.role)   e.role   = "Role is required";
    if (!form.status) e.status = "Status is required";
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
    const payload = { ...form };
    // Don't send empty password on edit
    if (isEdit && !payload.password) delete payload.password;
    const result = await onSubmit(payload);
    setSaving(false);
    if (result.success) onClose();
    else setErrors({ api: result.message });
  };

  // ─── Shared input style ─────────────────────────────────────────────────────
  const inputCls = (field) =>
    `w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white
     ${errors[field] ? "border-red-400 bg-red-50" : "border-gray-300"}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {isEdit ? "Edit Admin" : "Add New Admin"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {isEdit ? "Update admin account details" : "Create a new admin account"}
            </p>
          </div>
          <button onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">

          {/* API error */}
          {errors.api && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
              {errors.api}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input name="fullName" value={form.fullName} onChange={handleChange}
              placeholder="e.g. Sarah Fernando" className={inputCls("fullName")} />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input name="email" type="email" value={form.email} onChange={handleChange}
              placeholder="admin@example.com" className={inputCls("email")} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isEdit ? "New Password" : "Password"}
              {isEdit && <span className="text-gray-400 font-normal ml-1">(leave blank to keep current)</span>}
            </label>
            <div className="relative">
              <input name="password" type={showPass ? "text" : "password"}
                value={form.password} onChange={handleChange}
                placeholder={isEdit ? "Enter new password..." : "Min. 6 characters"}
                className={inputCls("password") + " pr-10"} />
              <button type="button" onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs">
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input name="phoneNumber" type="tel" value={form.phoneNumber} onChange={handleChange}
              placeholder="+94 77 000 0000" className={inputCls("phoneNumber")} />
          </div>

          {/* Role & Status — side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select name="role" value={form.role} onChange={handleChange}
                className={inputCls("role")}>
                {ROLES.map((r) => <option key={r} value={r}>{r.replace("_", " ")}</option>)}
              </select>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select name="status" value={form.status} onChange={handleChange}
                className={inputCls("status")}>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-xl">
          <button onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={saving}
            className="px-5 py-2 text-sm font-medium bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-60 transition">
            {saving ? "Saving..." : isEdit ? "Update Admin" : "Create Admin"}
          </button>
        </div>
      </div>
    </div>
  );
}
