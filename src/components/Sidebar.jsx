import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import VeloraLogo from './VeloraLogo'

const IconHome = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)
const IconBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
)
const IconMsg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)
const IconBookmark = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
)
const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const IconStar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)
const IconCard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
)
const IconMore = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
  </svg>
)
const IconPower = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/>
  </svg>
)
const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

const NAV = [
  { Icon: IconHome, label: 'Home', path: '/home' },
  { Icon: IconBell, label: 'Notifications', path: '/notifications' },
  { Icon: IconMsg, label: 'Messages', path: '/messages' },
  { Icon: IconBookmark, label: 'Collections', path: '/collections' },
  { Icon: IconUsers, label: 'Subscriptions', path: '/explore' },
  { Icon: IconStar, label: 'Creators', path: '/creators' },
]

export default function Sidebar({ onNewPost }) {
  const nav = useNavigate()
  const loc = useLocation()
  const { user, logout } = useAuth()

  return (
    <aside style={{
      width: 220, height: '100vh', background: '#0f0f0f',
      borderRight: '1px solid #1e1e1e',
      display: 'flex', flexDirection: 'column',
      padding: '20px 12px',
      position: 'fixed', left: 0, top: 0, zIndex: 50,
      overflow: 'hidden',
    }}>
      <div style={{ marginBottom: 28, paddingLeft: 8 }}>
        <VeloraLogo size={30} textSize={16} />
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
        {NAV.map(({ Icon, label, path }) => {
          const active = loc.pathname === path
          return (
            <button key={path} onClick={() => nav(path)} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px', borderRadius: 10, border: 'none',
              background: active ? 'rgba(201,168,76,0.1)' : 'transparent',
              color: active ? '#c9a84c' : '#4a4a4a',
              fontFamily: 'DM Sans', fontSize: 14, fontWeight: active ? 600 : 400,
              cursor: 'pointer', transition: 'all 0.18s', textAlign: 'left', width: '100%',
            }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#8a8a8a' } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4a4a4a' } }}
            >
              <span style={{ flexShrink: 0 }}><Icon /></span>
              {label}
            </button>
          )
        })}

        <div style={{ marginTop: 4 }}>
          {[{ Icon: IconCard, label: 'Add Card' }, { Icon: IconMore, label: 'More' }].map(({ Icon, label }) => (
            <button key={label} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px', borderRadius: 10, border: 'none',
              background: 'transparent', color: '#4a4a4a',
              fontFamily: 'DM Sans', fontSize: 14, cursor: 'pointer',
              transition: 'all 0.18s', textAlign: 'left', width: '100%',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#8a8a8a' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4a4a4a' }}
            >
              <span style={{ flexShrink: 0 }}><Icon /></span>
              {label}
            </button>
          ))}
        </div>
      </nav>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 12, borderTop: '1px solid #1e1e1e' }}>
        <button onClick={onNewPost} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          background: '#c9a84c', color: '#0a0a0a',
          fontFamily: 'Syne', fontWeight: 700, fontSize: 13,
          padding: '11px', borderRadius: 10, border: 'none', cursor: 'pointer',
          transition: 'all 0.18s', letterSpacing: 0.3,
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#e8c46a'}
          onMouseLeave={e => e.currentTarget.style.background = '#c9a84c'}
        >
          <IconPlus /> New Post
        </button>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '10px',
          background: '#161616', borderRadius: 10, border: '1px solid #1e1e1e',
          cursor: 'pointer', transition: 'border-color 0.18s',
        }}
          onClick={() => nav(`/profile/${user?.username || 'me'}`)}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#2a2a2a'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#1e1e1e'}
        >
          <div style={{
            width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #c9a84c 0%, #7a6530 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: '#0a0a0a', fontFamily: 'Syne',
          }}>
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, color: '#d0d0d0', fontFamily: 'Syne', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name || 'My Profile'}
            </div>
            <div style={{ fontSize: 11, color: '#444' }}>@{user?.username || 'my_profile'}</div>
          </div>
          <button onClick={e => { e.stopPropagation(); logout(); nav('/') }} style={{
            background: 'none', border: 'none', color: '#3a3a3a', cursor: 'pointer',
            padding: 4, flexShrink: 0, display: 'flex', alignItems: 'center',
            transition: 'color 0.18s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#c05252'}
            onMouseLeave={e => e.currentTarget.style.color = '#3a3a3a'}
          ><IconPower /></button>
        </div>
      </div>
    </aside>
  )
}