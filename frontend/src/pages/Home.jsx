import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const FEATURED = [
  {
    id: 1,
    title: 'Cinnamon Grand Residences',
    location: 'Colombo 03, Sri Lanka',
    price: 'LKR 45,000,000',
    type: 'Luxury Apartment',
    beds: 4, baths: 3, sqft: '3,200',
    tag: 'Featured',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  },
  {
    id: 2,
    title: 'Rajagiriya Lake View Villa',
    location: 'Rajagiriya, Sri Lanka',
    price: 'LKR 78,500,000',
    type: 'Villa',
    beds: 5, baths: 4, sqft: '5,100',
    tag: 'New',
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
  },
  {
    id: 3,
    title: 'Battaramulla Garden Home',
    location: 'Battaramulla, Sri Lanka',
    price: 'LKR 28,000,000',
    type: 'House',
    beds: 3, baths: 2, sqft: '2,400',
    tag: 'Hot Deal',
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
  },
]

const STATS = [
  { value: '1,200+', label: 'Properties Listed' },
  { value: '840+', label: 'Happy Clients' },
  { value: '15+', label: 'Years Experience' },
  { value: '98%', label: 'Satisfaction Rate' },
]

const SERVICES = [
  {
    icon: '🏠',
    title: 'Buy Property',
    desc: 'Find your dream home from thousands of verified listings across Sri Lanka.',
  },
  {
    icon: '💰',
    title: 'Sell Property',
    desc: 'List your property and connect with serious buyers through our platform.',
  },
  {
    icon: '🔑',
    title: 'Rent & Lease',
    desc: 'Explore rental options that fit your lifestyle and budget perfectly.',
  },
  {
    icon: '📋',
    title: 'Property Valuation',
    desc: 'Get accurate market valuations from our certified real estate experts.',
  },
]

