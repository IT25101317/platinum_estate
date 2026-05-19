// src/pages/faq/FAQPage.jsx
// Public-facing FAQ page — users can view, search, and filter FAQs
import { useState } from "react";
import { usePublicFAQ } from "../../hooks/useFAQ";
import FAQCard from "../../components/faq/FAQCard";

const FAQPage = () => {
  const { faqs, categories, loading, error, filterByCategory, search } = usePublicFAQ();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setSearchTerm("");
    filterByCategory(cat);
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setActiveCategory("All");
    search(val);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 py-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-white mb-3">Frequently Asked Questions</h1>
        <p className="text-blue-200 text-lg mb-8">Everything you need to know about PlatinumEstate</p>

        {/* Search */}
        <div className="max-w-lg mx-auto relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search questions..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* States */}
        {loading && (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Loading FAQs...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-6 py-4 text-sm">
            Failed to load FAQs: {error}
          </div>
        )}

        {!loading && !error && faqs.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg font-medium">No FAQs found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        )}

        {/* FAQ list grouped by category */}
        {!loading && !error && faqs.length > 0 && (() => {
          const grouped = faqs.reduce((acc, faq) => {
            if (!acc[faq.category]) acc[faq.category] = [];
            acc[faq.category].push(faq);
            return acc;
          }, {});

          return Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="mb-8">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                {cat}
                <span className="flex-1 h-px bg-gray-200" />
              </h2>
              <div className="space-y-2">
                {items.map((faq) => <FAQCard key={faq.id} faq={faq} />)}
              </div>
            </div>
          ));
        })()}

        {/* Contact banner */}
        <div className="mt-12 bg-white border border-gray-200 rounded-2xl p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Still have questions?</h3>
          <p className="text-gray-500 text-sm mb-4">Our support team is ready to help you</p>
          <a
            href="mailto:support@platinumestate.com"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            ✉ Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
