import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import VeloraLogo from '../components/VeloraLogo'

const ADMIN_NAV = [
  { icon: '⊞', label: 'Dashboard', key: 'dashboard' },
  { icon: '📊', label: 'Analytics', key: 'analytics' },
  { icon: '👥', label: 'Users', key: 'users' },
  { icon: '⭐', label: 'Creators', key: 'creators' },
  { icon: '📋', label: 'Reports', key: 'reports' },
  { icon: '⚙', label: 'Settings', key: 'settings' },
]

const STATS = [
  { label: 'Total Users', value: '0', icon: '👥', note: 'Registered accounts' },
  { label: 'Active Creators', value: '0', icon: '⭐', note: 'Verified creators' },
  { label: 'Posts Today', value: '0', icon: '📝', note: 'Content published' },
  { label: 'Revenue', value: '$0', icon: '💰', note: 'Total platform revenue' },
  { label: 'Subscriptions', value: '0', icon: '🔔', note: 'Active subscriptions' },
  { label: 'Reports Pending', value: '0', icon: '🚨', note: 'Needs review' },
]

export default function AdminDashboard() {
  const [active, setActive] = useState('dashboard')
  const { logout } = useAuth()
  const nav = useNavigate()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a' }}>
      <aside style={{
        width: 220, background: '#111', borderRight: '1px solid #1a1a1a',
        display: 'flex', flexDirection: 'column', padding: '24px 14px',
        position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 50,
      }}>
        <div style={{ marginBottom: 8, paddingLeft: 6 }}>
          <VeloraLogo size={28} textSize={14} />
        </div>
        <div style={{ padding: '6px 8px 20px' }}>
          <span style={{
            fontSize: 10, color: '#c9a84c', background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.2)', borderRadius: 4,
            padding: '2px 8px', fontFamily: 'DM Sans', letterSpacing: 1,
          }}>ADMIN PANEL</span>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {ADMIN_NAV.map(item => (
            <button key={item.key} onClick={() => setActive(item.key)} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 12px', borderRadius: 10, border: 'none',
              background: active === item.key ? 'rgba(201,168,76,0.12)' : 'transparent',
              color: active === item.key ? '#c9a84c' : '#666',
              fontFamily: 'DM Sans', fontSize: 14, fontWeight: active === item.key ? 600 : 400,
              cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', width: '100%',
            }}
              onMouseEnter={e => { if (active !== item.key) { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#aaa' } }}
              onMouseLeave={e => { if (active !== item.key) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#666' } }}
            >
              <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ paddingTop: 16, borderTop: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px', background: '#1a1a1a', borderRadius: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, #c9a84c, #888)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: '#0a0a0a', fontFamily: 'Syne',
            }}>A</div>
            <div>
              <div style={{ fontSize: 12, color: '#e0e0e0', fontFamily: 'Syne', fontWeight: 600 }}>Velora Admin</div>
              <div style={{ fontSize: 10, color: '#555' }}>admin@velora.com</div>
            </div>
          </div>
          <button onClick={() => { logout(); nav('/') }} style={{
            width: '100%', padding: '9px', borderRadius: 8,
            background: 'transparent', border: '1px solid #2a2a2a',
            color: '#555', fontSize: 13, fontFamily: 'DM Sans', cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#e05252'; e.currentTarget.style.color = '#e05252' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#555' }}
          >Sign Out</button>
        </div>
      </aside>

      <main style={{ marginLeft: 220, flex: 1, padding: '32px 36px', overflowY: 'auto' }}>
        {active === 'dashboard' && <DashView />}
        {active === 'analytics' && <AnalyticsView />}
        {active === 'users' && <UsersView />}
        {active === 'creators' && <CreatorsView />}
        {active === 'reports' && <ReportsView />}
        {active === 'settings' && <SettingsView />}
      </main>
    </div>
  )
}

function SectionHeader({ title, sub }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h1 style={{ fontFamily: 'Syne', fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{title}</h1>
      {sub && <p style={{ color: '#555', fontSize: 14 }}>{sub}</p>}
    </div>
  )
}

function DashView() {
  return (
    <div>
      <SectionHeader title="Dashboard" sub="Platform overview — launched and ready." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {STATS.map(s => (
          <div key={s.label} style={{
            background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, padding: '20px 22px',
            transition: 'border-color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#c9a84c33'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{s.label}</div>
                <div style={{ fontFamily: 'Syne', fontSize: 30, fontWeight: 800 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: '#444', marginTop: 4 }}>{s.note}</div>
              </div>
              <span style={{ fontSize: 24 }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {['User Growth', 'Revenue Over Time', 'Posts per Day', 'Active Subscriptions'].map(t => (
          <EmptyChart key={t} title={t} />
        ))}
      </div>
    </div>
  )
}

function EmptyChart({ title }) {
  return (
    <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, padding: '20px 22px' }}>
      <h3 style={{ fontFamily: 'Syne', fontSize: 14, fontWeight: 600, marginBottom: 16, color: '#888' }}>{title}</h3>
      <div style={{ height: 130, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 60 }}>
          {[20, 35, 28, 45, 40, 55, 50].map((h, i) => (
            <div key={i} style={{ width: 20, height: `${h}%`, background: '#2a2a2a', borderRadius: 3 }} />
          ))}
        </div>
        <p style={{ color: '#333', fontSize: 12 }}>No data yet</p>
      </div>
    </div>
  )
}

function TableView({ title, sub, cols }) {
  return (
    <div>
      <SectionHeader title={title} sub={sub} />
      <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between' }}>
          <h3 style={{ fontFamily: 'Syne', fontSize: 15, fontWeight: 600 }}>{title} List</h3>
          <span style={{ fontSize: 12, color: '#444' }}>0 records</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#0d0d0d' }}>
              {cols.map(c => (
                <th key={c} style={{
                  padding: '12px 16px', textAlign: 'left',
                  fontSize: 11, color: '#555', fontFamily: 'DM Sans',
                  fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase',
                }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={cols.length} style={{ padding: '48px', textAlign: 'center', color: '#333', fontSize: 14 }}>
                No records found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AnalyticsView() {
  return (
    <div>
      <SectionHeader title="Analytics" sub="Platform performance metrics and insights." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Avg. Session', val: '—' },
          { label: 'Bounce Rate', val: '—' },
          { label: 'Conversion', val: '—' },
          { label: 'Retention', val: '—' },
        ].map(s => (
          <div key={s.label} style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontFamily: 'Syne', fontSize: 24, fontWeight: 800, color: '#333' }}>{s.val}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {['Daily Active Users', 'Engagement Rate', 'Content Views', 'Creator Earnings'].map(t => (
          <EmptyChart key={t} title={t} />
        ))}
      </div>
    </div>
  )
}

function UsersView() {
  return <TableView title="Users" sub="Manage accounts, roles, and permissions." cols={['ID', 'Name', 'Email', 'Role', 'Joined', 'Status', 'Actions']} />
}

function CreatorsView() {
  return <TableView title="Creators" sub="Review and approve creator applications." cols={['Creator', 'Handle', 'Applied', 'Followers', 'Revenue', 'Status', 'Actions']} />
}

function ReportsView() {
  return <TableView title="Reports" sub="Review content flags and user-submitted reports." cols={['ID', 'Type', 'Reported By', 'Target', 'Date', 'Severity', 'Status']} />
}

function SettingsView() {
  const fields = [
    { label: 'Platform Name', val: 'Velora', type: 'text' },
    { label: 'Support Email', val: 'support@velora.com', type: 'email' },
    { label: 'Max Upload Size (MB)', val: '100', type: 'number' },
    { label: 'Creator Commission (%)', val: '80', type: 'number' },
    { label: 'Subscription Fee Cap ($)', val: '99.99', type: 'number' },
    { label: 'Free Trial Days', val: '7', type: 'number' },
  ]
  return (
    <div>
      <SectionHeader title="Settings" sub="Configure platform-wide settings and policies." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 560 }}>
        {fields.map(f => (
          <div key={f.label} style={{
            background: '#111', border: '1px solid #1a1a1a', borderRadius: 10, padding: '14px 20px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: 14, color: '#888' }}>{f.label}</span>
            <input
              type={f.type}
              defaultValue={f.val}
              style={{ width: 160, padding: '8px 12px', background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: 6, fontSize: 14, textAlign: 'right' }}
            />
          </div>
        ))}
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button className="btn-gold" style={{ padding: '11px 28px', fontSize: 14 }}>Save Changes</button>
          <button className="btn-outline" style={{ padding: '11px 20px', fontSize: 14 }}>Reset Defaults</button>
        </div>
      </div>
    </div>
  )
}