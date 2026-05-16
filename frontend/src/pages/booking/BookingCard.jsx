// src/pages/booking/BookingCard.jsx

const STATUS_STYLES = {
  PENDING:   "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMED: "bg-teal-50 text-teal-700 border-teal-200",
  CANCELLED: "bg-red-50 text-red-600 border-red-200",
  COMPLETED: "bg-slate-100 text-slate-600 border-slate-200",
};

export default function BookingCard({ booking, onEdit, onDelete, onStatusChange }) {
  const statusStyle = STATUS_STYLES[booking.status] || "bg-slate-100 text-slate-600";

  const nights = Math.ceil(
    (new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Booking #{booking.id}
          </p>
          <p className="mt-0.5 text-base font-bold text-slate-800">
            Property #{booking.propertyId}
          </p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle}`}>
          {booking.status}
        </span>
      </div>

      {/* Details Grid */}
      <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
        <Detail label="Check-In"   value={booking.checkInDate} />
        <Detail label="Check-Out"  value={booking.checkOutDate} />
        <Detail label="Guests"     value={booking.guests} />
        <Detail label="Nights"     value={nights} />
        <Detail label="User ID"    value={booking.userId} />
        <Detail label="Total"      value={`$${Number(booking.totalPrice).toFixed(2)}`} />
      </div>

      {booking.specialRequests && (
        <p className="mb-4 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500 italic">
          "{booking.specialRequests}"
        </p>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => onEdit(booking)}
          className="rounded-lg border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold
                     text-teal-700 transition hover:bg-teal-100">
          Edit
        </button>

        {booking.status === "PENDING" && (
          <button onClick={() => onStatusChange(booking.id, "CONFIRMED")}
            className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold
                       text-blue-700 transition hover:bg-blue-100">
            Confirm
          </button>
        )}

        {booking.status !== "CANCELLED" && booking.status !== "COMPLETED" && (
          <button onClick={() => onStatusChange(booking.id, "CANCELLED")}
            className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold
                       text-orange-700 transition hover:bg-orange-100">
            Cancel
          </button>
        )}

        <button onClick={() => onDelete(booking.id)}
          className="ml-auto rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold
                     text-red-600 transition hover:bg-red-100">
          Delete
        </button>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className="font-semibold text-slate-700">{value}</p>
    </div>
  );
}
