import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllProperties,
  searchProperties,
  getPropertiesByType,
} from "../../services/propertyService";

const PROPERTY_TYPES = ["ALL", "APARTMENT", "HOUSE", "VILLA", "STUDIO", "COMMERCIAL", "LAND"];

const TYPE_COLORS = {
  APARTMENT: "bg-blue-100 text-blue-700",
  HOUSE: "bg-amber-100 text-amber-700",
  VILLA: "bg-purple-100 text-purple-700",
  STUDIO: "bg-pink-100 text-pink-700",
  COMMERCIAL: "bg-gray-100 text-gray-700",
  LAND: "bg-green-100 text-green-700",
};

const formatPrice = (p) =>
  new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(p);

export default function PropertyListing() {
  const navigate = useNavigate();
  const [allProperties, setAllProperties] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState("ALL");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllProperties();
      const available = data.filter((p) => p.available);
      setAllProperties(available);
      setProperties(available);
    } catch {
      setError("Failed to load properties. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (val) => {
    setSearchTerm(val);
    applyFilters(val, activeType);
  };

  const handleTypeFilter = (type) => {
    setActiveType(type);
    applyFilters(searchTerm, type);
  };

  const applyFilters = (search, type) => {
    let filtered = allProperties;
    if (type !== "ALL") {
      filtered = filtered.filter((p) => p.propertyType === type);
    }
    if (search.trim()) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title?.toLowerCase().includes(lower) ||
          p.location?.toLowerCase().includes(lower) ||
          p.description?.toLowerCase().includes(lower)
      );
    }
    setProperties(filtered);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .card-hover { transition: transform .3s ease, box-shadow .3s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
        .img-zoom img { transition: transform .5s ease; }
        .img-zoom:hover img { transform: scale(1.05); }
      `}</style>

      {/* ── Page Header ── */}
      <section className="pt-36 pb-10 px-6 bg-stone-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-2">Browse Listings</p>
          <h1 className="font-display text-white text-4xl md:text-5xl font-semibold mb-4">Available Properties</h1>
          <p className="text-stone-400 text-base max-w-xl mx-auto">
            Explore our curated selection of premium properties across Sri Lanka's most sought-after locations.
          </p>

          {/* Search Bar */}
          <div className="mt-8 bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-2 max-w-2xl mx-auto shadow-xl">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by title, location or description..."
              className="flex-1 px-4 py-3 text-stone-700 text-sm outline-none rounded-xl placeholder-stone-400"
            />
            <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-xl transition-colors whitespace-nowrap">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="sticky top-20 z-40 bg-white border-b border-stone-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 overflow-x-auto">
          {PROPERTY_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => handleTypeFilter(type)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
                activeType === type
                  ? "bg-amber-500 text-white border-amber-500"
                  : "bg-white text-stone-600 border-stone-200 hover:border-amber-400"
              }`}
            >
              {type}
            </button>
          ))}
          <span className="ml-auto text-xs text-stone-400 whitespace-nowrap">
            {properties.length} {properties.length === 1 ? "property" : "properties"} found
          </span>
        </div>
      </section>

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {loading && (
          <div className="text-center py-24">
            <div className="inline-block w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-stone-400 text-sm">Loading properties...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-stone-500 font-medium">{error}</p>
            <button onClick={fetchAll} className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-xl text-sm hover:bg-amber-600 transition-colors">
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && properties.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🏗️</div>
            <p className="font-display text-stone-700 text-2xl font-semibold mb-2">No Properties Found</p>
            <p className="text-stone-400 text-sm">Try adjusting your search or filter criteria.</p>
            <button
              onClick={() => { setSearchTerm(""); setActiveType("ALL"); setProperties(allProperties); }}
              className="mt-6 px-6 py-2 border border-stone-300 text-stone-600 rounded-xl text-sm hover:border-amber-500 hover:text-amber-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {!loading && !error && properties.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PublicPropertyCard key={property.id} property={property} navigate={navigate} />
            ))}
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="bg-stone-900 text-stone-400 py-10 px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-500 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">PE</span>
            </div>
            <span className="font-display text-white text-lg">Platinum Estate</span>
          </div>
          <p className="text-xs text-stone-600">© 2026 Platinum Estate. All rights reserved. Built by Group 14.02 Project G277.</p>
        </div>
      </footer>
    </div>
  );
}

function PublicPropertyCard({ property, navigate }) {
  const { id, title, description, location, price, propertyType,
          bedrooms, bathrooms, areaSqFt, imageUrl } = property;

  const handleBookNow = () => {
    navigate('/booking', {
      state: {
        propertyId: id,
        propertyTitle: title,
        totalPrice: price,
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden card-hover border border-stone-100 flex flex-col">
      <div className="relative overflow-hidden h-52 img-zoom bg-gradient-to-br from-stone-100 to-stone-200">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl opacity-20">🏠</span>
          </div>
        )}
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${TYPE_COLORS[propertyType] || "bg-gray-100 text-gray-600"}`}>
          {propertyType}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-stone-800 text-lg font-semibold leading-tight mb-1 line-clamp-1">{title}</h3>
        <p className="text-stone-400 text-xs mb-3 flex items-center gap-1">
          <span>📍</span> {location}
        </p>
        <p className="text-stone-400 text-xs line-clamp-2 mb-4 leading-relaxed">{description}</p>

        <div className="flex items-center gap-3 text-stone-500 text-xs mb-4 border-t border-stone-100 pt-3">
          {bedrooms > 0 && <span>🛏 {bedrooms} Beds</span>}
          {bathrooms > 0 && <span>🚿 {bathrooms} Baths</span>}
          {areaSqFt > 0 && <span>📐 {areaSqFt} sqft</span>}
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <p className="font-display text-amber-600 text-lg font-semibold">{formatPrice(price)}</p>
            <button className="text-xs px-4 py-2 rounded-lg bg-stone-900 hover:bg-amber-500 text-white transition-colors">
              View Details
            </button>
          </div>
          <button
            onClick={handleBookNow}
            className="w-full text-xs px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-colors"
          >
            📅 Book This Property
          </button>
        </div>
      </div>
    </div>
  );
}