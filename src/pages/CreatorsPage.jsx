import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const CREATORS = [
  { name: 'SmartFit', fullName: 'Jeff Nippard', handle: 'smartfit', tag: 'Powerbuilding', price: 12.99 },
  { name: 'KiffyMan', fullName: 'Kiffy Man', handle: 'kiffyman', tag: 'Calisthenics', price: 9.99 },
  { name: 'David Laid', fullName: 'David Laid', handle: 'd_real_dlaid', tag: 'Physique', price: 19.99 },
  { name: 'Alex Eubank', fullName: 'Alex Eubank', handle: 'elysium_alex', tag: 'Classic Physique', price: 14.99 },
  { name: 'Sam Sulek', fullName: 'Sam Sulek', handle: 'sam_sulek_official', tag: 'Mass Building', price: 11.99 },
  { name: 'Hussein Farhat', fullName: 'Hussein Farhat', handle: 'frnrt_hussein', tag: 'Aesthetics', price: 9.99 },
]

export default function CreatorsPage() {
  const [search, setSearch] = useState('')
  const [subscribed, setSubscribed] = useState({})

  const filtered = CREATORS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.tag.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#0a0a0a', overflow: 'hidden' }}>
      <Sidebar />
      <main style={{ marginLeft: 220, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '16px 28px', borderBottom: '1px solid #1e1e1e', flexShrink: 0, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)' }}>
          <h1 style={{ fontFamily: 'Syne', fontSize: 19, fontWeight: 700 }}>Creators</h1>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'Syne', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>
              Everything <span style={{ color: '#c9a84c' }}>YOU</span> Need to Succeed
            </h2>
            <p style={{ color: '#3a3a3a', fontSize: 14, marginBottom: 16 }}>Achieve Your Dream Body</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#111', border: '1px solid #1a1a1a', borderRadius: 9, padding: '9px 14px', flex: 1, maxWidth: 320 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input placeholder="search influencer..." value={search} onChange={e => setSearch(e.target.value)} style={{ background: 'transparent', border: 'none', flex: 1, fontSize: 13, color: '#888' }} />
              </div>
            </div>
          </div>

          <p style={{ fontFamily: 'Syne', fontSize: 12, fontWeight: 700, color: '#c9a84c', letterSpacing: 2, marginBottom: 16 }}>OUR TOP INFLUENCERS</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {filtered.map(c => (
              <div key={c.name} style={{
                background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 14, overflow: 'hidden',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ height: 64, background: 'linear-gradient(135deg, #161616, #0d0d0d)', position: 'relative' }}>
                  <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)', position: 'absolute', bottom: 0, left: 0, right: 0 }} />
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
                  <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 13, marginBottom: 2, letterSpacing: 0.5 }}>{c.name.toUpperCase()}</div>
                  <div style={{ fontSize: 11, color: '#c9a84c', marginBottom: 2 }}>{c.tag}</div>
                  <div style={{ fontSize: 11, color: '#2a2a2a', marginBottom: 12 }}>0 subscribers</div>
                  <div style={{ fontSize: 15, color: '#c9a84c', fontFamily: 'Syne', fontWeight: 800, marginBottom: 14 }}>
                    ${c.price}<span style={{ fontSize: 11, color: '#3a3a3a', fontWeight: 400 }}>/mo</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{
                      flex: 1, padding: '8px', fontSize: 11, fontFamily: 'Syne', fontWeight: 700,
                      background: 'transparent', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.3)',
                      borderRadius: 7, cursor: 'pointer', transition: 'all 0.18s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.08)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >VIEW</button>
                    <button onClick={() => setSubscribed(p => ({ ...p, [c.name]: !p[c.name] }))} style={{
                      flex: 1, padding: '8px', fontSize: 11, fontFamily: 'Syne', fontWeight: 700,
                      background: subscribed[c.name] ? '#1a1a1a' : '#c9a84c',
                      color: subscribed[c.name] ? '#3a3a3a' : '#0a0a0a',
                      border: `1px solid ${subscribed[c.name] ? '#2a2a2a' : '#c9a84c'}`,
                      borderRadius: 7, cursor: 'pointer', transition: 'all 0.18s',
                    }}>{subscribed[c.name] ? 'SUBSCRIBED' : 'SUBSCRIBE'}</button>
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