const TYPE_COLORS = {
  APARTMENT: "bg-blue-100 text-blue-700",
  HOUSE: "bg-amber-100 text-amber-700",
  VILLA: "bg-purple-100 text-purple-700",
  STUDIO: "bg-pink-100 text-pink-700",
  COMMERCIAL: "bg-gray-100 text-gray-700",
  LAND: "bg-green-100 text-green-700",
};

const PropertyCard = ({ property, onEdit, onDelete, onToggle }) => {
  const { id, title, description, location, price, propertyType,
          bedrooms, bathrooms, areaSqFt, available, imageUrl } = property;

  const formatPrice = (p) =>
    new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(p);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Image */}
      <div className="relative h-44 bg-gradient-to-br from-emerald-50 to-teal-100 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl opacity-30">🏠</span>
          </div>
        )}
        {/* Availability Badge */}
        <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full ${
          available ? "bg-emerald-500 text-white" : "bg-red-400 text-white"
        }`}>
          {available ? "Available" : "Unavailable"}
        </span>
        {/* Type Badge */}
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${TYPE_COLORS[propertyType] || "bg-gray-100 text-gray-600"}`}>
          {propertyType}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-800 text-base leading-tight mb-1 line-clamp-1">{title}</h3>
        <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
          <span>📍</span> {location}
        </p>
        <p className="text-xs text-gray-400 line-clamp-2 mb-3">{description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3 text-center">
          <div className="bg-gray-50 rounded-lg py-1.5">
            <div className="text-xs font-bold text-gray-700">{bedrooms}</div>
            <div className="text-xs text-gray-400">Beds</div>
          </div>
          <div className="bg-gray-50 rounded-lg py-1.5">
            <div className="text-xs font-bold text-gray-700">{bathrooms}</div>
            <div className="text-xs text-gray-400">Baths</div>
          </div>
          <div className="bg-gray-50 rounded-lg py-1.5">
            <div className="text-xs font-bold text-gray-700">{areaSqFt}</div>
            <div className="text-xs text-gray-400">sqft</div>
          </div>
        </div>

        {/* Price */}
        <p className="text-emerald-600 font-bold text-lg mb-4">{formatPrice(price)}</p>

        {/* Actions */}
        <div className="mt-auto grid grid-cols-3 gap-2">
          <button
            onClick={() => onEdit(property)}
            className="bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold py-2 rounded-lg transition"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onToggle(id)}
            className="bg-amber-50 hover:bg-amber-100 text-amber-600 text-xs font-semibold py-2 rounded-lg transition"
          >
            🔄 Toggle
          </button>
          <button
            onClick={() => onDelete(id)}
            className="bg-red-50 hover:bg-red-100 text-red-500 text-xs font-semibold py-2 rounded-lg transition"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
