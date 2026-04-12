import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'

const IconSend = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)

const CONTACTS = [
  { id: 1, name: 'Jeff Nippard', handle: 'jeff_nip_official' },
  { id: 2, name: 'Alex Eubank', handle: 'Elysium_Alex' },
  { id: 3, name: 'Sam Sulek', handle: 'Sam_Sulek_Official' },
  { id: 4, name: 'Hussein Farhat', handle: 'Frnrt_Hussein' },
]

export default function MessagesPage() {
  const [selected, setSelected] = useState(null)
  const [msg, setMsg] = useState('')
  const [chats, setChats] = useState({})
  const { user } = useAuth()

  const send = (e) => {
    e.preventDefault()
    if (!msg.trim() || !selected) return
    setChats(p => ({ ...p, [selected]: [...(p[selected] || []), { text: msg, from: 'me', time: new Date() }] }))
    setMsg('')
  }

  const sel = CONTACTS.find(c => c.id === selected)

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#0a0a0a', overflow: 'hidden' }}>
      <Sidebar />
      <main style={{ marginLeft: 220, flex: 1, display: 'flex', overflow: 'hidden', minWidth: 0 }}>
        {/* Contact list */}
        <div style={{ width: 260, borderRight: '1px solid #1e1e1e', display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 16px', borderBottom: '1px solid #1e1e1e', flexShrink: 0 }}>
            <h2 style={{ fontFamily: 'Syne', fontSize: 17, fontWeight: 700, marginBottom: 12 }}>Messages</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#111', border: '1px solid #1a1a1a', borderRadius: 8, padding: '9px 12px' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input placeholder="Search..." style={{ background: 'transparent', border: 'none', flex: 1, fontSize: 13, color: '#888' }} />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {CONTACTS.map(c => (
              <div key={c.id} onClick={() => setSelected(c.id)} style={{
                padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10,
                borderLeft: `2px solid ${selected === c.id ? '#c9a84c' : 'transparent'}`,
                background: selected === c.id ? 'rgba(201,168,76,0.05)' : 'transparent',
                cursor: 'pointer', transition: 'all 0.18s',
              }}
                onMouseEnter={e => { if (selected !== c.id) e.currentTarget.style.background = '#0f0f0f' }}
                onMouseLeave={e => { if (selected !== c.id) e.currentTarget.style.background = 'transparent' }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.2), #1a1a1a)',
                  border: '1px solid rgba(201,168,76,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, color: '#c9a84c', fontFamily: 'Syne', fontWeight: 700,
                }}>{c.name[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: '#d0d0d0', fontFamily: 'Syne', fontWeight: 600 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: '#3a3a3a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {chats[c.id]?.slice(-1)[0]?.text || 'No messages yet'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {!selected ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <p style={{ fontFamily: 'Syne', fontSize: 14, color: '#2a2a2a' }}>Select a conversation</p>
            </div>
          ) : (
            <>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.2), #1a1a1a)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, color: '#c9a84c', fontFamily: 'Syne', fontWeight: 700,
                }}>{sel?.name[0]}</div>
                <div>
                  <div style={{ fontFamily: 'Syne', fontSize: 14, fontWeight: 700, color: '#d0d0d0' }}>{sel?.name}</div>
                  <div style={{ fontSize: 11, color: '#3a3a3a' }}>@{sel?.handle}</div>
                </div>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(!chats[selected] || chats[selected].length === 0) && (
                  <div style={{ textAlign: 'center', color: '#2a2a2a', fontSize: 13, marginTop: 40 }}>
                    Start a conversation with {sel?.name}
                  </div>
                )}
                {(chats[selected] || []).map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      maxWidth: '68%', padding: '9px 14px',
                      borderRadius: m.from === 'me' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                      background: m.from === 'me' ? '#c9a84c' : '#161616',
                      border: m.from === 'me' ? 'none' : '1px solid #1e1e1e',
                      color: m.from === 'me' ? '#0a0a0a' : '#d0d0d0',
                      fontSize: 13, fontFamily: 'DM Sans', lineHeight: 1.5,
                    }}>{m.text}</div>
                  </div>
                ))}
              </div>
              <form onSubmit={send} style={{ padding: '14px 20px', borderTop: '1px solid #1e1e1e', display: 'flex', gap: 10, flexShrink: 0 }}>
                <input
                  placeholder={`Message ${sel?.name}...`}
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  style={{ flex: 1, padding: '11px 14px', background: '#111', border: '1px solid #1a1a1a', borderRadius: 10, fontSize: 13, color: '#d0d0d0', fontFamily: 'DM Sans' }}
                />
                <button type="submit" style={{
                  background: '#c9a84c', border: 'none', color: '#0a0a0a',
                  padding: '11px 16px', borderRadius: 10, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontFamily: 'Syne', fontWeight: 700, fontSize: 13,
                  transition: 'background 0.18s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#e8c46a'}
                  onMouseLeave={e => e.currentTarget.style.background = '#c9a84c'}
                >
                  <IconSend /> Send
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  )
}