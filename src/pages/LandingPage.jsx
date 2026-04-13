import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import VeloraLogo from '../components/VeloraLogo'

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start || target === 0) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function RevealSection({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  )
}

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
      </svg>
    ),
    title: 'Track Everything',
    desc: 'Workouts, nutrition, body measurements, and progress — all in one place with smart analytics.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Creator Economy',
    desc: 'Sell your workout programs, meal plans, and online coaching directly to your followers.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Body Analytics',
    desc: 'Detailed physique metrics, body composition tracking, and influencer similarity matching.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
    title: 'MyFitnessPal Sync',
    desc: 'Connect your nutrition tracking seamlessly with MyFitnessPal integration.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    title: 'Personalized FYP',
    desc: 'AI-powered For You Page tailored to your fitness goals and body type.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Community',
    desc: 'Build accountability, share milestones, and celebrate victories with a supportive community.',
  },
]

const TESTIMONIALS = [
  { name: 'Marcus T.', handle: '@marcus_lifts', text: 'Velora changed how I track my progress. The body analytics are insane — I can finally see which muscle groups are lagging.', rating: 5 },
  { name: 'Sofia R.', handle: '@sofia_fit', text: 'The influencer matching feature is pure genius. Found a creator with the exact same frame as me and her program works perfectly.', rating: 5 },
  { name: 'Kai D.', handle: '@kai_physique', text: 'As a creator, the subscription system is seamless. I went from 0 to generating income in my first week on Velora.', rating: 5 },
]

const CREATORS_PREVIEW = [
  { name: 'SmartFit', fullName: 'Jeff Nippard', handle: 'smartfit', tag: 'Powerbuilding', price: 12.99 },
  { name: 'KiffyMan', fullName: 'Kiffy Man', handle: 'kiffyman', tag: 'Calisthenics', price: 9.99 },
  { name: 'David Laid', fullName: 'David Laid', handle: 'd_real_dlaid', tag: 'Physique', price: 19.99 },
]

const COMMUNITY_POSTS = [
  { id: 1, author: 'Sarah K.', handle: '@sarah_fit', content: 'Just hit a new PR on deadlifts! 315lbs x 3. The Velora community keeps me motivated! 🔥', likes: 234, comments: 18 },
  { id: 2, author: 'Mike R.', handle: '@mike_lifts', content: 'Day 30 of my transformation challenge. Down 12lbs and feeling stronger than ever. Thanks to everyone for the support! 💪', likes: 189, comments: 24 },
  { id: 3, author: 'Emma L.', handle: '@emma_wellness', content: 'Meal prep Sunday! Anyone else use the MyFitnessPal sync? Game changer for tracking macros. 🥗', likes: 156, comments: 12 },
]

