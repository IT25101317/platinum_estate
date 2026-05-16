import { useState, useEffect, useRef } from 'react'
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
    gradient: 'from-amber-500/20 to-orange-600/5',
  },
  {
    icon: '💰',
    title: 'Sell Property',
    desc: 'List your property and connect with serious buyers through our platform.',
    gradient: 'from-yellow-500/20 to-amber-600/5',
  },
  {
    icon: '🔑',
    title: 'Rent & Lease',
    desc: 'Explore rental options that fit your lifestyle and budget perfectly.',
    gradient: 'from-amber-400/20 to-yellow-600/5',
  },
  {
    icon: '📋',
    title: 'Property Valuation',
    desc: 'Get accurate market valuations from our certified real estate experts.',
    gradient: 'from-orange-500/20 to-amber-500/5',
  },
]

const TAG_STYLES = {
  Featured: { bg: 'bg-amber-500', dot: '#f59e0b' },
  New:      { bg: 'bg-emerald-500', dot: '#10b981' },
  'Hot Deal': { bg: 'bg-rose-500', dot: '#f43f5e' },
}

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

function AnimatedSection({ children, className = '', delay = 0 }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [propertyType, setPropertyType] = useState('All')
  const [hoveredCard, setHoveredCard] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onMove = e => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="min-h-screen font-sans" style={{ background: '#0a0a0f', color: '#e8e0d0' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@200;300;400;500&display=swap');

        * { box-sizing: border-box; }
        body { margin: 0; background: #0a0a0f; }
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body   { font-family: 'Outfit', sans-serif; }

        .grain::before {
          content: '';
          position: fixed; inset: 0; z-index: 9999;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.4;
        }

        .hero-bg {
          background-image:
            linear-gradient(to bottom, rgba(10,10,15,0.5) 0%, rgba(10,10,15,0.2) 40%, rgba(10,10,15,0.85) 100%),
            url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&q=90');
          background-size: cover;
          background-position: center;
        }

        .cursor-glow {
          position: fixed;
          width: 600px; height: 600px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          background: radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          transition: left 0.4s ease, top 0.4s ease;
        }

        .nav-glass {
          backdrop-filter: blur(20px) saturate(180%);
          background: rgba(10,10,15,0.8);
          border-bottom: 1px solid rgba(245,158,11,0.1);
        }

        .nav-link {
          position: relative;
          color: rgba(232,224,208,0.7);
          font-size: 0.82rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          padding-bottom: 2px;
          transition: color 0.3s;
        }
        .nav-link::after {
          content: '';
          position: absolute; bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: #f59e0b;
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: #f59e0b; }
        .nav-link:hover::after { width: 100%; }

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(32px) skewY(1deg); }
          to   { opacity: 1; transform: translateY(0) skewY(0deg); }
        }
        .h1 { animation: heroFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .h2 { animation: heroFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .h3 { animation: heroFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
        .h4 { animation: heroFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
        .h5 { animation: heroFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.7s both; }

        .search-bar {
          background: rgba(18,18,26,0.95);
          border: 1px solid rgba(245,158,11,0.2);
          backdrop-filter: blur(20px);
          box-shadow: 0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,158,11,0.05) inset;
        }
        .search-input {
          background: transparent;
          color: #e8e0d0;
          border: none; outline: none;
          font-family: 'Outfit', sans-serif;
        }
        .search-input::placeholder { color: rgba(232,224,208,0.3); }
        .search-select {
          background: transparent;
          color: #e8e0d0;
          border: none; outline: none;
          font-family: 'Outfit', sans-serif;
          border-left: 1px solid rgba(245,158,11,0.15);
        }
        .search-select option { background: #12121a; }

        .city-pill {
          border: 1px solid rgba(245,158,11,0.2);
          color: rgba(232,224,208,0.6);
          background: rgba(245,158,11,0.04);
          transition: all 0.25s;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
        }
        .city-pill:hover {
          background: rgba(245,158,11,0.12);
          border-color: rgba(245,158,11,0.5);
          color: #f59e0b;
        }

        .stat-card {
          border-left: 1px solid rgba(245,158,11,0.12);
          transition: border-color 0.3s;
        }
        .stat-card:first-child { border-left: none; }
        .stat-card:hover { border-color: rgba(245,158,11,0.4); }

        .prop-card {
          background: rgba(18,18,26,0.9);
          border: 1px solid rgba(245,158,11,0.08);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.4s ease,
                      border-color 0.3s;
        }
        .prop-card:hover {
          transform: translateY(-10px) scale(1.01);
          box-shadow: 0 30px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,158,11,0.2);
          border-color: rgba(245,158,11,0.3);
        }
        .prop-card .img-wrap img {
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .prop-card:hover .img-wrap img { transform: scale(1.08); }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 30%, #fef3c7 50%, #fbbf24 70%, #f59e0b 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .svc-card {
          background: rgba(15,15,22,0.95);
          border: 1px solid rgba(245,158,11,0.06);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                      border-color 0.3s,
                      box-shadow 0.4s;
        }
        .svc-card:hover {
          transform: translateY(-8px);
          border-color: rgba(245,158,11,0.25);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4), 0 0 40px rgba(245,158,11,0.04);
        }
        .svc-icon {
          width: 52px; height: 52px;
          background: rgba(245,158,11,0.08);
          border: 1px solid rgba(245,158,11,0.15);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem;
          transition: background 0.3s, transform 0.3s;
        }
        .svc-card:hover .svc-icon {
          background: rgba(245,158,11,0.15);
          transform: scale(1.1) rotate(-3deg);
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50%       { transform: translateY(6px); opacity: 1; }
        }
        .scroll-dot { animation: bounce 1.8s ease-in-out infinite; }

        .gold-line {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(245,158,11,0.4), transparent);
        }

        @keyframes floatOrb {
          0%, 100% { transform: translateY(0) translateX(0); }
          33%  { transform: translateY(-20px) translateX(10px); }
          66%  { transform: translateY(10px) translateX(-8px); }
        }
        .orb { animation: floatOrb 8s ease-in-out infinite; pointer-events: none; }
        .orb2 { animation: floatOrb 11s ease-in-out 2s infinite; }

        .cta-bg {
          background-image:
            linear-gradient(135deg, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.7) 50%, rgba(10,10,15,0.92) 100%),
            url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80');
          background-size: cover; background-position: center;
        }

        .footer-bg { background: rgba(6,6,10,0.98); border-top: 1px solid rgba(245,158,11,0.08); }
        .footer-link { color: rgba(232,224,208,0.4); font-size: 0.85rem; text-decoration: none; transition: color 0.2s; }
        .footer-link:hover { color: #f59e0b; }

        .btn-gold {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #0a0a0f; font-weight: 600;
          border: none; cursor: pointer;
          transition: all 0.3s;
          position: relative; overflow: hidden;
        }
        .btn-gold::after {
          content: '';
          position: absolute; inset: 0;
          background: rgba(255,255,255,0);
          transition: background 0.3s;
        }
        .btn-gold:hover::after { background: rgba(255,255,255,0.1); }
        .btn-gold:hover { box-shadow: 0 8px 30px rgba(245,158,11,0.4); transform: translateY(-1px); }

        .btn-outline {
          background: transparent;
          border: 1px solid rgba(245,158,11,0.3);
          color: #e8e0d0; cursor: pointer;
          transition: all 0.3s;
        }
        .btn-outline:hover {
          border-color: #f59e0b;
          background: rgba(245,158,11,0.06);
          box-shadow: 0 0 20px rgba(245,158,11,0.1);
        }

        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(245,158,11,0.4); }
          70%  { box-shadow: 0 0 0 6px rgba(245,158,11,0); }
          100% { box-shadow: 0 0 0 0 rgba(245,158,11,0); }
        }
        .tag-pulse { animation: pulse-ring 2.5s ease-out infinite; }

        .section-label {
          font-family: 'Outfit', sans-serif;
          font-size: 0.72rem; letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #f59e0b;
          display: flex; align-items: center; gap: 10px;
        }
        .section-label::before, .section-label::after {
          content: ''; flex: 0 0 30px; height: 1px;
          background: rgba(245,158,11,0.4);
        }
      `}</style>

      {/* Cursor glow */}
      <div className="cursor-glow" style={{ left: mousePos.x, top: mousePos.y }} />

      {/* Grain texture */}
      <div className="grain" />

      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={scrolled
          ? { padding: '12px 0', backdropFilter: 'blur(20px)', background: 'rgba(10,10,15,0.9)', borderBottom: '1px solid rgba(245,158,11,0.1)' }
          : { padding: '22px 0', background: 'transparent' }
        }
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(245,158,11,0.3)',
            }}>
              <span style={{ color: '#0a0a0f', fontSize: '0.7rem', fontWeight: 800, fontFamily: 'Outfit' }}>PE</span>
            </div>
            <span className="font-display" style={{ color: '#e8e0d0', fontSize: '1.2rem', fontWeight: 600, letterSpacing: '0.02em' }}>
              Platinum Estate
            </span>
          </Link>

          {/* ── Nav Links — Booking added here ── */}
          <div className="hidden md:flex items-center gap-8">
            {[
              ['/',          'Home'],
              ['/property',  'Properties'],
              ['/booking',   'Booking'],
              ['/about',     'About'],
              ['/contact',   'Contact'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="nav-link font-body">{label}</Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button className="btn-outline font-body" style={{ fontSize: '0.8rem', padding: '9px 20px', borderRadius: 10 }}>
                Sign In
              </button>
            </Link>
            <button className="btn-gold font-body" style={{ fontSize: '0.8rem', padding: '9px 20px', borderRadius: 10 }}>
              List Property
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero-bg relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="orb" style={{
          position: 'absolute', top: '20%', left: '10%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div className="orb2" style={{
          position: 'absolute', bottom: '20%', right: '8%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217,119,6,0.1) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }} />

        <div style={{
          position: 'absolute', inset: 0,
          transform: `translateY(${scrollY * 0.3}px)`,
          backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&q=90')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          zIndex: -1,
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,15,0.5) 0%, rgba(10,10,15,0.25) 40%, rgba(10,10,15,0.9) 100%)',
        }} />

        <div className="relative z-10 text-center px-6" style={{ maxWidth: 900 }}>
          <p className="h1 section-label justify-center" style={{ marginBottom: 20 }}>
            Sri Lanka's Premium Real Estate Portal
          </p>

          <h1 className="font-display h2" style={{
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: 700, lineHeight: 1.1, marginBottom: 12,
            color: '#f0e8d8',
          }}>
            Find Your Perfect
          </h1>
          <h1 className="font-display h3 shimmer-text" style={{
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: 700, fontStyle: 'italic', lineHeight: 1.1, marginBottom: 28,
          }}>
            Dream Home
          </h1>

          <p className="font-body h4" style={{
            color: 'rgba(232,224,208,0.6)', fontSize: '1.1rem', fontWeight: 300,
            maxWidth: 600, margin: '0 auto 48px', lineHeight: 1.8,
          }}>
            Discover luxury villas, modern apartments, and serene family homes across Sri Lanka's most sought-after locations.
          </p>

          {/* Search Bar */}
          <div className="h5 search-bar" style={{
            borderRadius: 18, padding: '6px', display: 'flex',
            flexWrap: 'wrap', gap: 6, maxWidth: 750, margin: '0 auto 20px',
          }}>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by city, area or property name..."
              className="search-input font-body"
              style={{ flex: 1, minWidth: 200, padding: '12px 16px', fontSize: '0.88rem', borderRadius: 12 }}
            />
            <select
              value={propertyType}
              onChange={e => setPropertyType(e.target.value)}
              className="search-select font-body"
              style={{ padding: '12px 16px', fontSize: '0.88rem', minWidth: 130 }}
            >
              {['All', 'House', 'Apartment', 'Villa', 'Land'].map(t => <option key={t}>{t}</option>)}
            </select>
            <Link to="/property" style={{ textDecoration: 'none' }}>
              <button className="btn-gold font-body" style={{
                padding: '12px 24px', fontSize: '0.88rem', borderRadius: 12, whiteSpace: 'nowrap',
              }}>
                Search Properties
              </button>
            </Link>
          </div>

          {/* Quick filters */}
          <div className="h5" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            {['Colombo', 'Galle', 'Kandy', 'Negombo', 'Kurunegala'].map(city => (
              <button key={city} className="city-pill font-body"
                style={{ padding: '7px 18px', borderRadius: 999, fontSize: '0.78rem' }}>
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-dot" style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        }}>
          <span className="font-body" style={{ color: 'rgba(245,158,11,0.5)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(245,158,11,0.5), transparent)' }} />
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: '#0d0d14', padding: '56px 24px', borderTop: '1px solid rgba(245,158,11,0.06)' }}>
        <AnimatedSection>
          <div className="max-w-5xl mx-auto" style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          }}>
            {STATS.map((s, i) => (
              <div key={s.label} className="stat-card" style={{ textAlign: 'center', padding: '20px 24px' }}>
                <p className="font-display shimmer-text" style={{ fontSize: '2.8rem', fontWeight: 700, marginBottom: 6 }}>{s.value}</p>
                <p className="font-body" style={{ color: 'rgba(232,224,208,0.4)', fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <div className="gold-line" />

      {/* ── Featured Properties ── */}
      <section style={{ padding: '100px 24px', background: '#0a0a0f' }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <p className="section-label" style={{ marginBottom: 14 }}>Handpicked for You</p>
                <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 600, color: '#f0e8d8', margin: 0 }}>
                  Featured Properties
                </h2>
              </div>
              <Link to="/property" className="font-body" style={{
                color: 'rgba(245,158,11,0.7)', fontSize: '0.85rem', textDecoration: 'none',
                borderBottom: '1px solid rgba(245,158,11,0.3)', paddingBottom: 2,
                transition: 'color 0.2s',
              }}>
                View All Properties →
              </Link>
            </div>
          </AnimatedSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
            {FEATURED.map((p, i) => (
              <AnimatedSection key={p.id} delay={i * 120}>
                <div
                  className="prop-card"
                  style={{ borderRadius: 20, overflow: 'hidden' }}
                  onMouseEnter={() => setHoveredCard(p.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="img-wrap" style={{ position: 'relative', height: 230, overflow: 'hidden' }}>
                    <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(10,10,15,0.7) 0%, transparent 60%)',
                    }} />
                    <span className={`${TAG_STYLES[p.tag].bg} tag-pulse font-body`} style={{
                      position: 'absolute', top: 16, left: 16,
                      fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em',
                      padding: '5px 12px', borderRadius: 999, color: '#fff',
                      textTransform: 'uppercase',
                    }}>
                      {p.tag}
                    </span>
                    <span className="font-body" style={{
                      position: 'absolute', top: 16, right: 16,
                      background: 'rgba(10,10,15,0.75)', backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(245,158,11,0.2)',
                      color: 'rgba(232,224,208,0.8)', fontSize: '0.7rem',
                      padding: '5px 12px', borderRadius: 999,
                    }}>
                      {p.type}
                    </span>
                  </div>

                  <div style={{ padding: '22px 24px 24px' }}>
                    <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f0e8d8', margin: '0 0 6px' }}>{p.title}</h3>
                    <p className="font-body" style={{ color: 'rgba(232,224,208,0.4)', fontSize: '0.82rem', margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ color: '#f59e0b' }}>📍</span>{p.location}
                    </p>

                    <div className="font-body" style={{
                      display: 'flex', gap: 16, fontSize: '0.78rem', color: 'rgba(232,224,208,0.5)',
                      borderTop: '1px solid rgba(245,158,11,0.08)', paddingTop: 16, marginBottom: 20,
                    }}>
                      <span>🛏 {p.beds} Beds</span>
                      <span>🚿 {p.baths} Baths</span>
                      <span>📐 {p.sqft} sqft</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <p className="font-display shimmer-text" style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>{p.price}</p>
                      <Link to="/property" style={{ textDecoration: 'none' }}>
                        <button className="btn-gold font-body" style={{ fontSize: '0.78rem', padding: '9px 18px', borderRadius: 10 }}>
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-line" />

      {/* ── Services ── */}
      <section style={{ background: '#0d0d14', padding: '100px 24px' }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <p className="section-label justify-center" style={{ marginBottom: 16 }}>What We Offer</p>
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600, color: '#f0e8d8', margin: 0 }}>
                Our Services
              </h2>
            </div>
          </AnimatedSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {SERVICES.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 100}>
                <div className={`svc-card bg-gradient-to-br ${s.gradient}`} style={{ borderRadius: 20, padding: '32px 28px', height: '100%' }}>
                  <div className="svc-icon" style={{ marginBottom: 20 }}>{s.icon}</div>
                  <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 600, color: '#f0e8d8', marginBottom: 10 }}>{s.title}</h3>
                  <p className="font-body" style={{ color: 'rgba(232,224,208,0.45)', fontSize: '0.88rem', lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-bg" style={{ padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600, borderRadius: '50%',
          border: '1px solid rgba(245,158,11,0.06)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800, height: 800, borderRadius: '50%',
          border: '1px solid rgba(245,158,11,0.03)',
          pointerEvents: 'none',
        }} />

        <AnimatedSection>
          <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <p className="section-label justify-center" style={{ marginBottom: 16 }}>Ready to Begin?</p>
            <h2 className="font-display" style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700,
              color: '#f0e8d8', marginBottom: 20, lineHeight: 1.2,
            }}>
              Let Us Help You Find<br />
              <span className="shimmer-text">Your Next Property</span>
            </h2>
            <p className="font-body" style={{
              color: 'rgba(232,224,208,0.5)', fontSize: '1.05rem',
              marginBottom: 48, lineHeight: 1.8, fontWeight: 300,
            }}>
              Whether you're buying, selling, or renting — our expert agents are here to guide you every step of the way.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/property" style={{ textDecoration: 'none' }}>
                <button className="btn-gold font-body" style={{ padding: '14px 36px', fontSize: '0.9rem', borderRadius: 12 }}>
                  Browse Properties
                </button>
              </Link>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <button className="btn-outline font-body" style={{ padding: '14px 36px', fontSize: '0.9rem', borderRadius: 12 }}>
                  Contact an Agent
                </button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── Footer ── */}
      <footer className="footer-bg" style={{ padding: '72px 24px 32px' }}>
        <div className="max-w-7xl mx-auto" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32, height: 32,
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#0a0a0f', fontSize: '0.65rem', fontWeight: 800, fontFamily: 'Outfit' }}>PE</span>
              </div>
              <span className="font-display" style={{ color: '#f0e8d8', fontSize: '1.05rem' }}>Platinum Estate</span>
            </div>
            <p className="font-body" style={{ color: 'rgba(232,224,208,0.3)', fontSize: '0.84rem', lineHeight: 1.8, margin: 0 }}>
              Sri Lanka's most trusted real estate portal connecting buyers, sellers, and agents.
            </p>
          </div>
          {[
            { title: 'Quick Links', links: ['Home', 'Properties', 'Agents', 'Blog'] },
            { title: 'Property Types', links: ['Apartments', 'Villas', 'Houses', 'Land'] },
            { title: 'Contact', links: ['Colombo, Sri Lanka', '+94 11 234 5678', 'info@platinumestate.lk'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-body" style={{ color: '#f0e8d8', fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 18 }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(l => (
                  <li key={l}><a href="#" className="footer-link font-body">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="gold-line" style={{ marginBottom: 24 }} />
        <p className="font-body" style={{ textAlign: 'center', color: 'rgba(232,224,208,0.2)', fontSize: '0.78rem', margin: 0 }}>
          © 2026 Platinum Estate. All rights reserved. Built by Group 14.02 Project G277.
        </p>
      </footer>
    </div>
  )
}
