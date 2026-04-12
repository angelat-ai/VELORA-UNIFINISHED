import { useNavigate } from 'react-router-dom'
import VeloraLogo from '../components/VeloraLogo'

export default function LandingPage() {
  const nav = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', overflow: 'hidden' }}>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 60px',
        background: 'rgba(10,10,10,0.85)',
        borderBottom: '1px solid #1a1a1a',
        backdropFilter: 'blur(12px)',
      }}>
        <VeloraLogo size={36} textSize={18} />
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {['Home','Creators','Community','Explore Gym','About Us'].map(item => (
            <span key={item} style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#888',
              cursor: 'pointer', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = '#c9a84c'}
              onMouseLeave={e => e.target.style.color = '#888'}
            >{item}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-outline" onClick={() => nav('/login')} style={{ fontSize: 13, padding: '9px 20px' }}>
            Log In
          </button>
          <button className="btn-gold" onClick={() => nav('/signup')} style={{ fontSize: 13, padding: '9px 20px' }}>
            Sign Up Now
          </button>
        </div>
      </nav>

      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 40px 80px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 40,
        }}>
          <svg width="90" height="90" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="46" stroke="#c9a84c" strokeWidth="3" fill="none" opacity="0.6" />
            <circle cx="50" cy="50" r="40" stroke="#c9a84c" strokeWidth="1" fill="none" opacity="0.2" />
            <path d="M22 32 L50 72 L78 32" stroke="#c9a84c" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M22 32 L30 32" stroke="#c9a84c" strokeWidth="3" strokeLinecap="round" />
            <path d="M78 32 L70 32" stroke="#c9a84c" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div style={{
            width: 1, height: 40, background: 'linear-gradient(to bottom, #c9a84c, transparent)',
          }} />
        </div>

        <p style={{
          fontFamily: 'DM Sans', fontSize: 12, letterSpacing: '4px',
          color: '#c9a84c', marginBottom: 20, textTransform: 'uppercase',
        }}>The Fitness Social Platform</p>

        <h1 style={{
          fontFamily: 'Syne', fontSize: 72, fontWeight: 800,
          lineHeight: 1.05, marginBottom: 24, maxWidth: 800,
          background: 'linear-gradient(135deg, #f5f5f5 0%, #c9a84c 50%, #f5f5f5 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Unlock the<br />Influencer Physique
        </h1>

        <p style={{
          fontFamily: 'DM Sans', fontSize: 18, color: '#888',
          maxWidth: 520, lineHeight: 1.7, marginBottom: 40,
        }}>
          Train, eat, and create like the PROs. Connect with elite fitness creators,
          track your progress, and build your brand all in one platform.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn-gold" onClick={() => nav('/signup')} style={{ fontSize: 15, padding: '14px 36px' }}>
            Get Started
          </button>
          <button className="btn-outline" onClick={() => nav('/login')} style={{ fontSize: 15, padding: '14px 36px' }}>
            Log In
          </button>
        </div>

        <div style={{
          display: 'flex', gap: 48, marginTop: 80,
          borderTop: '1px solid #1a1a1a', paddingTop: 48,
        }}>
          {[
            { label: 'Active Users', value: '0' },
            { label: 'Creators', value: '0' },
            { label: 'Workouts Tracked', value: '0' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Syne', fontSize: 36, fontWeight: 800, color: '#c9a84c' }}>{s.value}</div>
              <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#666', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{
        padding: '100px 60px',
        borderTop: '1px solid #1a1a1a',
        background: '#0d0d0d',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontFamily: 'DM Sans', fontSize: 12, letterSpacing: '4px', color: '#c9a84c', marginBottom: 16 }}>EVERYTHING YOU NEED</p>
          <h2 style={{ fontFamily: 'Syne', fontSize: 48, fontWeight: 700, marginBottom: 16 }}>
            Achieve Your <span style={{ color: '#c9a84c' }}>Dream Body</span>
          </h2>
          <p style={{ color: '#666', fontSize: 16, maxWidth: 500, marginBottom: 64 }}>
            Select the physique you want to achieve from our influencer-inspired options,
            get access to their diet and workout plans and enjoy the results day by day.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: '🏋️', title: 'Track Everything', desc: 'Workouts, nutrition, body measurements, and progress — all in one place with smart analytics.' },
              { icon: '👥', title: 'Creator Economy', desc: 'Sell your workout programs, meal plans, and online coaching directly to your followers.' },
              { icon: '📊', title: 'Body Analytics', desc: 'Detailed physique metrics, body composition tracking, and influencer similarity matching.' },
              { icon: '🔗', title: 'MyFitnessPal Sync', desc: 'Connect your nutrition tracking seamlessly with MyFitnessPal integration.' },
              { icon: '🎯', title: 'Personalized FYP', desc: 'AI-powered For You Page tailored to your fitness goals and body type.' },
              { icon: '🏆', title: 'Community', desc: 'Build accountability, share milestones, and celebrate victories with a supportive community.' },
            ].map(f => (
              <div key={f.title} className="card" style={{ transition: 'border-color 0.25s, transform 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'Syne', fontSize: 18, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 60px', textAlign: 'center', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Syne', fontSize: 42, fontWeight: 700, marginBottom: 20 }}>
            Ready to <span style={{ color: '#c9a84c' }}>Level Up?</span>
          </h2>
          <p style={{ color: '#666', marginBottom: 40 }}>
            Join Velora today. Your physique transformation starts with one decision.
          </p>
          <button className="btn-gold" onClick={() => nav('/signup')} style={{ fontSize: 16, padding: '16px 48px' }}>
            Create Free Account
          </button>
        </div>
      </section>

      <footer style={{
        padding: '40px 60px',
        borderTop: '1px solid #1a1a1a',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#444',
        fontSize: 13,
      }}>
        <VeloraLogo size={28} textSize={14} />
        <span>© 2025 Velora Inc. All Rights Reserved.</span>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy Policy', 'Terms of Service', 'Community Guidelines'].map(t => (
            <span key={t} style={{ cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#c9a84c'}
              onMouseLeave={e => e.target.style.color = '#444'}
            >{t}</span>
          ))}
        </div>
      </footer>
    </div>
  )
}