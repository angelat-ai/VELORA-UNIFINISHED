import Sidebar from '../components/Sidebar'

export default function NotificationsPage() {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#0a0a0a', overflow: 'hidden' }}>
      <Sidebar />
      <main style={{ marginLeft: 220, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #1e1e1e', flexShrink: 0, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)' }}>
          <h1 style={{ fontFamily: 'Syne', fontSize: 19, fontWeight: 700 }}>Notifications</h1>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <div style={{
            background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 14,
            padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center',
          }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </div>
            <h3 style={{ fontFamily: 'Syne', fontSize: 16, fontWeight: 700, color: '#555' }}>All caught up!</h3>
            <p style={{ color: '#2a2a2a', fontSize: 13, maxWidth: 280, lineHeight: 1.7 }}>No notifications yet. They'll appear when you get followers, likes, or comments.</p>
          </div>
        </div>
      </main>
    </div>
  )
}