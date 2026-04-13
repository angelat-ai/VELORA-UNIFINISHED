import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import VeloraLogo from '../components/VeloraLogo'

const IconGrid = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
const IconChart = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
const IconUsers = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
const IconStar = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
const IconFlag = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
const IconSettings = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M20 12h2M2 12h2M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41"/></svg>
const IconPower = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>

const ADMIN_NAV = [
  { Icon: IconGrid,     label: 'Dashboard', key: 'dashboard' },
  { Icon: IconChart,    label: 'Analytics',  key: 'analytics'  },
  { Icon: IconUsers,    label: 'Users',      key: 'users'      },
  { Icon: IconStar,     label: 'Creators',   key: 'creators'   },
  { Icon: IconFlag,     label: 'Reports',    key: 'reports'    },
  { Icon: IconSettings, label: 'Settings',   key: 'settings'   },
]

const STATS = [
  { label: 'Total Users',       value: '0',  note: 'Registered accounts',   isRevenue: false },
  { label: 'Active Creators',   value: '0',  note: 'Verified creators',      isRevenue: false },
  { label: 'Posts Today',       value: '0',  note: 'Content published',      isRevenue: false },
  { label: 'Revenue',           value: '$0', note: 'Total platform revenue', isRevenue: true  },
  { label: 'Subscriptions',     value: '0',  note: 'Active subscriptions',   isRevenue: false },
  { label: 'Reports Pending',   value: '0',  note: 'Needs review',           isRevenue: false },
]

export default function AdminDashboard() {
  const [active, setActive] = useState('dashboard')
  const { logout } = useAuth()
  const nav = useNavigate()

  return (
    <div style={{
      display: 'flex', height: '100vh', width: '100vw',
      background: '#080808', overflow: 'hidden',
    }}>
      {/* ── Sidebar ─────────────────────────────── */}
      <aside style={{
        width: 220, flexShrink: 0,
        background: 'rgba(10,10,10,0.97)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', flexDirection: 'column',
        padding: '20px 10px',
        boxShadow: '4px 0 24px rgba(0,0,0,0.4)',
      }}>
        <div style={{ marginBottom: 8, paddingLeft: 8 }}>
          <VeloraLogo size={28} textSize={14} />
        </div>
        <div style={{ padding: '6px 10px 18px' }}>
          <span style={{
            fontSize: 10, color: '#c9a84c',
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: 4, padding: '2px 8px',
            fontFamily: 'DM Sans', letterSpacing: 1.5, fontWeight: 600,
          }}>ADMIN PANEL</span>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto' }}>
          {ADMIN_NAV.map(({ Icon, label, key }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 11,
                padding: '10px 12px', borderRadius: 10,
                border: 'none',
                borderLeft: active === key ? '2px solid #c9a84c' : '2px solid transparent',
                background: active === key ? 'rgba(201,168,76,0.08)' : 'transparent',
                color: active === key ? '#c9a84c' : 'rgba(234,234,234,0.35)',
                fontFamily: 'DM Sans', fontSize: 13,
                fontWeight: active === key ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
                textAlign: 'left', width: '100%',
                boxShadow: active === key ? '0 0 10px rgba(201,168,76,0.07)' : 'none',
              }}
              onMouseEnter={e => {
                if (active !== key) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.color = 'rgba(234,234,234,0.65)'
                  e.currentTarget.style.borderLeftColor = 'rgba(201,168,76,0.2)'
                }
              }}
              onMouseLeave={e => {
                if (active !== key) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'rgba(234,234,234,0.35)'
                  e.currentTarget.style.borderLeftColor = 'transparent'
                }
              }}
            >
              <span style={{ flexShrink: 0, opacity: active === key ? 1 : 0.6 }}><Icon /></span>
              {label}
            </button>
          ))}
        </nav>

        <div style={{ paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 10,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #c9a84c, #7a6530)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: '#080808', fontFamily: 'Syne',
              boxShadow: '0 2px 8px rgba(201,168,76,0.25)',
            }}>A</div>
            <div>
              <div style={{ fontSize: 12, color: '#EAEAEA', fontFamily: 'Syne', fontWeight: 600 }}>Velora Admin</div>
              <div style={{ fontSize: 10, color: 'rgba(234,234,234,0.3)' }}>admin@velora.com</div>
            </div>
          </div>
          <button
            onClick={() => { logout(); nav('/') }}
            style={{
              width: '100%', padding: '9px', borderRadius: 8,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(234,234,234,0.3)',
              fontSize: 12, fontFamily: 'DM Sans', cursor: 'pointer',
              transition: 'all 0.18s cubic-bezier(0.4,0,0.2,1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(224,82,82,0.5)'
              e.currentTarget.style.color = '#e05252'
              e.currentTarget.style.background = 'rgba(224,82,82,0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.color = 'rgba(234,234,234,0.3)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            <IconPower /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────── */}
      <main style={{
        flex: 1, overflowY: 'auto',
        padding: '32px 36px',
        minWidth: 0,
      }}>
        {active === 'dashboard' && <DashView />}
        {active === 'analytics'  && <AnalyticsView />}
        {active === 'users'      && <UsersView />}
        {active === 'creators'   && <CreatorsView />}
        {active === 'reports'    && <ReportsView />}
        {active === 'settings'   && <SettingsView />}
      </main>
    </div>
  )
}

