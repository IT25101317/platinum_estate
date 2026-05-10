import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [remember, setRemember] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setError('Invalid email or password. Please try again.')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex font-sans overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        body { font-family: 'DM Sans', sans-serif; background: #0a0a0a; }
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .glow-amber { box-shadow: 0 0 40px rgba(245, 158, 11, 0.15); }
        .input-dark {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: #e7e5e4;
          transition: all 0.3s ease;
        }
        .input-dark::placeholder { color: rgba(255,255,255,0.25); }
        .input-dark:focus {
          background: rgba(255,255,255,0.07);
          border-color: rgba(245, 158, 11, 0.6);
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
          outline: none;
        }
        .btn-amber {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          transition: all 0.3s ease;
        }
        .btn-amber:hover {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          box-shadow: 0 8px 25px rgba(245, 158, 11, 0.35);
          transform: translateY(-1px);
        }
        .btn-amber:active { transform: translateY(0); }
        .btn-amber:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .glass-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(20px);
        }
        .divider-line {
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent);
        }
        .social-btn {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.3s ease;
        }
        .social-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.15);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-1 { animation: float 6s ease-in-out infinite; }
        .float-2 { animation: float 8s ease-in-out infinite 1s; }
        .float-3 { animation: float 7s ease-in-out infinite 2s; }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #f59e0b, #fcd34d, #f59e0b, #fcd34d);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .amber-dot {
          width: 6px; height: 6px;
          background: #f59e0b;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 8px rgba(245,158,11,0.8);
        }
      `}</style>

      {/* ── Left Panel ── */}
      <div
        className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-14 overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=90')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-950/85 to-neutral-900/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent"></div>

        {/* Floating Cards */}
        <div className="absolute top-32 right-12 float-1">
          <div className="glass-card rounded-2xl p-4 w-52">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <span className="text-lg">🏡</span>
              </div>
              <div>
                <p className="text-white text-xs font-semibold">New Listing</p>
                <p className="text-white/40 text-xs">Colombo 07</p>
              </div>
            </div>
            <p className="text-amber-400 text-sm font-bold">LKR 45,000,000</p>
          </div>
        </div>

        <div className="absolute top-64 right-28 float-2">
          <div className="glass-card rounded-2xl p-4 w-44">
            <p className="text-white/50 text-xs mb-1">Properties Sold</p>
            <p className="font-display text-amber-400 text-3xl font-semibold">840+</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="amber-dot"></span>
              <p className="text-emerald-400 text-xs">↑ 12% this month</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-48 right-10 float-3">
          <div className="glass-card rounded-2xl p-4 w-48">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-sm">⭐</div>
              <div>
                <p className="text-white text-xs font-semibold">Client Rating</p>
                <p className="text-amber-400 text-xs font-bold">4.9 / 5.0</p>
              </div>
            </div>
            <p className="text-white/40 text-xs">Based on 840+ reviews</p>
          </div>
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center glow-amber">
              <span className="text-white text-sm font-bold">PE</span>
            </div>
            <span className="font-display text-white text-2xl tracking-wide">Platinum Estate</span>
          </Link>
        </div>

        {/* Bottom Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="amber-dot"></span>
            <p className="text-amber-400 text-sm tracking-widest uppercase font-medium">Premium Real Estate</p>
          </div>
          <h2 className="font-display text-white text-5xl font-semibold leading-tight mb-5">
            Find Your Perfect<br />
            <span className="shimmer-text">Dream Property</span>
          </h2>
          <p className="text-white/50 text-base leading-relaxed max-w-sm">
            Access thousands of premium listings, connect with expert agents, and make your real estate journey seamless.
          </p>
          <div className="flex items-center gap-8 mt-10">
            {[
              { val: '1,200+', label: 'Listings' },
              { val: '15+', label: 'Years' },
              { val: '98%', label: 'Satisfaction' },
            ].map(s => (
              <div key={s.label}>
                <p className="font-display text-amber-400 text-2xl font-semibold">{s.val}</p>
                <p className="text-white/40 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-neutral-950 relative">

        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">

          {/* Mobile Logo */}
          <Link to="/" className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">PE</span>
            </div>
            <span className="font-display text-white text-xl tracking-wide">Platinum Estate</span>
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="amber-dot"></span>
              <p className="text-amber-400 text-xs tracking-widest uppercase">Secure Login</p>
            </div>
            <h1 className="font-display text-white text-5xl font-semibold mb-2">Welcome Back</h1>
            <p className="text-white/40 text-base">Sign in to access your property dashboard.</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Form */}
          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-white/60 text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 text-sm">✉️</span>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-dark w-full pl-10 pr-4 py-3.5 rounded-xl text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-white/60 text-sm font-medium">Password</label>
                <a href="#" className="text-amber-400 text-xs hover:text-amber-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 text-sm">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-dark w-full pl-10 pr-12 py-3.5 rounded-xl text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors text-sm"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setRemember(!remember)}
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${remember ? 'bg-amber-500 border-amber-500' : 'border-white/15 bg-transparent'}`}
              >
                {remember && <span className="text-white text-xs font-bold">✓</span>}
              </button>
              <span
                className="text-white/40 text-sm cursor-pointer"
                onClick={() => setRemember(!remember)}
              >
                Remember me for 30 days
              </span>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-amber w-full py-4 text-white font-semibold rounded-xl text-base flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>Sign In <span>→</span></>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px divider-line"></div>
            <span className="text-white/20 text-sm">or continue with</span>
            <div className="flex-1 h-px divider-line"></div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="social-btn py-3 rounded-xl text-white/60 text-sm font-medium flex items-center justify-center gap-2 hover:text-white transition-colors">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
              Google
            </button>
            <button className="social-btn py-3 rounded-xl text-white/60 text-sm font-medium flex items-center justify-center gap-2 hover:text-white transition-colors">
              <span>🍎</span>
              Apple
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-white/30 text-sm mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
              Create one free →
            </Link>
          </p>

          {/* Security note */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="text-white/20 text-xs">🔐</span>
            <p className="text-white/20 text-xs">256-bit SSL encrypted · Your data is safe</p>
          </div>
        </div>
      </div>
    </div>
  )
}
