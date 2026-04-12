import Sidebar from '../components/Sidebar'

export default function ExplorePage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a' }}>
      <Sidebar />
      <main style={{ marginLeft: 220, flex: 1, maxWidth: 900 }}>
        <div style={{ padding: '22px 32px', borderBottom: '1px solid #1a1a1a', position: 'sticky', top: 0, background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(10px)', zIndex: 10 }}>
          <h1 style={{ fontFamily: 'Syne', fontSize: 20, fontWeight: 700 }}>Subscriptions</h1>
        </div>
        <div style={{ padding: '28px 32px' }}>
          <p style={{ color: '#555', fontSize: 14, marginBottom: 32 }}>Creators you subscribe to will appear here.</p>
          <div style={{
            background: '#111', border: '1px solid #1a1a1a', borderRadius: 16, padding: '48px 32px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12,
          }}>
            <div style={{ fontSize: 44 }}>👥</div>
            <h3 style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 700 }}>No subscriptions</h3>
            <p style={{ color: '#555', fontSize: 14, maxWidth: 320, lineHeight: 1.6 }}>
              Subscribe to your favorite fitness creators to access their exclusive content.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}