const TAG_COLORS = {
  Featured: 'bg-amber-500 text-white',
  New: 'bg-emerald-500 text-white',
  'Hot Deal': 'bg-rose-500 text-white',
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [propertyType, setPropertyType] = useState('All')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-stone-50 font-sans">

      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .hero-bg {
          background-image: linear-gradient(to bottom, rgba(15,15,15,0.55) 0%, rgba(15,15,15,0.3) 60%, rgba(15,15,15,0.7) 100%),
            url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&q=90');
          background-size: cover;
          background-position: center;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up-1 { animation: fadeUp .8s ease forwards; }
        .fade-up-2 { animation: fadeUp .8s .15s ease both; }
        .fade-up-3 { animation: fadeUp .8s .3s ease both; }
        .fade-up-4 { animation: fadeUp .8s .45s ease both; }
        .card-hover { transition: transform .3s ease, box-shadow .3s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
        .img-zoom img { transition: transform .5s ease; }
        .img-zoom:hover img { transform: scale(1.05); }
      `}</style>

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">PE</span>
            </div>
            <span className={`font-display text-xl font-600 tracking-wide ${scrolled ? 'text-stone-800' : 'text-white'}`}>
              Platinum Estate
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/"
              className={`text-sm font-medium tracking-wide transition-colors ${scrolled ? 'text-stone-600 hover:text-amber-600' : 'text-white/90 hover:text-white'}`}>
              Home
            </Link>
            <Link to="/property"
              className={`text-sm font-medium tracking-wide transition-colors ${scrolled ? 'text-stone-600 hover:text-amber-600' : 'text-white/90 hover:text-white'}`}>
              Properties
            </Link>
            <a href="#about"
              className={`text-sm font-medium tracking-wide transition-colors ${scrolled ? 'text-stone-600 hover:text-amber-600' : 'text-white/90 hover:text-white'}`}>
              About
            </a>
            <a href="#contact"
              className={`text-sm font-medium tracking-wide transition-colors ${scrolled ? 'text-stone-600 hover:text-amber-600' : 'text-white/90 hover:text-white'}`}>
              Contact
            </a>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm font-medium px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition-colors">
              List Property
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero-bg min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
        <div className="max-w-4xl mx-auto">
          <p className="fade-up-1 text-amber-400 text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Sri Lanka's Premium Real Estate Portal
          </p>
          <h1 className="fade-up-2 font-display text-white text-5xl md:text-7xl font-semibold leading-tight mb-6">
            Find Your Perfect<br />
            <span className="text-amber-400 italic">Dream Home</span>
          </h1>
          <p className="fade-up-3 text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Discover luxury villas, modern apartments, and serene family homes across Sri Lanka's most sought-after locations.
          </p>

          {/* Search Bar */}
          <div className="fade-up-4 bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto shadow-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by city, area or property name..."
              className="flex-1 px-4 py-3 text-stone-700 text-sm outline-none rounded-xl placeholder-stone-400"
            />
            <select
              value={propertyType}
              onChange={e => setPropertyType(e.target.value)}
              className="px-4 py-3 text-stone-700 text-sm outline-none border-l border-stone-100 bg-transparent min-w-[140px]"
            >
              {['All', 'House', 'Apartment', 'Villa', 'Land'].map(t => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <Link to="/property">
              <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-xl transition-colors whitespace-nowrap">
                Search Properties
              </button>
            </Link>
          </div>

          {/* Quick filters */}
          <div className="fade-up-4 flex flex-wrap items-center justify-center gap-3 mt-6">
            {['Colombo', 'Galle', 'Kandy', 'Negombo', 'Kurunegala'].map(city => (
              <button key={city}
                className="px-4 py-1.5 rounded-full border border-white/30 text-white/80 text-xs hover:bg-white/10 transition-colors">
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/30 animate-pulse"></div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-stone-900 py-14">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <p className="font-display text-amber-400 text-4xl font-semibold mb-1">{s.value}</p>
              <p className="text-stone-400 text-sm tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Properties ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-amber-600 text-sm font-medium tracking-widest uppercase mb-2">Handpicked for You</p>
            <h2 className="font-display text-stone-800 text-4xl md:text-5xl font-semibold">Featured Properties</h2>
          </div>
          <Link to="/property"
            className="hidden md:flex items-center gap-2 text-sm text-stone-500 hover:text-amber-600 transition-colors border-b border-stone-300 hover:border-amber-500 pb-0.5">
            View All Properties →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED.map(p => (
            <div key={p.id} className="bg-white rounded-2xl overflow-hidden card-hover border border-stone-100">
              <div className="relative overflow-hidden h-56 img-zoom">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                <span className={`absolute top-4 left-4 text-xs font-medium px-3 py-1 rounded-full ${TAG_COLORS[p.tag]}`}>
                  {p.tag}
                </span>
                <span className="absolute top-4 right-4 bg-white/90 text-stone-700 text-xs font-medium px-3 py-1 rounded-full">
                  {p.type}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-stone-800 text-xl font-semibold mb-1">{p.title}</h3>
                <p className="text-stone-400 text-sm mb-4 flex items-center gap-1">
                  <span>📍</span>{p.location}
                </p>
                <div className="flex items-center gap-4 text-stone-500 text-xs mb-5 border-t border-stone-100 pt-4">
                  <span>🛏 {p.beds} Beds</span>
                  <span>🚿 {p.baths} Baths</span>
                  <span>📐 {p.sqft} sqft</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-display text-amber-600 text-xl font-semibold">{p.price}</p>
                  <Link to="/property">
                    <button className="text-xs px-4 py-2 rounded-lg bg-stone-900 hover:bg-amber-500 text-white transition-colors">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="bg-stone-100 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-600 text-sm font-medium tracking-widest uppercase mb-2">What We Offer</p>
            <h2 className="font-display text-stone-800 text-4xl md:text-5xl font-semibold">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(s => (
              <div key={s.title} className="bg-white rounded-2xl p-6 card-hover border border-stone-100">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-display text-stone-800 text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative py-24 px-6 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(10,10,10,0.85), rgba(10,10,10,0.5)), url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80')`,
          backgroundSize: 'cover', backgroundPosition: 'center'
        }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-amber-400 text-sm tracking-widest uppercase mb-3">Ready to Begin?</p>
          <h2 className="font-display text-white text-4xl md:text-5xl font-semibold mb-6 leading-tight">
            Let Us Help You Find<br />Your Next Property
          </h2>
          <p className="text-white/60 text-lg mb-10 leading-relaxed">
            Whether you're buying, selling, or renting — our expert agents are here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/property">
              <button className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors">
                Browse Properties
              </button>
            </Link>
            <button className="px-8 py-3.5 border border-white/30 hover:border-white text-white font-medium rounded-xl transition-colors">
              Contact an Agent
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-stone-900 text-stone-400 py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-amber-500 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">PE</span>
              </div>
              <span className="font-display text-white text-lg">Platinum Estate</span>
            </div>
            <p className="text-sm leading-relaxed text-stone-500">
              Sri Lanka's most trusted real estate portal connecting buyers, sellers, and agents.
            </p>
          </div>
          {[
            { title: 'Quick Links', links: ['Home', 'Properties', 'Agents', 'Blog'] },
            { title: 'Property Types', links: ['Apartments', 'Villas', 'Houses', 'Land'] },
            { title: 'Contact', links: ['Colombo, Sri Lanka', '+94 11 234 5678', 'info@platinumestate.lk'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-white text-sm font-medium mb-4 tracking-wide">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l}><a href="#" className="text-sm hover:text-amber-400 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto border-t border-stone-800 mt-10 pt-6 text-center text-xs text-stone-600">
          © 2026 Platinum Estate. All rights reserved. Built by Group 14.02 Project G277.
        </div>
      </footer>
    </div>
  )
}