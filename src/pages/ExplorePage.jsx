import Sidebar from '../components/Sidebar'

export default function ExplorePage() {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#0a0a0a', overflow: 'hidden' }}>
      <Sidebar />
      <main style={{ marginLeft: 220, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #1e1e1e', flexShrink: 0 }}>
          <h1 style={{ fontFamily: 'Syne', fontSize: 19, fontWeight: 700 }}>Subscriptions</h1>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <div style={{
            background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 14,
            padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center',
          }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 style={{ fontFamily: 'Syne', fontSize: 16, fontWeight: 700, color: '#555' }}>No subscriptions</h3>
            <p style={{ color: '#2a2a2a', fontSize: 13, maxWidth: 280, lineHeight: 1.7 }}>Subscribe to your favorite fitness creators to access their exclusive content here.</p>
          </div>
        </div>
      </main>
    </div>
  )
}