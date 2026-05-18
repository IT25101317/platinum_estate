// frontend/src/pages/booking/BookingForm.jsx
// Used for BOTH creating new bookings and editing existing ones

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  createBooking,
  getBookingById,
  updateBooking,
} from '../../services/bookingService'

const EMPTY_FORM = {
  propertyId:    '',
  userId:        '',
  userName:      '',
  userEmail:     '',
  userPhone:     '',
  propertyTitle: '',
  checkInDate:   '',
  checkOutDate:  '',
  totalPrice:    '',
  notes:         '',
  status:        'PENDING',
}

export default function BookingForm({ existingBooking, incomingProperty, onSuccess, onCancel }) {
  const { id }     = useParams()       // exists when editing
  const isEdit     = Boolean(id) || Boolean(existingBooking)
  const navigate   = useNavigate()

  const [form,    setForm]    = useState(() => {
    // Pre-fill from incoming property (navigated from Property Listing)
    if (incomingProperty) {
      return {
        ...EMPTY_FORM,
        propertyId:    incomingProperty.propertyId || '',
        propertyTitle: incomingProperty.propertyTitle || '',
        totalPrice:    incomingProperty.totalPrice || '',
      }
    }
    return EMPTY_FORM
  })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)
  const [saving,  setSaving]  = useState(false)

  // ── Load existing data when editing ──────────────────────────────────────
  useEffect(() => {
    if (existingBooking) {
      setForm({
        propertyId:    existingBooking.propertyId    ?? '',
        userId:        existingBooking.userId        ?? '',
        userName:      existingBooking.userName      ?? '',
        userEmail:     existingBooking.userEmail     ?? '',
        userPhone:     existingBooking.userPhone     ?? '',
        propertyTitle: existingBooking.propertyTitle ?? '',
        checkInDate:   existingBooking.checkInDate   ?? '',
        checkOutDate:  existingBooking.checkOutDate  ?? '',
        totalPrice:    existingBooking.totalPrice    ?? '',
        notes:         existingBooking.notes         ?? '',
        status:        existingBooking.status        ?? 'PENDING',
      })
      return
    }
    if (!isEdit || !id) return
    setLoading(true)
    getBookingById(id)
      .then(data => {
        setForm({
          propertyId:    data.propertyId    ?? '',
          userId:        data.userId        ?? '',
          userName:      data.userName      ?? '',
          userEmail:     data.userEmail     ?? '',
          userPhone:     data.userPhone     ?? '',
          propertyTitle: data.propertyTitle ?? '',
          checkInDate:   data.checkInDate   ?? '',
          checkOutDate:  data.checkOutDate  ?? '',
          totalPrice:    data.totalPrice    ?? '',
          notes:         data.notes         ?? '',
          status:        data.status        ?? 'PENDING',
        })
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id, existingBooking])

  // ── Handle input change ──────────────────────────────────────────────────
  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // ── Submit ───────────────────────────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    // Build payload — convert numbers
    const payload = {
      ...form,
      propertyId: Number(form.propertyId),
      userId:     Number(form.userId),
      totalPrice: Number(form.totalPrice),
    }

    try {
      if (isEdit && id) {
        await updateBooking(id, payload)
      } else if (isEdit && existingBooking) {
        await updateBooking(existingBooking.id, payload)
      } else {
        await createBooking(payload)
      }
      if (onSuccess) {
        onSuccess()
      } else {
        navigate('/booking')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  // ── Field config (keeps JSX clean) ──────────────────────────────────────
  const FIELDS = [
    { name: 'propertyId',    label: 'Property ID',    type: 'number',  placeholder: 'e.g. 1' },
    { name: 'propertyTitle', label: 'Property Title', type: 'text',    placeholder: 'e.g. Cinnamon Grand Residences' },
    { name: 'userId',        label: 'User ID',        type: 'number',  placeholder: 'e.g. 5' },
    { name: 'userName',      label: 'Guest Name',     type: 'text',    placeholder: 'Full name' },
    { name: 'userEmail',     label: 'Guest Email',    type: 'email',   placeholder: 'email@example.com' },
    { name: 'userPhone',     label: 'Phone Number',   type: 'tel',     placeholder: '+94 71 234 5678' },
    { name: 'checkInDate',   label: 'Check-In Date',  type: 'date',    placeholder: '' },
    { name: 'checkOutDate',  label: 'Check-Out Date', type: 'date',    placeholder: '' },
    { name: 'totalPrice',    label: 'Total Price (LKR)', type: 'number', placeholder: 'e.g. 50000' },
  ]

  // ── Render ───────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
      <p className="text-amber-500">Loading booking...</p>
    </div>
  )

  return (
    <div className="min-h-screen p-6" style={{ background: '#0a0a0f', color: '#e8e0d0' }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-amber-500 text-xs tracking-widest uppercase mb-1">
            {isEdit ? 'Update' : 'Create'}
          </p>
          <h1 className="text-3xl font-bold text-amber-50" style={{ fontFamily: 'Playfair Display, serif' }}>
            {isEdit ? 'Edit Booking' : 'New Booking'}
          </h1>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl text-sm text-red-400"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="rounded-2xl p-6 space-y-5"
            style={{ background: 'rgba(18,18,26,0.9)', border: '1px solid rgba(245,158,11,0.1)' }}>

            {/* Dynamic fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FIELDS.map(f => (
                <div key={f.name}>
                  <label className="block text-xs text-amber-500 uppercase tracking-wider mb-1.5">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    name={f.name}
                    value={form[f.name]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    required={f.name !== 'userPhone'}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(245,158,11,0.15)',
                      color: '#e8e0d0',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Status (only shown on edit) */}
            {isEdit && (
              <div>
                <label className="block text-xs text-amber-500 uppercase tracking-wider mb-1.5">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{
                    background: '#12121a',
                    border: '1px solid rgba(245,158,11,0.15)',
                    color: '#e8e0d0',
                  }}>
                  {['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-xs text-amber-500 uppercase tracking-wider mb-1.5">
                Notes (optional)
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Any special requests or notes..."
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(245,158,11,0.15)',
                  color: '#e8e0d0',
                }}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-black"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Saving...' : isEdit ? 'Update Booking' : 'Create Booking'}
              </button>
              <button
                type="button"
                onClick={() => onCancel ? onCancel() : navigate('/booking')}
                className="px-6 py-3 rounded-xl text-sm"
                style={{ border: '1px solid rgba(245,158,11,0.2)', color: '#e8e0d0' }}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