export default function LandingPage() {
  const nav = useNavigate()
  const [heroRef, heroVisible] = useReveal()
  const [statsRef, statsVisible] = useReveal()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const users = useCountUp(12540, 2000, statsVisible)
  const creators = useCountUp(320, 1800, statsVisible)
  const workouts = useCountUp(89200, 2200, statsVisible)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const formatNum = (n) => {
    if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K'
    return n.toString()
  }

  const scrollToSection = (section) => {
    setActiveSection(section)
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>
      <style>{`
        @keyframes glowPulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes pulseGold { 0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,0)} 50%{box-shadow:0 0 20px 4px rgba(201,168,76,0.12)} }
        @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .btn-outline { background:transparent; border:1px solid rgba(201,168,76,0.3); color:#c9a84c; font-family:Syne; font-weight:600; border-radius:8px; cursor:pointer; transition:all 0.2s; }
        .btn-outline:hover { background:rgba(201,168,76,0.08); border-color:#c9a84c; }
        .btn-gold { background:#c9a84c; border:none; color:#080808; font-family:Syne; font-weight:700; border-radius:8px; cursor:pointer; transition:all 0.2s; box-shadow:0 4px 14px rgba(201,168,76,0.2); }
        .btn-gold:hover { background:#e8c46a; transform:scale(1.02); box-shadow:0 6px 20px rgba(201,168,76,0.3); }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 60px',
        background: scrolled ? 'rgba(8,8,8,0.95)' : 'rgba(8,8,8,0.7)',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.06)' : 'transparent'}`,
        backdropFilter: 'blur(20px)',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <VeloraLogo size={34} textSize={17} />

        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {['Home', 'Creators', 'Community', 'Explore Gym'].map((item) => {
            const sectionId = item.toLowerCase().replace(' ', '-')
            return (
              <span
                key={item}
                onClick={() => scrollToSection(sectionId)}
                style={{
                  fontFamily: 'DM Sans', fontSize: 14,
                  color: activeSection === sectionId ? '#c9a84c' : 'rgba(234,234,234,0.5)',
                  cursor: 'pointer',
                  transition: 'color 0.2s, transform 0.2s',
                  display: 'inline-block',
                  borderBottom: activeSection === sectionId ? '2px solid #c9a84c' : 'none',
                  paddingBottom: '4px',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#EAEAEA'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.color = activeSection === sectionId ? '#c9a84c' : 'rgba(234,234,234,0.5)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >{item}</span>
            )
          })}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-outline" onClick={() => nav('/login')} style={{ fontSize: 13, padding: '8px 18px' }}>
            Log In
          </button>
          <button className="btn-gold" onClick={() => nav('/signup')} style={{ fontSize: 13, padding: '8px 18px' }}>
            Sign Up Now
          </button>
        </div>
      </nav>

      <section id="home" style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '120px 40px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800, height: 800,
          background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)',
          animation: 'glowPulse 5s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '20%', left: '10%',
          width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '15%', right: '8%',
          width: 250, height: 250,
          background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div ref={heroRef} style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 36 }}>
            <div style={{
              width: 80, height: 80,
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(201,168,76,0.05)',
              animation: 'pulseGold 3s ease-in-out infinite',
            }}>
              <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="44" stroke="#c9a84c" strokeWidth="3" fill="none" opacity="0.5" />
                <path d="M22 32 L50 70 L78 32" stroke="#c9a84c" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M22 32 L30 32" stroke="#c9a84c" strokeWidth="3" strokeLinecap="round" />
                <path d="M78 32 L70 32" stroke="#c9a84c" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, #c9a84c, transparent)' }} />
          </div>

          <p style={{
            fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '5px',
            color: '#c9a84c', marginBottom: 22, textTransform: 'uppercase', opacity: 0.8,
          }}>The Fitness Social Platform</p>

          <h1 style={{
            fontFamily: 'Syne', fontSize: 78, fontWeight: 800,
            lineHeight: 1.0, marginBottom: 28, maxWidth: 820,
            background: 'linear-gradient(135deg, #EAEAEA 0%, #c9a84c 45%, #e8c46a 55%, #EAEAEA 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            animation: 'gradientShift 5s ease infinite',
          }}>
            Unlock the<br />Influencer Physique
          </h1>

          <p style={{
            fontFamily: 'DM Sans', fontSize: 18,
            color: 'rgba(234,234,234,0.5)',
            maxWidth: 500, lineHeight: 1.8, marginBottom: 44,
          }}>
            Train, eat, and create like the PROs. Connect with elite fitness creators,
            track your progress, and build your brand — all in one platform.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn-gold" onClick={() => nav('/signup')} style={{ fontSize: 15, padding: '14px 40px' }}>
              Get Started
            </button>
            <button className="btn-outline" onClick={() => nav('/login')} style={{ fontSize: 15, padding: '14px 40px' }}>
              Log In
            </button>
          </div>
        </div>

        <div ref={statsRef} style={{
          display: 'flex', gap: 56, marginTop: 80,
          paddingTop: 48, borderTop: '1px solid rgba(255,255,255,0.06)',
          opacity: statsVisible ? 1 : 0,
          transition: 'opacity 0.6s ease 0.3s',
        }}>
          {[
            { label: 'Active Users', value: formatNum(users), raw: 12540 },
            { label: 'Creators', value: formatNum(creators), raw: 320 },
            { label: 'Workouts Tracked', value: formatNum(workouts), raw: 89200 },
          ].map((s, i) => (
            <div key={s.label} style={{
              textAlign: 'center',
              opacity: statsVisible ? 1 : 0,
              transform: statsVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: `all 0.5s ease ${i * 120}ms`,
            }}>
              <div style={{
                fontFamily: 'Syne', fontSize: 40, fontWeight: 800, color: '#c9a84c',
                letterSpacing: '-1px',
              }}>{s.value}</div>
              <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: 'rgba(234,234,234,0.35)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="creators" style={{ padding: '100px 60px', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#0c0c0c' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <RevealSection>
            <p style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '5px', color: '#c9a84c', marginBottom: 16, textTransform: 'uppercase' }}>
              TOP CREATORS
            </p>
            <h2 style={{ fontFamily: 'Syne', fontSize: 48, fontWeight: 800, marginBottom: 16, letterSpacing: '-0.5px' }}>
              Learn from the <span style={{ color: '#c9a84c' }}>Best</span>
            </h2>
            <p style={{ color: 'rgba(234,234,234,0.4)', fontSize: 16, maxWidth: 480, marginBottom: 64, lineHeight: 1.8 }}>
              Get access to exclusive workout programs and meal plans from elite fitness creators.
            </p>
          </RevealSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {CREATORS_PREVIEW.map((c, i) => (
              <RevealSection key={c.name} delay={i * 100}>
                <div style={{
                  background: 'rgba(14,14,14,0.9)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 14, overflow: 'hidden',
                  transition: 'all 0.25s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ height: 64, background: 'linear-gradient(135deg, #161616, #0d0d0d)', position: 'relative' }}>
                    <div style={{
                      position: 'absolute', bottom: -24, left: '50%', transform: 'translateX(-50%)',
                      width: 48, height: 48, borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(201,168,76,0.3), #1a1a1a)',
                      border: '2px solid #0f0f0f',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18, color: '#c9a84c', fontFamily: 'Syne', fontWeight: 800,
                    }}>{c.name[0]}</div>
                  </div>
                  <div style={{ padding: '32px 16px 18px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 13, marginBottom: 2 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: '#c9a84c', marginBottom: 2 }}>{c.tag}</div>
                    <div style={{ fontSize: 11, color: '#2a2a2a', marginBottom: 12 }}>0 subscribers</div>
                    <div style={{ fontSize: 15, color: '#c9a84c', fontFamily: 'Syne', fontWeight: 800, marginBottom: 14 }}>
                      ${c.price}<span style={{ fontSize: 11, color: '#3a3a3a', fontWeight: 400 }}>/mo</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{
                        flex: 1, padding: '8px', fontSize: 11, fontFamily: 'Syne', fontWeight: 700,
                        background: 'transparent', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.3)',
                        borderRadius: 7, cursor: 'pointer',
                      }}>VIEW</button>
                      <button onClick={() => nav('/signup')} style={{
                        flex: 1, padding: '8px', fontSize: 11, fontFamily: 'Syne', fontWeight: 700,
                        background: '#c9a84c', color: '#0a0a0a', border: '1px solid #c9a84c',
                        borderRadius: 7, cursor: 'pointer',
                      }}>SUBSCRIBE</button>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button onClick={() => nav('/signup')} style={{
              background: 'transparent', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.3)',
              padding: '12px 32px', borderRadius: 30, fontFamily: 'Syne', fontWeight: 700, fontSize: 14, cursor: 'pointer',
            }}>View All Creators →</button>
          </div>
        </div>
      </section>

      <section id="community" style={{ padding: '100px 60px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <RevealSection>
            <p style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '5px', color: '#c9a84c', marginBottom: 16, textTransform: 'uppercase', textAlign: 'center' }}>
              COMMUNITY FEED
            </p>
            <h2 style={{ fontFamily: 'Syne', fontSize: 44, fontWeight: 800, marginBottom: 64, textAlign: 'center', letterSpacing: '-0.5px' }}>
              See What Others Are <span style={{ color: '#c9a84c' }}>Achieving</span>
            </h2>
          </RevealSection>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {COMMUNITY_POSTS.map((post, i) => (
              <RevealSection key={post.id} delay={i * 100}>
                <div style={{
                  background: 'rgba(14,14,14,0.9)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 16, padding: '24px',
                  transition: 'all 0.25s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #c9a84c, #7a6530)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, fontWeight: 800, color: '#080808', fontFamily: 'Syne',
                    }}>{post.author[0]}</div>
                    <div>
                      <div style={{ fontFamily: 'Syne', fontSize: 14, fontWeight: 700, color: '#EAEAEA' }}>{post.author}</div>
                      <div style={{ fontSize: 12, color: 'rgba(234,234,234,0.3)' }}>{post.handle}</div>
                    </div>
                  </div>
                  <p style={{ color: 'rgba(234,234,234,0.7)', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
                    {post.content}
                  </p>
                  <div style={{ display: 'flex', gap: 20 }}>
                    <span style={{ color: 'rgba(234,234,234,0.3)', fontSize: 12 }}>❤️ {post.likes}</span>
                    <span style={{ color: 'rgba(234,234,234,0.3)', fontSize: 12 }}>💬 {post.comments}</span>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button onClick={() => nav('/signup')} style={{
              background: 'transparent', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.3)',
              padding: '12px 32px', borderRadius: 30, fontFamily: 'Syne', fontWeight: 700, fontSize: 14, cursor: 'pointer',
            }}>Join the Community →</button>
          </div>
        </div>
      </section>

      <section id="explore-gym" style={{ padding: '100px 60px', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#0c0c0c' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <RevealSection>
            <p style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '5px', color: '#c9a84c', marginBottom: 16, textTransform: 'uppercase' }}>
              EXPLORE GYMS
            </p>
            <h2 style={{ fontFamily: 'Syne', fontSize: 48, fontWeight: 800, marginBottom: 16, letterSpacing: '-0.5px' }}>
              Find Gyms <span style={{ color: '#c9a84c' }}>Near You</span>
            </h2>
            <p style={{ color: 'rgba(234,234,234,0.4)', fontSize: 16, maxWidth: 480, marginBottom: 64, lineHeight: 1.8 }}>
              Discover the best fitness centers in your area. Sign up to see real-time availability and reviews.
            </p>
          </RevealSection>

          <div style={{
            height: 300,
            background: '#0c0c0c',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            marginBottom: 24,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ textAlign: 'center', color: 'rgba(234,234,234,0.3)' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a14 14 0 0 0 0 20 14 14 0 0 0 0-20" />
                <path d="M2 12h20"/>
              </svg>
              <p style={{ marginTop: 16, fontSize: 16 }}>Interactive map available after sign up</p>
              <button onClick={() => nav('/signup')} style={{
                marginTop: 20, background: '#c9a84c', color: '#080808', border: 'none',
                padding: '10px 24px', borderRadius: 8, fontFamily: 'Syne', fontWeight: 700, cursor: 'pointer',
              }}>Sign Up to Explore</button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 60px', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#0c0c0c' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <RevealSection>
            <p style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '5px', color: '#c9a84c', marginBottom: 16, textTransform: 'uppercase' }}>
              EVERYTHING YOU NEED
            </p>
            <h2 style={{ fontFamily: 'Syne', fontSize: 48, fontWeight: 800, marginBottom: 16, letterSpacing: '-0.5px' }}>
              Achieve Your <span style={{ color: '#c9a84c' }}>Dream Body</span>
            </h2>
            <p style={{ color: 'rgba(234,234,234,0.4)', fontSize: 16, maxWidth: 480, marginBottom: 64, lineHeight: 1.8 }}>
              Select the physique you want to achieve from our influencer-inspired options,
              get access to their diet and workout plans.
            </p>
          </RevealSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {FEATURES.map((f, i) => (
              <RevealSection key={f.title} delay={i * 80}>
                <div
                  style={{
                    background: 'rgba(14,14,14,0.9)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 16, padding: '28px 24px',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                    cursor: 'default',
                    height: '100%',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'
                    e.currentTarget.style.transform = 'translateY(-5px)'
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.1)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)'
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, marginBottom: 20,
                    background: 'rgba(201,168,76,0.08)',
                    border: '1px solid rgba(201,168,76,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#c9a84c',
                  }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontFamily: 'Syne', fontSize: 17, fontWeight: 700, marginBottom: 10, color: '#EAEAEA' }}>{f.title}</h3>
                  <p style={{ color: 'rgba(234,234,234,0.45)', fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 60px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <RevealSection>
            <p style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '5px', color: '#c9a84c', marginBottom: 16, textTransform: 'uppercase', textAlign: 'center' }}>
              HOW IT WORKS
            </p>
            <h2 style={{ fontFamily: 'Syne', fontSize: 44, fontWeight: 800, marginBottom: 64, textAlign: 'center', letterSpacing: '-0.5px' }}>
              Three Steps to Your<br /><span style={{ color: '#c9a84c' }}>Best Physique</span>
            </h2>
          </RevealSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { num: '01', title: 'Build Your Profile', desc: 'Input your body measurements, fitness goals, and current level. Our system creates your unique physique fingerprint.' },
              { num: '02', title: 'Match & Connect', desc: 'We match you with creators who share your body frame. Get personalized plans that actually work for your genetics.' },
              { num: '03', title: 'Track & Grow', desc: 'Log workouts, meals, and progress. Watch your body transform with data-driven insights and community support.' },
            ].map((s, i) => (
              <RevealSection key={s.num} delay={i * 100}>
                <div style={{ textAlign: 'center', padding: '0 16px' }}>
                  <div style={{
                    fontFamily: 'Syne', fontSize: 56, fontWeight: 800,
                    color: 'rgba(201,168,76,0.12)', marginBottom: 16,
                    lineHeight: 1,
                  }}>{s.num}</div>
                  <h3 style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#EAEAEA' }}>{s.title}</h3>
                  <p style={{ color: 'rgba(234,234,234,0.4)', fontSize: 14, lineHeight: 1.8 }}>{s.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 60px', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#0c0c0c' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <RevealSection>
            <p style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '5px', color: '#c9a84c', marginBottom: 16, textTransform: 'uppercase', textAlign: 'center' }}>TESTIMONIALS</p>
            <h2 style={{ fontFamily: 'Syne', fontSize: 44, fontWeight: 800, marginBottom: 64, textAlign: 'center', letterSpacing: '-0.5px' }}>
              What Our <span style={{ color: '#c9a84c' }}>Community Says</span>
            </h2>
          </RevealSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <RevealSection key={t.name} delay={i * 100}>
                <div style={{
                  background: 'rgba(14,14,14,0.95)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 16, padding: '28px 24px',
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                  height: '100%',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ display: 'flex', gap: 3, marginBottom: 18 }}>
                    {[...Array(t.rating)].map((_, j) => (
                      <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#c9a84c" stroke="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>
                  <p style={{ color: 'rgba(234,234,234,0.7)', fontSize: 14, lineHeight: 1.8, marginBottom: 20, fontStyle: 'italic' }}>
                    "{t.text}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #c9a84c, #7a6530)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 800, color: '#080808', fontFamily: 'Syne',
                    }}>{t.name[0]}</div>
                    <div>
                      <div style={{ fontFamily: 'Syne', fontSize: 13, fontWeight: 700, color: '#EAEAEA' }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(234,234,234,0.3)' }}>{t.handle}</div>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 60px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 400,
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <RevealSection style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Syne', fontSize: 52, fontWeight: 800, marginBottom: 20, letterSpacing: '-0.5px', lineHeight: 1.1 }}>
              Ready to <span style={{ color: '#c9a84c' }}>Level Up?</span>
            </h2>
            <p style={{ color: 'rgba(234,234,234,0.4)', marginBottom: 40, fontSize: 17, lineHeight: 1.7 }}>
              Join Velora today. Your physique transformation starts with one decision.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-gold" onClick={() => nav('/signup')} style={{ fontSize: 15, padding: '15px 48px' }}>
                Create Free Account
              </button>
              <button className="btn-outline" onClick={() => nav('/login')} style={{ fontSize: 15, padding: '15px 32px' }}>
                Sign In
              </button>
            </div>
          </div>
        </RevealSection>
      </section>

      <footer style={{
        padding: '36px 60px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        color: 'rgba(234,234,234,0.2)', fontSize: 13,
      }}>
        <VeloraLogo size={26} textSize={13} />
        <span>© 2025 Velora Inc. All Rights Reserved.</span>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy Policy', 'Terms of Service', 'Community Guidelines'].map(t => (
            <span key={t} style={{ cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(234,234,234,0.2)'}
            >{t}</span>
          ))}
        </div>
      </footer>
    </div>
  )
}