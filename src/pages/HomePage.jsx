import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import PostCard from '../components/PostCard'
import NewPostModal from '../components/NewPostModal'
import { useAuth } from '../context/AuthContext'

const IconImage = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
  </svg>
)
const IconVideo = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
  </svg>
)
const IconChart = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
)
const IconLink = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
)
const IconSearch = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)
const IconChevronL = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
)
const IconChevronR = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
)
const IconPlus = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

const SUGGESTIONS = [
  { name: 'Jeff Nippard', handle: 'jeff_nip_official', sim: '78%' },
  { name: 'Alex Eubank', handle: 'Elysium_Alex', sim: '71%' },
  { name: 'Hussein Farhat', handle: 'Frnrt_Hussein', sim: '65%' },
  { name: 'Sam Sulek', handle: 'Sam_Sulek_Official', sim: '60%' },
]

export default function HomePage() {
  const [tab, setTab] = useState('all')
  const [posts, setPosts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const { user } = useAuth()
  const nav = useNavigate()

  const handlePost = (postData) => {
    setPosts(prev => [{
      id: Date.now(),
      author: user?.name || 'You',
      handle: user?.username || 'me',
      verified: false,
      timestamp: new Date(),
      ...postData,
    }, ...prev])
  }

  const avatar = (
    <div style={{
      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
      background: 'linear-gradient(135deg, #c9a84c 0%, #7a6530 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontWeight: 700, color: '#0a0a0a', fontFamily: 'Syne',
    }}>
      {user?.name?.[0]?.toUpperCase() || 'U'}
    </div>
  )

  return (
    <div style={{
      display: 'flex', height: '100vh', width: '100vw',
      background: '#0a0a0a', overflow: 'hidden',
    }}>
      <Sidebar onNewPost={() => setShowModal(true)} />

      <div style={{
        marginLeft: 220, flex: 1, display: 'flex',
        minWidth: 0, overflow: 'hidden',
      }}>
        {/* MAIN FEED */}
        <main style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          minWidth: 0, borderRight: '1px solid #1e1e1e', overflow: 'hidden',
        }}>
          {/* Sticky header */}
          <div style={{
            padding: '16px 24px', borderBottom: '1px solid #1e1e1e',
            background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)',
            flexShrink: 0,
          }}>
            <h1 style={{ fontFamily: 'Syne', fontSize: 19, fontWeight: 700, letterSpacing: '-0.3px' }}>Home</h1>
          </div>

          {/* Scrollable content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0' }}>
            {/* Compose box */}
            <div style={{
              margin: '16px 20px',
              background: '#111', border: '1px solid #1e1e1e', borderRadius: 14,
              padding: '14px 16px', cursor: 'pointer', transition: 'border-color 0.2s',
            }}
              onClick={() => setShowModal(true)}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#2a2a2a'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1e1e1e'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                {avatar}
                <span style={{
                  color: '#3a3a3a', fontSize: 14, fontFamily: 'DM Sans',
                  flex: 1, background: '#0d0d0d', border: '1px solid #1e1e1e',
                  borderRadius: 8, padding: '9px 14px',
                }}>What's on your mind?</span>
              </div>
              <div style={{ display: 'flex', gap: 0, borderTop: '1px solid #1a1a1a', paddingTop: 12 }}>
                {[
                  { Icon: IconImage, label: 'Photo' },
                  { Icon: IconVideo, label: 'Video' },
                  { Icon: IconChart, label: 'Progress' },
                ].map(({ Icon, label }) => (
                  <div key={label} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '5px 14px', color: '#4a4a4a', fontSize: 13,
                    fontFamily: 'DM Sans', borderRadius: 6, transition: 'color 0.15s',
                    cursor: 'pointer',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                    onMouseLeave={e => e.currentTarget.style.color = '#4a4a4a'}
                  >
                    <Icon /> {label}
                  </div>
                ))}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, color: '#c9a84c', fontSize: 12, fontFamily: 'DM Sans', cursor: 'pointer' }}>
                  <IconLink /> myfitnesspal
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 8, padding: '0 20px 16px' }}>
              {['all', 'following'].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding: '7px 18px', borderRadius: 20, fontSize: 13, fontFamily: 'DM Sans',
                  background: tab === t ? '#c9a84c' : 'transparent',
                  color: tab === t ? '#0a0a0a' : '#4a4a4a',
                  border: `1px solid ${tab === t ? '#c9a84c' : '#1e1e1e'}`,
                  cursor: 'pointer', fontWeight: tab === t ? 700 : 400, transition: 'all 0.18s',
                }}>{t === 'all' ? 'All' : 'Following'}</button>
              ))}
            </div>

            {/* Feed */}
            <div style={{ padding: '0 20px 24px' }}>
              {posts.length === 0 ? (
                <EmptyFeed nav={nav} onPost={() => setShowModal(true)} />
              ) : (
                posts.map(p => <PostCard key={p.id} post={p} />)
              )}
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside style={{
          width: 288, flexShrink: 0,
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden', background: '#0a0a0a',
        }}>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 24px' }}>
            {/* Search */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: '#111', border: '1px solid #1e1e1e', borderRadius: 10,
              padding: '10px 14px', marginBottom: 20,
            }}>
              <span style={{ color: '#3a3a3a', flexShrink: 0 }}><IconSearch /></span>
              <input placeholder="Search Velora..." style={{
                background: 'transparent', border: 'none', flex: 1, fontSize: 13,
                color: '#888', fontFamily: 'DM Sans',
              }} />
            </div>

            {/* Suggestions */}
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontFamily: 'Syne', fontSize: 14, fontWeight: 700, color: '#d0d0d0' }}>Suggestions</span>
                <p style={{ fontSize: 11, color: '#3a3a3a', marginTop: 2 }}>75–89% Body Frame Similarity</p>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {[IconChevronL, IconChevronR].map((Icon, i) => (
                  <button key={i} style={{
                    background: '#161616', border: '1px solid #1e1e1e', color: '#4a4a4a',
                    padding: '5px 8px', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center',
                    transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c33'; e.currentTarget.style.color = '#c9a84c' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.color = '#4a4a4a' }}
                  ><Icon /></button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
              {SUGGESTIONS.map(s => (
                <div key={s.name} style={{
                  background: '#111', border: '1px solid #1a1a1a', borderRadius: 10,
                  padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10,
                  cursor: 'pointer', transition: 'border-color 0.18s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#2a2a2a'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.25), rgba(30,30,30,0.8))',
                    border: '1px solid rgba(201,168,76,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, color: '#c9a84c', fontFamily: 'Syne', fontWeight: 700,
                  }}>
                    {s.name[0]}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: '#d0d0d0', fontFamily: 'Syne', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</span>
                      <span style={{ color: '#c9a84c', fontSize: 10, flexShrink: 0 }}>✓</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#3a3a3a' }}>@{s.handle}</div>
                  </div>
                  <div style={{ display: 'flex', flex: 'column', alignItems: 'flex-end', gap: 2 }}>
                    <span style={{ fontSize: 10, color: '#c9a84c', fontFamily: 'Syne', fontWeight: 700, display: 'block', textAlign: 'right' }}>{s.sim}</span>
                    <button style={{
                      background: '#c9a84c', border: 'none', color: '#0a0a0a',
                      width: 24, height: 24, borderRadius: 6, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.15s', flexShrink: 0,
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = '#e8c46a'}
                      onMouseLeave={e => e.currentTarget.style.background = '#c9a84c'}
                    ><IconPlus /></button>
                  </div>
                </div>
              ))}
            </div>

            {/* Your Stats */}
            <div style={{
              background: '#111', border: '1px solid #1a1a1a', borderRadius: 12,
              overflow: 'hidden', marginBottom: 20,
            }}>
              <div style={{
                padding: '12px 16px', borderBottom: '1px solid #1a1a1a',
                background: 'linear-gradient(90deg, rgba(201,168,76,0.08), transparent)',
              }}>
                <span style={{ fontFamily: 'Syne', fontSize: 13, fontWeight: 700, color: '#c9a84c' }}>Your Stats</span>
              </div>
              {[
                { label: 'Posts', val: posts.length },
                { label: 'Followers', val: 0 },
                { label: 'Following', val: 0 },
              ].map((s, i, arr) => (
                <div key={s.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 16px',
                  borderBottom: i < arr.length - 1 ? '1px solid #161616' : 'none',
                }}>
                  <span style={{ fontSize: 13, color: '#4a4a4a', fontFamily: 'DM Sans' }}>{s.label}</span>
                  <span style={{ fontFamily: 'Syne', fontSize: 15, fontWeight: 800, color: s.val > 0 ? '#c9a84c' : '#2a2a2a' }}>{s.val}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ color: '#252525', fontSize: 11, lineHeight: 1.9 }}>
              © 2025 Velora Inc. All Rights Reserved.<br />
              Privacy Policy · Terms of Service · Community Guidelines
            </div>
          </div>
        </aside>
      </div>

      {showModal && <NewPostModal onClose={() => setShowModal(false)} onPost={handlePost} />}
    </div>
  )
}

function EmptyFeed({ nav, onPost }) {
  return (
    <div style={{
      background: '#0f0f0f',
      border: '1px solid #1a1a1a',
      borderRadius: 16, overflow: 'hidden',
    }}>
      {/* Gold accent top bar */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)' }} />

      <div style={{ padding: '40px 28px', textAlign: 'center' }}>
        {/* Icon graphic */}
        <div style={{
          width: 64, height: 64, borderRadius: '50%', margin: '0 auto 20px',
          background: 'rgba(201,168,76,0.08)',
          border: '1px solid rgba(201,168,76,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>

        <h3 style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#d0d0d0' }}>
          Feed is Empty
        </h3>
        <p style={{ color: '#3a3a3a', fontSize: 13, maxWidth: 280, margin: '0 auto 24px', lineHeight: 1.7, fontFamily: 'DM Sans' }}>
          No posts yet. Follow creators or be the first to post something to the community!
        </p>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button onClick={() => nav('/creators')} style={{
            background: '#c9a84c', color: '#0a0a0a',
            fontFamily: 'Syne', fontWeight: 700, fontSize: 13,
            padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
            transition: 'background 0.18s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#e8c46a'}
            onMouseLeave={e => e.currentTarget.style.background = '#c9a84c'}
          >
            Discover Creators
          </button>
          <button onClick={onPost} style={{
            background: 'transparent', color: '#c9a84c',
            fontFamily: 'Syne', fontWeight: 600, fontSize: 13,
            padding: '10px 20px', borderRadius: 8,
            border: '1px solid rgba(201,168,76,0.3)', cursor: 'pointer',
            transition: 'all 0.18s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.borderColor = '#c9a84c' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)' }}
          >
            Create Post
          </button>
        </div>
      </div>

      {/* Bottom section - quick stats */}
      <div style={{
        borderTop: '1px solid #1a1a1a',
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
      }}>
        {[
          { label: 'Creators', val: '6' },
          { label: 'Categories', val: '4' },
          { label: 'Your Level', val: 'New' },
        ].map((s, i, arr) => (
          <div key={s.label} style={{
            padding: '14px', textAlign: 'center',
            borderRight: i < arr.length - 1 ? '1px solid #1a1a1a' : 'none',
          }}>
            <div style={{ fontFamily: 'Syne', fontSize: 16, fontWeight: 800, color: '#2a2a2a' }}>{s.val}</div>
            <div style={{ fontSize: 11, color: '#2a2a2a', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}