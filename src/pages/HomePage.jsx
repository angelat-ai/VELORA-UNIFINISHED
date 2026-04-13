import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import PostCard from '../components/PostCard'
import NewPostModal from '../components/NewPostModal'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../components/Toast'

const IconImage = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
  </svg>
)
const IconVideo = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
  </svg>
)
const IconBarChart = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
)
const IconLink = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
)
const IconSearch = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)
const IconChevL = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
)
const IconChevR = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
)
const IconPlus = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

const SUGGESTIONS = [
  { name: 'Jeff Nippard',   handle: 'jeff_nip_official',  sim: '78%' },
  { name: 'Alex Eubank',    handle: 'Elysium_Alex',        sim: '71%' },
  { name: 'Hussein Farhat', handle: 'Frnrt_Hussein',       sim: '65%' },
  { name: 'Sam Sulek',      handle: 'Sam_Sulek_Official',  sim: '60%' },
]

export default function HomePage() {
  const [tab, setTab] = useState('all')
  const [posts, setPosts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [followed, setFollowed] = useState({})
  const { user } = useAuth()
  const toast = useToast()
  const nav = useNavigate()

  const handlePost = (postData) => {
    toast.success('Posted successfully! ✓')
    setPosts(prev => [{
      id: Date.now(),
      author: user?.name || 'You',
      handle: user?.username || 'me',
      verified: false,
      timestamp: new Date(),
      ...postData,
    }, ...prev])
  }

  const toggleFollow = (name) => {
    const isNowFollowing = !followed[name]
    setFollowed(p => ({ ...p, [name]: !p[name] }))
    toast.info(isNowFollowing ? 'Following ' + name : 'Unfollowed ' + name)
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#080808', overflow: 'hidden' }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseGold { 0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,0)} 50%{box-shadow:0 0 20px 4px rgba(201,168,76,0.12)} }
        @keyframes floatIcon { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
      `}</style>

      <Sidebar onNewPost={() => setShowModal(true)} />

      <div style={{ marginLeft: 220, flex: 1, display: 'flex', minWidth: 0, overflow: 'hidden' }}>

        <main style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          minWidth: 0, borderRight: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '15px 22px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            background: 'rgba(8,8,8,0.9)',
            backdropFilter: 'blur(20px)',
            flexShrink: 0,
          }}>
            <h1 style={{
              fontFamily: 'Syne', fontSize: 18, fontWeight: 800,
              letterSpacing: '1px', textTransform: 'uppercase', color: '#EAEAEA',
            }}>Home</h1>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px 32px' }}>

            <div
              onClick={() => setShowModal(true)}
              style={{
                background: 'rgba(16,16,16,0.9)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14, padding: '14px 16px',
                marginBottom: 18, cursor: 'pointer',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, #c9a84c 0%, #7a6530 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: '#080808', fontFamily: 'Syne',
                  boxShadow: '0 2px 10px rgba(201,168,76,0.2)',
                }}>
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div style={{
                  flex: 1, padding: '9px 14px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 8,
                  color: 'rgba(234,234,234,0.25)', fontSize: 14, fontFamily: 'DM Sans',
                }}>
                  What's on your mind?
                </div>
              </div>
              <div style={{
                display: 'flex', gap: 0, paddingTop: 12,
                borderTop: '1px solid rgba(255,255,255,0.04)',
              }}>
                {[
                  { Icon: IconImage, label: 'Photo' },
                  { Icon: IconVideo, label: 'Video' },
                  { Icon: IconBarChart, label: 'Progress' },
                ].map(({ Icon, label }) => (
                  <div key={label} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '5px 13px', borderRadius: 6,
                    color: 'rgba(234,234,234,0.3)', fontSize: 13, fontFamily: 'DM Sans',
                    transition: 'color 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(234,234,234,0.65)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(234,234,234,0.3)'}
                  >
                    <Icon /> {label}
                  </div>
                ))}
                <div style={{
                  marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5,
                  color: '#c9a84c', fontSize: 12, fontFamily: 'DM Sans', opacity: 0.7,
                }}>
                  <IconLink /> myfitnesspal
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
              {['all', 'following'].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding: '7px 18px', borderRadius: 20, fontSize: 13, fontFamily: 'DM Sans',
                  background: tab === t ? '#c9a84c' : 'transparent',
                  color: tab === t ? '#080808' : 'rgba(234,234,234,0.35)',
                  border: `1px solid ${tab === t ? '#c9a84c' : 'rgba(255,255,255,0.08)'}`,
                  cursor: 'pointer', fontWeight: tab === t ? 700 : 400,
                  transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
                  boxShadow: tab === t ? '0 4px 14px rgba(201,168,76,0.2)' : 'none',
                  transform: 'scale(1)',
                }}
                  onMouseEnter={e => { if (tab !== t) e.currentTarget.style.color = 'rgba(234,234,234,0.65)' }}
                  onMouseLeave={e => { if (tab !== t) e.currentTarget.style.color = 'rgba(234,234,234,0.35)' }}
                >
                  {t === 'all' ? 'All' : 'Following'}
                </button>
              ))}
            </div>

            {posts.length === 0
              ? <EmptyFeed nav={nav} onPost={() => setShowModal(true)} />
              : posts.map(p => <PostCard key={p.id} post={p} />)
            }
          </div>
        </main>

        <aside style={{
          width: 280, flexShrink: 0,
          background: '#080808',
          borderLeft: '1px solid rgba(255,255,255,0.04)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px 28px' }}>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(16,16,16,0.9)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 10, padding: '10px 13px', marginBottom: 22,
              transition: 'border-color 0.18s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
            >
              <span style={{ color: 'rgba(234,234,234,0.25)', flexShrink: 0 }}><IconSearch /></span>
              <input placeholder="Search Velora..." style={{
                background: 'transparent', border: 'none', flex: 1, fontSize: 13,
                color: 'rgba(234,234,234,0.65)', fontFamily: 'DM Sans',
              }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <p style={{ fontFamily: 'Syne', fontSize: 13, fontWeight: 700, color: '#EAEAEA', marginBottom: 3 }}>
                  Suggestions
                </p>
                <p style={{ fontSize: 11, color: 'rgba(234,234,234,0.25)', fontFamily: 'DM Sans' }}>
                  75–89% Body Frame Similarity
                </p>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {[IconChevL, IconChevR].map((Icon, i) => (
                  <button key={i} style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: 'rgba(234,234,234,0.35)',
                    padding: '5px 7px', borderRadius: 6, cursor: 'pointer',
                    display: 'flex', alignItems: 'center',
                    transition: 'all 0.18s',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'
                      e.currentTarget.style.color = '#c9a84c'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                      e.currentTarget.style.color = 'rgba(234,234,234,0.35)'
                    }}
                  ><Icon /></button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 22 }}>
              {SUGGESTIONS.map(s => (
                <div key={s.name} style={{
                  background: 'rgba(14,14,14,0.9)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 10, padding: '10px 12px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.transform = 'translateX(2px)'
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.35)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.transform = 'translateX(0)'
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)'
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.2) 0%, rgba(30,30,30,0.8) 100%)',
                    border: '1px solid rgba(201,168,76,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, color: '#c9a84c', fontFamily: 'Syne', fontWeight: 800,
                  }}>
                    {s.name[0]}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 13, color: '#EAEAEA', fontFamily: 'Syne', fontWeight: 700,
                      display: 'flex', alignItems: 'center', gap: 5,
                    }}>
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</span>
                      <span style={{ fontSize: 9, color: '#c9a84c', flexShrink: 0, opacity: 0.8 }}>✓</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(234,234,234,0.28)', marginTop: 1 }}>@{s.handle}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                    <span style={{ fontSize: 10, color: '#c9a84c', fontFamily: 'Syne', fontWeight: 700 }}>{s.sim}</span>
                    <button
                      onClick={e => { e.stopPropagation(); toggleFollow(s.name) }}
                      style={{
                        background: followed[s.name] ? 'rgba(201,168,76,0.1)' : '#c9a84c',
                        border: followed[s.name] ? '1px solid rgba(201,168,76,0.3)' : 'none',
                        color: followed[s.name] ? '#c9a84c' : '#080808',
                        width: 22, height: 22, borderRadius: 5,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.18s',
                        fontSize: 11, fontFamily: 'Syne', fontWeight: 700,
                      }}
                    >
                      {followed[s.name] ? '✓' : <IconPlus />}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: 'rgba(14,14,14,0.9)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 12, overflow: 'hidden', marginBottom: 22,
              boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
            }}>
              <div style={{
                padding: '11px 15px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                background: 'linear-gradient(90deg, rgba(201,168,76,0.06), transparent)',
              }}>
                <span style={{ fontFamily: 'Syne', fontSize: 12, fontWeight: 700, color: '#c9a84c', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                  Your Stats
                </span>
              </div>
              {[
                { label: 'Posts', val: posts.length },
                { label: 'Followers', val: 0 },
                { label: 'Following', val: 0 },
              ].map((s, i, arr) => (
                <div key={s.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 15px',
                  borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}>
                  <span style={{ fontSize: 13, color: 'rgba(234,234,234,0.4)', fontFamily: 'DM Sans' }}>{s.label}</span>
                  <span style={{
                    fontFamily: 'Syne', fontSize: 16, fontWeight: 800,
                    color: s.val > 0 ? '#c9a84c' : 'rgba(234,234,234,0.15)',
                  }}>{s.val}</span>
                </div>
              ))}
            </div>

            <div style={{ color: 'rgba(234,234,234,0.1)', fontSize: 11, lineHeight: 2, fontFamily: 'DM Sans' }}>
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
      background: 'rgba(12,12,12,0.95)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 16, overflow: 'hidden',
      backdropFilter: 'blur(16px)',
      boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
      animation: 'fadeUp 0.4s ease both',
    }}>
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #c9a84c 40%, transparent)' }} />

      <div style={{ padding: '44px 32px 36px', textAlign: 'center' }}>
        <div style={{
          width: 68, height: 68, borderRadius: '50%', margin: '0 auto 22px',
          background: 'rgba(201,168,76,0.06)',
          border: '1px solid rgba(201,168,76,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'floatIcon 3s ease-in-out infinite, pulseGold 3s ease-in-out infinite',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>

        <h3 style={{
          fontFamily: 'Syne', fontSize: 20, fontWeight: 800,
          color: '#EAEAEA', marginBottom: 10,
          letterSpacing: '-0.3px',
        }}>
          Start your fitness journey today
        </h3>
        <p style={{
          color: 'rgba(234,234,234,0.4)', fontSize: 14,
          maxWidth: 300, margin: '0 auto 28px',
          lineHeight: 1.7, fontFamily: 'DM Sans',
        }}>
          Follow elite creators or drop your first post. The community is waiting for you.
        </p>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button
            onClick={() => nav('/creators')}
            style={{
              background: '#c9a84c', color: '#080808',
              fontFamily: 'Syne', fontWeight: 700, fontSize: 13,
              padding: '11px 22px', borderRadius: 9, border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(201,168,76,0.25)',
              transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#e8c46a'; e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(201,168,76,0.35)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#c9a84c'; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(201,168,76,0.25)' }}
          >
            Discover Creators
          </button>
          <button
            onClick={onPost}
            style={{
              background: 'transparent', color: '#c9a84c',
              fontFamily: 'Syne', fontWeight: 600, fontSize: 13,
              padding: '11px 22px', borderRadius: 9,
              border: '1px solid rgba(201,168,76,0.3)', cursor: 'pointer',
              transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.transform = 'scale(1.02)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            Create Post
          </button>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
      }}>
        {[
          { label: 'Creators Ready', val: '6' },
          { label: 'Categories', val: '4' },
          { label: 'Your Level', val: 'New' },
        ].map((s, i, arr) => (
          <div key={s.label} style={{
            padding: '14px', textAlign: 'center',
            borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
          }}>
            <div style={{ fontFamily: 'Syne', fontSize: 17, fontWeight: 800, color: 'rgba(201,168,76,0.3)' }}>{s.val}</div>
            <div style={{ fontSize: 11, color: 'rgba(234,234,234,0.2)', marginTop: 2, fontFamily: 'DM Sans' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}