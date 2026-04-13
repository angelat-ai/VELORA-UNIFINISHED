import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'follow', msg: 'Jeff Nippard started following you', time: '2m ago', read: false },
  { id: 2, type: 'like', msg: 'Alex Eubank liked your post', time: '15m ago', read: false },
  { id: 3, type: 'comment', msg: 'Sam Sulek commented: "Great progress bro! Keep going 💪"', time: '1h ago', read: false },
  { id: 4, type: 'system', msg: 'Welcome to Velora! Complete your profile to get matched with creators.', time: '2h ago', read: true },
  { id: 5, type: 'follow', msg: 'Hussein Farhat started following you', time: '3h ago', read: true },
]

const TYPE_CONFIG = {
  follow: { color: '#c9a84c', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
    </svg>
  )},
  like: { color: '#e05252', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )},
  comment: { color: '#6ab0e8', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )},
  system: { color: '#52c07a', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  )},
}

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS)
  const [filter, setFilter] = useState('all')

  const unread = notifs.filter(n => !n.read).length

  const markAllRead = () => setNotifs(p => p.map(n => ({ ...n, read: true })))
  const markRead = (id) => setNotifs(p => p.map(n => n.id === id ? { ...n, read: true } : n))
  const dismiss = (id) => setNotifs(p => p.filter(n => n.id !== id))

  const filtered = filter === 'unread' ? notifs.filter(n => !n.read) : notifs

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#080808', overflow: 'hidden' }}>
      <Sidebar />
      <main style={{ marginLeft: 220, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', maxWidth: 700 }}>
        {/* Header */}
        <div style={{
          padding: '15px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)',
          flexShrink: 0, background: 'rgba(8,8,8,0.9)', backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1 style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Notifications
            </h1>
            {unread > 0 && (
              <span style={{
                background: '#c9a84c', color: '#080808',
                fontFamily: 'Syne', fontWeight: 800, fontSize: 11,
                padding: '2px 8px', borderRadius: 20,
                animation: 'pulseGold 2s ease-in-out infinite',
              }}>{unread}</span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {['all', 'unread'].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 12, fontFamily: 'DM Sans',
                  background: filter === f ? 'rgba(201,168,76,0.12)' : 'transparent',
                  color: filter === f ? '#c9a84c' : 'rgba(234,234,234,0.35)',
                  border: `1px solid ${filter === f ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.06)'}`,
                  cursor: 'pointer', transition: 'all 0.18s', textTransform: 'capitalize',
                }}>{f}</button>
              ))}
            </div>
            {unread > 0 && (
              <button onClick={markAllRead} style={{
                background: 'none', border: 'none', color: 'rgba(234,234,234,0.35)',
                fontSize: 12, fontFamily: 'DM Sans', cursor: 'pointer', transition: 'color 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(234,234,234,0.35)'}
              >Mark all read</button>
            )}
          </div>
        </div>

        {/* Notifications list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{
              padding: '60px 24px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'float 3.5s ease-in-out infinite',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" opacity="0.7">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: 'Syne', fontSize: 16, fontWeight: 700, color: 'rgba(234,234,234,0.4)' }}>All caught up!</h3>
              <p style={{ color: 'rgba(234,234,234,0.2)', fontSize: 13, maxWidth: 260, lineHeight: 1.7 }}>No unread notifications right now.</p>
            </div>
          ) : (
            filtered.map((n, i) => {
              const cfg = TYPE_CONFIG[n.type]
              return (
                <div
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  style={{
                    padding: '14px 24px',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    display: 'flex', alignItems: 'flex-start', gap: 14,
                    background: n.read ? 'transparent' : 'rgba(201,168,76,0.025)',
                    cursor: 'pointer',
                    transition: 'background 0.18s',
                    animation: `slideInRight 0.3s ease ${i * 40}ms both`,
                    position: 'relative',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.025)'}
                  onMouseLeave={e => e.currentTarget.style.background = n.read ? 'transparent' : 'rgba(201,168,76,0.025)'}
                >
                  {/* Unread dot */}
                  {!n.read && (
                    <div style={{
                      position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
                      width: 6, height: 6, borderRadius: '50%', background: '#c9a84c',
                      boxShadow: '0 0 6px rgba(201,168,76,0.5)',
                    }} />
                  )}

                  {/* Type icon */}
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                    background: `${cfg.color}15`,
                    border: `1px solid ${cfg.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: cfg.color, marginLeft: 8,
                  }}>{cfg.icon}</div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: 14, color: n.read ? 'rgba(234,234,234,0.55)' : 'rgba(234,234,234,0.85)',
                      fontFamily: 'DM Sans', lineHeight: 1.5, marginBottom: 4,
                    }}>{n.msg}</p>
                    <span style={{ fontSize: 11, color: 'rgba(234,234,234,0.25)', fontFamily: 'DM Sans' }}>{n.time}</span>
                  </div>

                  {/* Dismiss */}
                  <button
                    onClick={e => { e.stopPropagation(); dismiss(n.id) }}
                    style={{
                      background: 'none', border: 'none', flexShrink: 0,
                      color: 'rgba(234,234,234,0.15)', cursor: 'pointer',
                      padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 4, transition: 'color 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(234,234,234,0.5)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(234,234,234,0.15)'}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              )
            })
          )}
        </div>
      </main>
    </div>
  )
}