import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Bulking', value: 'bulking' },
  { label: 'Cutting', value: 'cutting' },
  { label: 'Powerlifting', value: 'powerlifting' },
  { label: 'Calisthenics', value: 'calisthenics' },
  { label: 'Cardio', value: 'cardio' },
  { label: 'Yoga', value: 'yoga' },
]

const TRENDING_CREATORS = [
  { name: 'Jeff Nippard', handle: 'smartfit', tag: 'Powerbuilding', subs: '142K', verified: true },
  { name: 'Alex Eubank', handle: 'elysium_alex', tag: 'Classic Physique', subs: '98K', verified: true },
  { name: 'David Laid', handle: 'd_real_dlaid', tag: 'Aesthetics', subs: '210K', verified: true },
  { name: 'Sam Sulek', handle: 'sam_sulek_official', tag: 'Mass Building', subs: '87K', verified: true },
  { name: 'Hussein Farhat', handle: 'frnrt_hussein', tag: 'Classic Physique', subs: '63K', verified: true },
  { name: 'Kiffy Man', handle: 'kiffyman', tag: 'Calisthenics', subs: '41K', verified: false },
]

const TRENDING_POSTS = [
  { title: 'My 12-Week Bulk Results', creator: 'Jeff Nippard', views: '24.1K', category: 'bulking' },
  { title: 'Morning Cardio Routine', creator: 'Alex Eubank', views: '18.6K', category: 'cardio' },
  { title: 'Advanced Push/Pull/Legs', creator: 'David Laid', views: '31.2K', category: 'powerlifting' },
  { title: 'Handstand Progression Guide', creator: 'Kiffy Man', views: '9.4K', category: 'calisthenics' },
  { title: 'Cutting 4000 to 2500 Calories', creator: 'Sam Sulek', views: '45.8K', category: 'cutting' },
  { title: 'Full Body Mobility Flow', creator: 'Hussein Farhat', views: '12.7K', category: 'yoga' },
]

const IconSearch = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)
const IconTrend = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
)
const IconPlay = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
)
const IconEye = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)