/* ── Shared helpers ─────────────────────────────────── */

function SectionHeader({ title, sub }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h1 style={{
        fontFamily: 'Syne', fontSize: 22, fontWeight: 800,
        letterSpacing: '1px', textTransform: 'uppercase',
        color: '#EAEAEA', marginBottom: 4,
      }}>{title}</h1>
      {sub && <p style={{ color: 'rgba(234,234,234,0.4)', fontSize: 13, fontFamily: 'DM Sans' }}>{sub}</p>}
    </div>
  )
}

function StatCard({ stat }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: stat.isRevenue
          ? 'radial-gradient(ellipse at top left, rgba(201,168,76,0.1) 0%, rgba(16,16,16,0.95) 60%)'
          : 'rgba(16,16,16,0.9)',
        border: `1px solid ${hov ? (stat.isRevenue ? 'rgba(201,168,76,0.35)' : 'rgba(255,255,255,0.1)') : (stat.isRevenue ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.05)')}`,
        borderRadius: 14,
        padding: '20px 22px',
        backdropFilter: 'blur(12px)',
        boxShadow: hov
          ? (stat.isRevenue ? '0 8px 32px rgba(201,168,76,0.15)' : '0 8px 28px rgba(0,0,0,0.5)')
          : '0 4px 16px rgba(0,0,0,0.35)',
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
        cursor: 'default',
      }}
    >
      <div style={{ fontSize: 11, color: stat.isRevenue ? 'rgba(201,168,76,0.7)' : 'rgba(234,234,234,0.35)', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10, fontFamily: 'DM Sans', fontWeight: 600 }}>
        {stat.label}
      </div>
      <div style={{
        fontFamily: 'Syne', fontSize: 32, fontWeight: 800,
        color: stat.isRevenue ? '#c9a84c' : '#EAEAEA',
        letterSpacing: '-0.5px', marginBottom: 4,
      }}>{stat.value}</div>
      <div style={{ fontSize: 12, color: 'rgba(234,234,234,0.25)', fontFamily: 'DM Sans' }}>{stat.note}</div>
    </div>
  )
}

function EmptyChart({ title }) {
  const bars = [20, 35, 28, 45, 40, 55, 50, 38, 62, 44]
  return (
    <div style={{
      background: 'rgba(14,14,14,0.9)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: 14, padding: '20px 22px',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    }}>
      <h3 style={{
        fontFamily: 'Syne', fontSize: 13, fontWeight: 700,
        color: 'rgba(234,234,234,0.6)', marginBottom: 20,
        letterSpacing: '0.5px', textTransform: 'uppercase',
      }}>{title}</h3>
      <div style={{ height: 120, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 0 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 80 }}>
          {bars.map((h, i) => (
            <div key={i} style={{
              flex: 1, height: `${h}%`,
              background: `rgba(201,168,76,${0.06 + (i / bars.length) * 0.1})`,
              borderRadius: '3px 3px 0 0',
              border: '1px solid rgba(201,168,76,0.12)',
              transition: 'height 0.3s ease',
            }} />
          ))}
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginTop: 8 }} />
        <p style={{ color: 'rgba(234,234,234,0.2)', fontSize: 11, marginTop: 10, fontFamily: 'DM Sans' }}>No data yet — will populate when users join</p>
      </div>
    </div>
  )
}

