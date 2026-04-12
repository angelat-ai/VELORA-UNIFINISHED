import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const CREATORS = [
  { name: 'SmartFit', fullName: 'Jeff Nippard', handle: 'smartfit', subs: 0, tag: 'Powerbuilding', price: 12.99 },
  { name: 'KiffyMan', fullName: 'Kiffy Man', handle: 'kiffyman', subs: 0, tag: 'Calisthenics', price: 9.99 },
  { name: 'David Laid', fullName: 'David Laid', handle: 'd_real_dlaid', subs: 0, tag: 'Physique', price: 19.99 },
  { name: 'Alex Eubank', fullName: 'Alex Eubank', handle: 'elysium_alex', subs: 0, tag: 'Classic Physique', price: 14.99 },
  { name: 'Sam Sulek', fullName: 'Sam Sulek', handle: 'sam_sulek_official', subs: 0, tag: 'Mass Building', price: 11.99 },
  { name: 'Hussein Farhat', fullName: 'Hussein Farhat', handle: 'frnrt_hussein', subs: 0, tag: 'Aesthetics', price: 9.99 },
]

export default function CreatorsPage() {
  const [search, setSearch] = useState('')
  const [subscribed, setSubscribed] = useState({})

  const filtered = CREATORS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.tag.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a' }}>
      <Sidebar />
      <main style={{ marginLeft: 220, flex: 1, padding: '0 0 48px' }}>
        <div style={{ padding: '22px 36px', borderBottom: '1px solid #1a1a1a', position: 'sticky', top: 0, background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(10px)', zIndex: 10 }}>
          <h1 style={{ fontFamily: 'Syne', fontSize: 20, fontWeight: 700 }}>Creators</h1>
        </div>

        <div style={{ padding: '28px 36px' }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontFamily: 'Syne', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
              Everything <span style={{ color: '#c9a84c' }}>YOU</span> Need to Succeed
            </h2>
            <p style={{ color: '#555', fontSize: 15, marginBottom: 20 }}>Achieve Your Dream Body</p>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{
                display: 'flex', flex: 1, maxWidth: 380, alignItems: 'center', gap: 10,
                background: '#111', border: '1px solid #1a1a1a', borderRadius: 10, padding: '10px 14px',
              }}>
                <span style={{ color: '#444' }}>🔍</span>
                <input
                  placeholder="search influencer..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ background: 'transparent', border: 'none', flex: 1, fontSize: 13 }}
                />
              </div>
              <button style={{
                background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 10,
                padding: '10px 16px', color: '#666', fontSize: 13, fontFamily: 'DM Sans', cursor: 'pointer',
              }}>Filter ▾</button>
            </div>
          </div>

          <h3 style={{ fontFamily: 'Syne', fontSize: 14, fontWeight: 700, color: '#c9a84c', marginBottom: 18, letterSpacing: 1 }}>
            OUR TOP INFLUENCERS THIS MONTH
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {filtered.map(c => (
              <div key={c.name} style={{
                background: '#111', border: '1px solid #1a1a1a', borderRadius: 14, overflow: 'hidden',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c33'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ height: 80, background: 'linear-gradient(135deg, #1a1a1a, #0d0d0d)', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', bottom: -28, left: '50%', transform: 'translateX(-50%)',
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.4), #333)',
                    border: '3px solid #111',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, color: '#c9a84c', fontFamily: 'Syne', fontWeight: 800,
                  }}>
                    {c.name[0]}
                  </div>
                </div>

                <div style={{ padding: '36px 20px 20px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{c.name.toUpperCase()}</div>
                  <div style={{ fontSize: 11, color: '#c9a84c', marginBottom: 2 }}>{c.tag}</div>
                  <div style={{ fontSize: 11, color: '#444', marginBottom: 16 }}>{c.subs} subscribers</div>

                  <div style={{ fontSize: 13, color: '#c9a84c', fontFamily: 'Syne', fontWeight: 700, marginBottom: 14 }}>
                    ${c.price}<span style={{ fontSize: 11, color: '#555', fontWeight: 400 }}>/mo</span>
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn-outline" style={{ flex: 1, padding: '8px', fontSize: 12, justifyContent: 'center' }}>VIEW</button>
                    <button
                      onClick={() => setSubscribed(p => ({ ...p, [c.name]: !p[c.name] }))}
                      style={{
                        flex: 1, padding: '8px', fontSize: 12, justifyContent: 'center',
                        borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'Syne', fontWeight: 700,
                        background: subscribed[c.name] ? '#2a2a2a' : '#c9a84c',
                        color: subscribed[c.name] ? '#666' : '#0a0a0a',
                        transition: 'all 0.2s',
                      }}
                    >
                      {subscribed[c.name] ? 'SUBSCRIBED' : 'SUBSCRIBE'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}