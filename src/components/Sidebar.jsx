import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import VeloraLogo from './VeloraLogo'

const NAV = [
  { icon: '⊞', label: 'Home', path: '/home' },
  { icon: '🔔', label: 'Notifications', path: '/notifications' },
  { icon: '✉', label: 'Messages', path: '/messages' },
  { icon: '🔖', label: 'Collections', path: '/collections' },
  { icon: '👥', label: 'Subscriptions', path: '/explore' },
  { icon: '🏪', label: 'Creators', path: '/creators' },
]

export default function Sidebar({ onNewPost }) {
  const nav = useNavigate()
  const loc = useLocation()
  const { user, logout } = useAuth()

  return (
    <aside style={{
      width: 220, minHeight: '100vh', background: '#111',
      borderRight: '1px solid #1a1a1a', display: 'flex',
      flexDirection: 'column', padding: '24px 14px',
      position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 50,
    }}>
      <div style={{ marginBottom: 36, paddingLeft: 8 }}>
        <VeloraLogo size={30} textSize={16} />
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {NAV.map(item => {
          const active = loc.pathname === item.path
          return (
            <button key={item.path} onClick={() => nav(item.path)} style={{
              display: 'flex', alignItems: 'center', gap: 13,
              padding: '11px 13px', borderRadius: 10, border: 'none',
              background: active ? 'rgba(201,168,76,0.12)' : 'transparent',
              color: active ? '#c9a84c' : '#666',
              fontFamily: 'DM Sans', fontSize: 14, fontWeight: active ? 600 : 400,
              cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', width: '100%',
            }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#aaa' } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#666' } }}
            >
              <span style={{ fontSize: 17, width: 22, textAlign: 'center' }}>{item.icon}</span>
              {item.label}
            </button>
          )
        })}

        <div style={{ marginTop: 8 }}>
          {[
            { icon: '💳', label: 'Add Card' },
            { icon: '•••', label: 'More' },
          ].map(i => (
            <button key={i.label} style={{
              display: 'flex', alignItems: 'center', gap: 13,
              padding: '11px 13px', borderRadius: 10, border: 'none',
              background: 'transparent', color: '#666',
              fontFamily: 'DM Sans', fontSize: 14, cursor: 'pointer',
              transition: 'all 0.2s', textAlign: 'left', width: '100%',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#aaa' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#666' }}
            >
              <span style={{ fontSize: 17, width: 22, textAlign: 'center' }}>{i.icon}</span>
              {i.label}
            </button>
          ))}
        </div>
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          className="btn-gold"
          onClick={onNewPost}
          style={{ width: '100%', padding: '11px', fontSize: 13, justifyContent: 'center' }}
        >
          + New Post
        </button>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '11px',
          background: '#1a1a1a', borderRadius: 10, border: '1px solid #222',
          cursor: 'pointer', transition: 'border-color 0.2s',
        }}
          onClick={() => nav(`/profile/${user?.username || 'me'}`)}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#333'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#222'}
        >
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'linear-gradient(135deg, #c9a84c, #888)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: '#0a0a0a', fontFamily: 'Syne', flexShrink: 0,
          }}>
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: '#e0e0e0', fontFamily: 'Syne', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name || 'My Profile'}
            </div>
            <div style={{ fontSize: 11, color: '#555' }}>@{user?.username || 'my_profile'}</div>
          </div>
          <button onClick={e => { e.stopPropagation(); logout(); nav('/') }} style={{
            background: 'none', border: 'none', color: '#444', cursor: 'pointer', fontSize: 14, padding: 4, flexShrink: 0,
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#e05252'}
            onMouseLeave={e => e.currentTarget.style.color = '#444'}
          >⏻</button>
        </div>
      </div>
    </aside>
  )
}