function TableView({ title, sub, cols }) {
  return (
    <div>
      <SectionHeader title={title} sub={sub} />
      <div style={{
        background: 'rgba(14,14,14,0.9)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: 14, overflow: 'hidden',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}>
        <div style={{
          padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <h3 style={{ fontFamily: 'Syne', fontSize: 14, fontWeight: 700, color: '#EAEAEA', letterSpacing: '0.5px' }}>
            {title} List
          </h3>
          <span style={{ fontSize: 11, color: 'rgba(234,234,234,0.25)', fontFamily: 'DM Sans' }}>0 records</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(8,8,8,0.6)' }}>
              {cols.map(c => (
                <th key={c} style={{
                  padding: '11px 16px', textAlign: 'left',
                  fontSize: 10, color: 'rgba(234,234,234,0.3)',
                  fontFamily: 'DM Sans', fontWeight: 600,
                  letterSpacing: 1, textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={cols.length} style={{
                padding: '52px', textAlign: 'center',
                color: 'rgba(234,234,234,0.2)', fontSize: 13,
                fontFamily: 'DM Sans',
              }}>
                No records found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ── View components ─────────────────────────────────── */

function DashView() {
  return (
    <div style={{ animation: 'fadeUp 0.3s ease both' }}>
      <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }`}</style>
      <SectionHeader title="Dashboard" sub="Platform overview — launched and ready for users." />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 14, marginBottom: 28,
      }}>
        {STATS.map(s => <StatCard key={s.label} stat={s} />)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {['User Growth', 'Revenue Over Time', 'Posts per Day', 'Active Subscriptions'].map(t => (
          <EmptyChart key={t} title={t} />
        ))}
      </div>
    </div>
  )
}

function AnalyticsView() {
  return (
    <div>
      <SectionHeader title="Analytics" sub="Platform performance metrics and insights." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Avg. Session', val: '—' },
          { label: 'Bounce Rate', val: '—' },
          { label: 'Conversion', val: '—' },
          { label: 'Retention', val: '—' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'rgba(16,16,16,0.9)', border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 12, padding: '16px 18px',
            backdropFilter: 'blur(12px)',
          }}>
            <div style={{ fontSize: 10, color: 'rgba(234,234,234,0.35)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, fontFamily: 'DM Sans', fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontFamily: 'Syne', fontSize: 26, fontWeight: 800, color: 'rgba(234,234,234,0.2)' }}>{s.val}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
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
    { label: 'Platform Name',            val: 'Velora',             type: 'text'   },
    { label: 'Support Email',            val: 'support@velora.com', type: 'email'  },
    { label: 'Max Upload Size (MB)',      val: '100',                type: 'number' },
    { label: 'Creator Commission (%)',    val: '80',                 type: 'number' },
    { label: 'Subscription Fee Cap ($)', val: '99.99',              type: 'number' },
    { label: 'Free Trial Days',          val: '7',                  type: 'number' },
  ]
  return (
    <div>
      <SectionHeader title="Settings" sub="Configure platform-wide settings and policies." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 560 }}>
        {fields.map(f => (
          <div key={f.label} style={{
            background: 'rgba(16,16,16,0.9)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 10, padding: '13px 18px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            backdropFilter: 'blur(12px)',
            transition: 'border-color 0.18s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
          >
            <span style={{ fontSize: 13, color: 'rgba(234,234,234,0.55)', fontFamily: 'DM Sans' }}>{f.label}</span>
            <input
              type={f.type}
              defaultValue={f.val}
              style={{
                width: 160, padding: '8px 12px',
                background: 'rgba(8,8,8,0.8)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 6, fontSize: 13,
                textAlign: 'right', color: '#EAEAEA', fontFamily: 'DM Sans',
              }}
            />
          </div>
        ))}
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button className="btn-gold" style={{ padding: '11px 28px', fontSize: 13 }}>Save Changes</button>
          <button className="btn-outline" style={{ padding: '11px 20px', fontSize: 13 }}>Reset Defaults</button>
        </div>
      </div>
    </div>
  )
}