export default function ExplorePage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [followed, setFollowed] = useState({})
  const nav = useNavigate()

  const filteredPosts = TRENDING_POSTS.filter(p => {
    const matchCat = category === 'all' || p.category === category
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                        p.creator.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#080808', overflow: 'hidden' }}>
      <Sidebar />
      <main style={{ marginLeft: 220, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{
          padding: '15px 28px', borderBottom: '1px solid rgba(255,255,255,0.05)',
          flexShrink: 0,
          background: 'rgba(8,8,8,0.9)', backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <h1 style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
            Explore
          </h1>
          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 10, padding: '9px 14px', width: 260,
            transition: 'border-color 0.2s',
          }}
            onFocusCapture={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'}
            onBlurCapture={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
          >
            <span style={{ color: 'rgba(234,234,234,0.3)' }}><IconSearch /></span>
            <input
              placeholder="Search creators, posts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'transparent', border: 'none', flex: 1, fontSize: 13, color: 'rgba(234,234,234,0.7)', padding: 0 }}
            />
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px 40px' }}>

          {/* Category tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
            {CATEGORIES.map(c => (
              <button key={c.value} onClick={() => setCategory(c.value)} style={{
                padding: '7px 16px', borderRadius: 20, fontSize: 13, fontFamily: 'DM Sans',
                background: category === c.value ? '#c9a84c' : 'rgba(255,255,255,0.04)',
                color: category === c.value ? '#080808' : 'rgba(234,234,234,0.45)',
                border: `1px solid ${category === c.value ? '#c9a84c' : 'rgba(255,255,255,0.07)'}`,
                cursor: 'pointer', fontWeight: category === c.value ? 700 : 400,
                transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                boxShadow: category === c.value ? '0 4px 14px rgba(201,168,76,0.2)' : 'none',
              }}>
                {c.label}
              </button>
            ))}
          </div>

          {/* Trending Creators */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ color: '#c9a84c' }}><IconTrend /></span>
              <h2 style={{ fontFamily: 'Syne', fontSize: 14, fontWeight: 700, color: '#EAEAEA', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Trending Creators
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {TRENDING_CREATORS.map((c, i) => (
                <div key={c.name} style={{
                  background: 'rgba(14,14,14,0.9)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 12, padding: '16px',
                  display: 'flex', alignItems: 'center', gap: 12,
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                  animation: `fadeUp 0.4s ease ${i * 60}ms both`,
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                  onClick={() => nav('/creators')}
                >
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.3), rgba(20,20,20,0.8))',
                    border: '1px solid rgba(201,168,76,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, color: '#c9a84c', fontFamily: 'Syne', fontWeight: 800,
                  }}>{c.name[0]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, color: '#EAEAEA', fontFamily: 'Syne', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
                      {c.verified && <span style={{ fontSize: 9, color: '#c9a84c', flexShrink: 0 }}>✓</span>}
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(234,234,234,0.35)', marginTop: 1 }}>{c.tag} · {c.subs}</div>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); setFollowed(p => ({ ...p, [c.name]: !p[c.name] })) }}
                    style={{
                      padding: '6px 12px', borderRadius: 6, border: 'none', fontSize: 11,
                      fontFamily: 'Syne', fontWeight: 700, cursor: 'pointer',
                      background: followed[c.name] ? 'rgba(201,168,76,0.1)' : '#c9a84c',
                      color: followed[c.name] ? '#c9a84c' : '#080808',
                      border: followed[c.name] ? '1px solid rgba(201,168,76,0.3)' : 'none',
                      transition: 'all 0.18s', flexShrink: 0,
                    }}
                  >{followed[c.name] ? '✓ Following' : 'Follow'}</button>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Content */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ color: '#c9a84c' }}><IconPlay /></span>
              <h2 style={{ fontFamily: 'Syne', fontSize: 14, fontWeight: 700, color: '#EAEAEA', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Trending Content
              </h2>
              {search && <span style={{ fontSize: 12, color: 'rgba(234,234,234,0.35)', fontFamily: 'DM Sans' }}>
                — {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''}
              </span>}
            </div>

            {filteredPosts.length === 0 ? (
              <div style={{
                background: 'rgba(12,12,12,0.9)', border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: 14, padding: '48px 32px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <p style={{ color: 'rgba(234,234,234,0.3)', fontSize: 14, fontFamily: 'DM Sans' }}>No results for "{search}"</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {filteredPosts.map((p, i) => (
                  <div key={p.title} style={{
                    background: 'rgba(14,14,14,0.9)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 12, overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                    animation: `fadeUp 0.4s ease ${i * 50}ms both`,
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    {/* Thumbnail placeholder */}
                    <div style={{
                      height: 100,
                      background: `linear-gradient(135deg, rgba(201,168,76,${0.04 + i * 0.01}), rgba(14,14,14,0.9))`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative',
                    }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: 'rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'rgba(234,234,234,0.6)',
                      }}><IconPlay /></div>
                      {/* Category badge */}
                      <span style={{
                        position: 'absolute', top: 8, right: 8,
                        background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.25)',
                        color: '#c9a84c', fontSize: 10, padding: '2px 8px', borderRadius: 20,
                        fontFamily: 'DM Sans', textTransform: 'capitalize',
                      }}>{p.category}</span>
                    </div>
                    <div style={{ padding: '12px 14px' }}>
                      <h4 style={{ fontFamily: 'Syne', fontSize: 13, fontWeight: 700, color: '#EAEAEA', marginBottom: 6, lineHeight: 1.4 }}>{p.title}</h4>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: 'rgba(234,234,234,0.4)', fontFamily: 'DM Sans' }}>{p.creator}</span>
                        <span style={{ fontSize: 11, color: 'rgba(234,234,234,0.3)', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <IconEye /> {p.views}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}