import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import VeloraLogo from './VeloraLogo'

const IconHome = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)
const IconBell = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
)
const IconMsg = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)
const IconBookmark = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
)
const IconUsers = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const IconStar = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)
const IconMapPin = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)
const IconCard = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
)
const IconMore = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
  </svg>
)
const IconPower = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/>
  </svg>
)
const IconPlus = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

const NAV = [
  { Icon: IconHome,     label: 'Home',         path: '/home' },
  { Icon: IconBell,     label: 'Notifications', path: '/notifications' },
  { Icon: IconMsg,      label: 'Messages',      path: '/messages' },
  { Icon: IconBookmark, label: 'Collections',   path: '/collections' },
  { Icon: IconUsers,    label: 'Subscriptions', path: '/explore' },
  { Icon: IconStar,     label: 'Creators',      path: '/creators' },
  { Icon: IconMapPin,   label: 'Explore Gyms',  path: '/gyms' },
]

export default function Sidebar({ onNewPost }) {
  const nav = useNavigate()
  const loc = useLocation()
  const { user, logout } = useAuth()

  return (
    <aside style={{
      width: 220,
      height: '100vh',
      background: 'rgba(10,10,10,0.96)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 10px',
      position: 'fixed',
      left: 0, top: 0,
      zIndex: 50,
      overflow: 'hidden',
      boxShadow: '4px 0 24px rgba(0,0,0,0.4)',
    }}>
      <div style={{ marginBottom: 24, paddingLeft: 10 }}>
        <VeloraLogo size={30} textSize={16} />
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto' }}>
        {NAV.map(({ Icon, label, path }) => {
          const active = loc.pathname === path
          return (
            <button
              key={path}
              onClick={() => nav(path)}
              style={{
                display: 'flex', alignItems: 'center', gap: 11,
                padding: '10px 12px', borderRadius: 10,
                border: 'none',
                borderLeft: active ? '2px solid #c9a84c' : '2px solid transparent',
                background: active ? 'rgba(201,168,76,0.08)' : 'transparent',
                color: active ? '#c9a84c' : 'rgba(234,234,234,0.35)',
                fontFamily: 'DM Sans', fontSize: 13,
                fontWeight: active ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
                textAlign: 'left', width: '100%',
                boxShadow: active ? '0 0 12px rgba(201,168,76,0.08)' : 'none',
              }}
              onMouseEnter={e => {
                if (!active) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.color = 'rgba(234,234,234,0.7)'
                  e.currentTarget.style.borderLeftColor = 'rgba(201,168,76,0.2)'
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'rgba(234,234,234,0.35)'
                  e.currentTarget.style.borderLeftColor = 'transparent'
                }
              }}
            >
              <span style={{ flexShrink: 0, opacity: active ? 1 : 0.7 }}><Icon /></span>
              {label}
            </button>
          )
        })}

        <div style={{ marginTop: 6 }}>
          {[{ Icon: IconCard, label: 'Add Card' }, { Icon: IconMore, label: 'More' }].map(({ Icon, label }) => (
            <button
              key={label}
              style={{
                display: 'flex', alignItems: 'center', gap: 11,
                padding: '10px 12px', borderRadius: 10,
                border: 'none', borderLeft: '2px solid transparent',
                background: 'transparent',
                color: 'rgba(234,234,234,0.2)',
                fontFamily: 'DM Sans', fontSize: 13,
                cursor: 'pointer',
                transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
                textAlign: 'left', width: '100%',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.color = 'rgba(234,234,234,0.6)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'rgba(234,234,234,0.2)'
              }}
            >
              <span style={{ flexShrink: 0, opacity: 0.5 }}><Icon /></span>
              {label}
            </button>
          ))}
        </div>
      </nav>

      <div style={{
        display: 'flex', flexDirection: 'column', gap: 8,
        paddingTop: 10,
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <button
          onClick={onNewPost}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: '#c9a84c', color: '#080808',
            fontFamily: 'Syne', fontWeight: 700, fontSize: 13,
            padding: '11px', borderRadius: 10, border: 'none', cursor: 'pointer',
            letterSpacing: 0.4,
            boxShadow: '0 4px 16px rgba(201,168,76,0.25)',
            transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#e8c46a'
            e.currentTarget.style.transform = 'scale(1.02)'
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(201,168,76,0.35)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#c9a84c'
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(201,168,76,0.25)'
          }}
        >
          <IconPlus /> New Post
        </button>

        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.06)',
            cursor: 'pointer',
            transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
          }}
          onClick={() => nav(`/profile/${user?.username || 'me'}`)}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
          }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
            background: user?.avatarPhoto
              ? `url(${user.avatarPhoto}) center/cover no-repeat`
              : 'linear-gradient(135deg, #c9a84c 0%, #7a6530 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: '#080808', fontFamily: 'Syne',
            boxShadow: '0 2px 8px rgba(201,168,76,0.25)',
            overflow: 'hidden',
          }}>
            {!user?.avatarPhoto && (user?.name?.[0]?.toUpperCase() || 'U')}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 12, color: '#EAEAEA', fontFamily: 'Syne', fontWeight: 600,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {user?.name || 'My Profile'}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(234,234,234,0.3)' }}>
              @{user?.username || 'my_profile'}
            </div>
          </div>
          <button
            onClick={e => { e.stopPropagation(); logout(); nav('/') }}
            style={{
              background: 'none', border: 'none',
              color: 'rgba(234,234,234,0.2)',
              cursor: 'pointer', padding: 4, flexShrink: 0,
              display: 'flex', alignItems: 'center',
              transition: 'color 0.18s', borderRadius: 4,
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#e05252'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(234,234,234,0.2)'}
          >
            <IconPower />
          </button>
        </div>
      </div>
    </aside>
  )
}