import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)
const IconBookmark = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
)
const IconFolder = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
)
const IconX = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const DEFAULT_COLLECTIONS = [
  { id: 1, name: 'Workout Plans', count: 0, color: '#c9a84c' },
  { id: 2, name: 'Meal Preps', count: 0, color: '#52c07a' },
  { id: 3, name: 'Inspiration', count: 0, color: '#6ab0e8' },
]

export default function CollectionsPage() {
  const [collections, setCollections] = useState(DEFAULT_COLLECTIONS)
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')
  const [active, setActive] = useState(null)

  const createCollection = () => {
    if (!newName.trim()) return
    const colors = ['#c9a84c', '#52c07a', '#6ab0e8', '#e08052', '#a07ae8']
    setCollections(p => [...p, {
      id: Date.now(), name: newName.trim(),
      count: 0, color: colors[p.length % colors.length],
    }])
    setNewName('')
    setShowCreate(false)
  }

  const deleteCollection = (id) => {
    setCollections(p => p.filter(c => c.id !== id))
    if (active === id) setActive(null)
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#080808', overflow: 'hidden' }}>
      <Sidebar />
      <main style={{ marginLeft: 220, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{
          padding: '15px 28px', borderBottom: '1px solid rgba(255,255,255,0.05)',
          flexShrink: 0, background: 'rgba(8,8,8,0.9)', backdropFilter: 'blur(20px)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <h1 style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>Collections</h1>
          <button
            onClick={() => setShowCreate(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: '#c9a84c', color: '#080808',
              fontFamily: 'Syne', fontWeight: 700, fontSize: 12,
              padding: '9px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(201,168,76,0.2)',
              transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#e8c46a'; e.currentTarget.style.transform = 'scale(1.02)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#c9a84c'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            <IconPlus /> New Collection
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px 40px' }}>
          {/* Create modal */}
          {showCreate && (
            <div style={{
              background: 'rgba(14,14,14,0.97)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14, padding: '24px',
              marginBottom: 24,
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              animation: 'fadeUp 0.25s ease both',
            }}>
              <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)', borderRadius: 2, marginBottom: 20 }} />
              <h3 style={{ fontFamily: 'Syne', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Create New Collection</h3>
              <div style={{ display: 'flex', gap: 10 }}>
                <input
                  placeholder="Collection name..."
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && createCollection()}
                  autoFocus
                  style={{ flex: 1, padding: '10px 14px', background: 'rgba(8,8,8,0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 9, fontSize: 14, color: '#EAEAEA' }}
                />
                <button onClick={createCollection} style={{
                  background: '#c9a84c', color: '#080808', fontFamily: 'Syne', fontWeight: 700, fontSize: 13,
                  padding: '10px 20px', borderRadius: 9, border: 'none', cursor: 'pointer', transition: 'background 0.18s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#e8c46a'}
                  onMouseLeave={e => e.currentTarget.style.background = '#c9a84c'}
                >Create</button>
                <button onClick={() => { setShowCreate(false); setNewName('') }} style={{
                  background: 'rgba(255,255,255,0.04)', color: 'rgba(234,234,234,0.5)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '10px 14px', borderRadius: 9, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.18s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(234,234,234,0.9)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(234,234,234,0.5)'}
                ><IconX /></button>
              </div>
            </div>
          )}

          {/* Collections grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 36 }}>
            {collections.map((c, i) => (
              <div
                key={c.id}
                onClick={() => setActive(active === c.id ? null : c.id)}
                style={{
                  background: active === c.id ? 'rgba(201,168,76,0.07)' : 'rgba(14,14,14,0.9)',
                  border: `1px solid ${active === c.id ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 14, padding: '22px 20px',
                  cursor: 'pointer',
                  transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
                  position: 'relative',
                  animation: `fadeUp 0.35s ease ${i * 60}ms both`,
                }}
                onMouseEnter={e => { if (active !== c.id) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(-3px)' } }}
                onMouseLeave={e => { if (active !== c.id) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' } }}
              >
                {/* Delete */}
                <button
                  onClick={e => { e.stopPropagation(); deleteCollection(c.id) }}
                  style={{
                    position: 'absolute', top: 12, right: 12,
                    background: 'none', border: 'none',
                    color: 'rgba(234,234,234,0.15)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 4, borderRadius: 4, transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#e05252'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(234,234,234,0.15)'}
                ><IconX /></button>

                <div style={{
                  width: 44, height: 44, borderRadius: 10, marginBottom: 16,
                  background: `${c.color}15`,
                  border: `1px solid ${c.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: c.color,
                }}>
                  <IconFolder />
                </div>

                <h3 style={{ fontFamily: 'Syne', fontSize: 14, fontWeight: 700, color: '#EAEAEA', marginBottom: 6 }}>
                  {c.name}
                </h3>
                <p style={{ fontSize: 12, color: 'rgba(234,234,234,0.3)', fontFamily: 'DM Sans' }}>
                  {c.count} saved items
                </p>

                {active === c.id && (
                  <div style={{
                    marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)',
                    color: 'rgba(234,234,234,0.3)', fontSize: 13, fontFamily: 'DM Sans',
                    display: 'flex', alignItems: 'center', gap: 8,
                    animation: 'fadeUp 0.25s ease both',
                  }}>
                    <IconBookmark />
                    No saved posts yet — bookmark posts from your feed to add them here.
                  </div>
                )}
              </div>
            ))}

            {/* Add new placeholder */}
            <div
              onClick={() => setShowCreate(true)}
              style={{
                background: 'transparent',
                border: '1px dashed rgba(255,255,255,0.1)',
                borderRadius: 14, padding: '22px 20px',
                cursor: 'pointer', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 10,
                transition: 'all 0.2s',
                minHeight: 130,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.background = 'rgba(201,168,76,0.04)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'transparent' }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c',
              }}><IconPlus /></div>
              <span style={{ fontFamily: 'DM Sans', fontSize: 13, color: 'rgba(234,234,234,0.3)' }}>New Collection</span>
            </div>
          </div>

          {/* Empty state info */}
          <div style={{
            background: 'rgba(12,12,12,0.95)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 14,
            padding: '32px 28px',
            display: 'flex', alignItems: 'center', gap: 24,
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
              background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'float 3.5s ease-in-out infinite',
            }}>
              <IconBookmark />
            </div>
            <div>
              <h3 style={{ fontFamily: 'Syne', fontSize: 15, fontWeight: 700, marginBottom: 6, color: '#EAEAEA' }}>
                How Collections Work
              </h3>
              <p style={{ color: 'rgba(234,234,234,0.4)', fontSize: 14, lineHeight: 1.7, maxWidth: 500 }}>
                Click the <strong style={{ color: 'rgba(234,234,234,0.6)' }}>bookmark icon</strong> on any post in your feed to save it here.
                Organize your saved workout plans, meal preps, and inspiration into separate folders.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}