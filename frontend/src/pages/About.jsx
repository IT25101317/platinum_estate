import { Link } from 'react-router-dom'

const TEAM = [
  {
    name: 'Ashan Perera',
    role: 'CEO & Founder',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    desc: '15+ years in Sri Lankan real estate market.',
  },
  {
    name: 'Dilani Fernando',
    role: 'Head of Sales',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    desc: 'Expert in luxury property transactions across Colombo.',
  },
  {
    name: 'Rohan Silva',
    role: 'Property Consultant',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    desc: 'Specialist in villa and commercial property listings.',
  },
  {
    name: 'Nimasha Jayawardena',
    role: 'Client Relations',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    desc: 'Dedicated to ensuring a seamless client experience.',
  },
]

const STATS = [
  { value: '1,200+', label: 'Properties Listed' },
  { value: '840+', label: 'Happy Clients' },
  { value: '15+', label: 'Years Experience' },
  { value: '98%', label: 'Satisfaction Rate' },
]

const VALUES = [
  { icon: '🤝', title: 'Trust', desc: 'We build lasting relationships through transparency and honest communication with every client.' },
  { icon: '🏆', title: 'Excellence', desc: 'We deliver premium service and curated listings that meet the highest standards of quality.' },
  { icon: '🌍', title: 'Local Expertise', desc: "Deep knowledge of Sri Lanka's property market gives our clients a decisive advantage." },
  { icon: '💡', title: 'Innovation', desc: 'We leverage modern technology to make property search and transactions seamless.' },
]

export default function About() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .card-hover { transition: transform .3s ease, box-shadow .3s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
      `}</style>

      {/* ── Hero Banner ── */}
      <section
        className="pt-36 pb-20 px-6 relative"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(10,10,10,0.80), rgba(10,10,10,0.4)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">Who We Are</p>
          <h1 className="font-display text-white text-5xl md:text-6xl font-semibold mb-6 leading-tight">
            Sri Lanka's Most Trusted<br />Real Estate Partner
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Since 2010, Platinum Estate has been connecting buyers, sellers, and renters with premium properties across Sri Lanka — built on a foundation of trust, expertise, and excellence.
          </p>
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

      {/* ── Our Story ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-amber-600 text-sm font-medium tracking-widest uppercase mb-3">Our Story</p>
            <h2 className="font-display text-stone-800 text-4xl md:text-5xl font-semibold mb-6 leading-tight">
              Built on Passion for Property
            </h2>
            <p className="text-stone-500 text-base leading-relaxed mb-4">
              Platinum Estate was founded in 2010 with a simple mission — to make finding the perfect property in Sri Lanka a joyful, transparent, and stress-free experience.
            </p>
            <p className="text-stone-500 text-base leading-relaxed mb-4">
              Over the years, we've grown from a small Colombo-based agency to Sri Lanka's most comprehensive real estate platform, serving clients across Colombo, Galle, Kandy, Negombo, and beyond.
            </p>
            <p className="text-stone-500 text-base leading-relaxed">
              Whether you're buying your first home, investing in commercial property, or searching for the perfect villa, our team of experienced agents is here to guide you every step of the way.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80"
              alt="About Platinum Estate"
              className="rounded-2xl w-full h-96 object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-amber-500 text-white rounded-2xl p-6 shadow-xl">
              <p className="font-display text-4xl font-semibold">15+</p>
              <p className="text-sm text-amber-100">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values ── */}
      <section className="bg-stone-100 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-600 text-sm font-medium tracking-widest uppercase mb-2">What Drives Us</p>
            <h2 className="font-display text-stone-800 text-4xl md:text-5xl font-semibold">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-6 card-hover border border-stone-100">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-display text-stone-800 text-xl font-semibold mb-2">{v.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-600 text-sm font-medium tracking-widest uppercase mb-2">The People Behind Us</p>
            <h2 className="font-display text-stone-800 text-4xl md:text-5xl font-semibold">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map(member => (
              <div key={member.name} className="text-center card-hover">
                <div className="relative mb-4 inline-block">
                  <img src={member.img} alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-amber-100 shadow-md" />
                </div>
                <h3 className="font-display text-stone-800 text-xl font-semibold">{member.name}</h3>
                <p className="text-amber-600 text-xs font-medium tracking-wide uppercase mb-2">{member.role}</p>
                <p className="text-stone-400 text-sm leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-24 px-6"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(10,10,10,0.85), rgba(10,10,10,0.5)), url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-amber-400 text-sm tracking-widest uppercase mb-3">Get Started Today</p>
          <h2 className="font-display text-white text-4xl md:text-5xl font-semibold mb-6 leading-tight">
            Ready to Find Your<br />Dream Property?
          </h2>
          <p className="text-white/60 text-lg mb-10 leading-relaxed">
            Browse hundreds of verified listings or speak with one of our expert agents today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/property">
              <button className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors">
                Browse Properties
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-8 py-3.5 border border-white/30 hover:border-white text-white font-medium rounded-xl transition-colors">
                Contact an Agent
              </button>
            </Link>
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
            { title: 'Quick Links', links: ['Home', 'Properties', 'About', 'Contact'] },
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