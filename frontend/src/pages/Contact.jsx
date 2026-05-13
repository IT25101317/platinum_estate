import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CONTACT_INFO = [
  {
    icon: '📍',
    title: 'Visit Us',
    lines: ['No. 42, Galle Road', 'Colombo 03, Sri Lanka'],
  },
  {
    icon: '📞',
    title: 'Call Us',
    lines: ['+94 11 234 5678', '+94 77 890 1234'],
  },
  {
    icon: '✉️',
    title: 'Email Us',
    lines: ['info@platinumestate.lk', 'support@platinumestate.lk'],
  },
  {
    icon: '🕐',
    title: 'Working Hours',
    lines: ['Mon – Fri: 9:00 AM – 6:00 PM', 'Sat: 9:00 AM – 1:00 PM'],
  },
]

export default function Contact() {
  const [scrolled, setScrolled] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 1500)
  }

  return (
    <div className="min-h-screen font-sans" style={{ background: '#080808', color: '#e8e0d5' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        body { font-family: 'DM Sans', sans-serif; background: #080808; }
        .font-display { font-family: 'Cormorant Garamond', serif; }

        .input-dark {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: #e8e0d5;
          transition: all 0.3s ease;
          width: 100%;
          border-radius: 12px;
          padding: 14px 18px;
          font-size: 14px;
          outline: none;
          font-family: 'DM Sans', sans-serif;
        }
        .input-dark::placeholder { color: rgba(255,255,255,0.25); }
        .input-dark:focus {
          background: rgba(255,255,255,0.07);
          border-color: rgba(245,158,11,0.5);
          box-shadow: 0 0 0 3px rgba(245,158,11,0.08);
        }

        .btn-gold {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .btn-gold::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }
        .btn-gold:hover::before { left: 100%; }
        .btn-gold:hover {
          box-shadow: 0 8px 30px rgba(245,158,11,0.4);
          transform: translateY(-2px);
        }

        .nav-link {
          position: relative;
          padding-bottom: 2px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: #f59e0b;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }

        .info-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.4s ease;
          border-radius: 20px;
          padding: 28px;
        }
        .info-card:hover {
          background: rgba(245,158,11,0.05);
          border-color: rgba(245,158,11,0.2);
          transform: translateY(-4px);
        }

        .form-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          padding: 40px;
        }

        .amber-line {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, #f59e0b, transparent);
          display: inline-block;
          vertical-align: middle;
          margin-right: 12px;
        }
        .amber-dot {
          width: 6px; height: 6px;
          background: #f59e0b;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 8px rgba(245,158,11,0.8);
        }
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up-1 { animation: fadeUp 0.8s 0.1s ease both; }
        .fade-up-2 { animation: fadeUp 0.8s 0.25s ease both; }
        .fade-up-3 { animation: fadeUp 0.8s 0.4s ease both; }

        .social-btn {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.3s ease;
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          cursor: pointer;
        }
        .social-btn:hover {
          background: rgba(245,158,11,0.1);
          border-color: rgba(245,158,11,0.3);
        }

        .map-container {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          overflow: hidden;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(8,8,8,0.95)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          padding: scrolled ? '14px 0' : '22px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 0 20px rgba(245,158,11,0.3)' }}>
              <span className="text-white text-xs font-bold">PE</span>
            </div>
            <span className="font-display text-xl tracking-wide" style={{ color: '#e8e0d5' }}>Platinum Estate</span>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            {[
              { label: 'Home', to: '/' },
              { label: 'Properties', to: '/property' },
              { label: 'About', to: '/about' },
              { label: 'Contact', to: '/contact' },
            ].map(item => (
              <Link key={item.label} to={item.to}
                className="nav-link text-sm font-medium transition-colors"
                style={{ color: item.label === 'Contact' ? '#f59e0b' : 'rgba(232,224,213,0.7)' }}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <button className="text-sm font-medium px-5 py-2.5 rounded-lg border transition-all duration-300"
                style={{ borderColor: 'rgba(245,158,11,0.3)', color: '#f59e0b', background: 'rgba(245,158,11,0.05)' }}>
                Sign In
              </button>
            </Link>
            <button className="btn-gold text-sm font-medium px-5 py-2.5 rounded-lg text-white">
              List Property
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero Banner ── */}
      <section
        className="pt-36 pb-20 px-6 relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(8,8,8,0.6), rgba(8,8,8,0.85)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="fade-up-1 flex items-center justify-center gap-3 mb-4">
            <span className="amber-line"></span>
            <p className="text-xs font-medium tracking-[0.3em] uppercase" style={{ color: '#f59e0b' }}>Get In Touch</p>
            <span className="amber-line" style={{ transform: 'scaleX(-1)' }}></span>
          </div>
          <h1 className="fade-up-2 font-display font-semibold leading-tight mb-5" style={{ fontSize: 'clamp(40px, 6vw, 64px)', color: '#e8e0d5' }}>
            We'd Love to<br />
            <span style={{
              background: 'linear-gradient(90deg, #f59e0b, #fde68a, #f59e0b)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontStyle: 'italic',
            }}>Hear From You</span>
          </h1>
          <p className="fade-up-3 text-base leading-relaxed max-w-xl mx-auto" style={{ color: 'rgba(232,224,213,0.5)' }}>
            Whether you're looking to buy, sell, or simply explore — our expert team is ready to assist you at every step.
          </p>
        </div>
      </section>

      {/* ── Contact Info Cards ── */}
      <section className="py-20 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CONTACT_INFO.map((info) => (
            <div key={info.title} className="info-card">
              <div className="text-3xl mb-4">{info.icon}</div>
              <h3 className="font-display text-lg font-semibold mb-3" style={{ color: '#f59e0b' }}>{info.title}</h3>
              {info.lines.map((line, i) => (
                <p key={i} className="text-sm leading-relaxed" style={{ color: 'rgba(232,224,213,0.5)' }}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Form + Map ── */}
      <section className="py-20 px-6" style={{ background: '#080808' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Form */}
          <div className="form-card">
            <div className="flex items-center gap-3 mb-2">
              <span className="amber-dot"></span>
              <p className="text-xs tracking-widest uppercase" style={{ color: '#f59e0b' }}>Send a Message</p>
            </div>
            <h2 className="font-display text-3xl font-semibold mb-8" style={{ color: '#e8e0d5' }}>
              Let's Start a Conversation
            </h2>

            {/* Success */}
            {success && (
              <div className="mb-6 p-4 rounded-xl text-sm flex items-center gap-2"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399' }}>
                ✅ Message sent successfully! We'll get back to you soon.
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 rounded-xl text-sm flex items-center gap-2"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
                ⚠️ {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: 'rgba(232,224,213,0.5)' }}>
                    Full Name <span style={{ color: '#f59e0b' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Silva"
                    className="input-dark"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: 'rgba(232,224,213,0.5)' }}>
                    Email Address <span style={{ color: '#f59e0b' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="input-dark"
                  />
                </div>
              </div>

              {/* Phone + Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: 'rgba(232,224,213,0.5)' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+94 77 000 0000"
                    className="input-dark"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: 'rgba(232,224,213,0.5)' }}>
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-dark"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                  >
                    <option value="" style={{ background: '#1a1a1a' }}>Select a subject</option>
                    <option value="buy" style={{ background: '#1a1a1a' }}>Buy Property</option>
                    <option value="sell" style={{ background: '#1a1a1a' }}>Sell Property</option>
                    <option value="rent" style={{ background: '#1a1a1a' }}>Rent / Lease</option>
                    <option value="valuation" style={{ background: '#1a1a1a' }}>Property Valuation</option>
                    <option value="other" style={{ background: '#1a1a1a' }}>Other</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: 'rgba(232,224,213,0.5)' }}>
                  Message <span style={{ color: '#f59e0b' }}>*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  rows={5}
                  className="input-dark"
                  style={{ resize: 'none' }}
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-gold w-full py-4 text-white font-semibold rounded-xl text-base flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>Send Message →</>
                )}
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-6">

            {/* Map */}
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798467128887!2d79.84787731477326!3d6.914682495003434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2597a0e00000f%3A0x10000000000000!2sColombo%2003%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1620000000000!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
                title="Platinum Estate Location"
              />
            </div>

            {/* Follow Us */}
            <div className="info-card">
              <h3 className="font-display text-xl font-semibold mb-2" style={{ color: '#e8e0d5' }}>Follow Us</h3>
              <p className="text-sm mb-5" style={{ color: 'rgba(232,224,213,0.4)' }}>
                Stay updated with the latest listings and news.
              </p>
              <div className="flex gap-3">
                {['📘', '📷', '🐦', '💼', '▶️'].map((icon, i) => (
                  <div key={i} className="social-btn">{icon}</div>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="info-card">
              <h3 className="font-display text-xl font-semibold mb-4" style={{ color: '#e8e0d5' }}>Quick Contact</h3>
              <div className="space-y-3">
                <a href="tel:+94112345678" className="flex items-center gap-3 text-sm transition-colors group"
                  style={{ color: 'rgba(232,224,213,0.5)' }}>
                  <span className="text-lg">📞</span>
                  <span>+94 11 234 5678</span>
                </a>
                <a href="mailto:info@platinumestate.lk" className="flex items-center gap-3 text-sm transition-colors"
                  style={{ color: 'rgba(232,224,213,0.5)' }}>
                  <span className="text-lg">✉️</span>
                  <span>info@platinumestate.lk</span>
                </a>
                <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(232,224,213,0.5)' }}>
                  <span className="text-lg">📍</span>
                  <span>No. 42, Galle Road, Colombo 03</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)' }} className="py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
              <span className="text-white text-xs font-bold">PE</span>
            </div>
            <span className="font-display text-lg" style={{ color: '#e8e0d5' }}>Platinum Estate</span>
          </div>
          <p className="text-xs" style={{ color: 'rgba(232,224,213,0.2)' }}>
            © 2026 Platinum Estate. All rights reserved. Built by Group 14.02 · Project G277
          </p>
        </div>
      </footer>
    </div>
  )
}
