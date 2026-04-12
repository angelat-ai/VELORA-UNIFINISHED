import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import PostCard from '../components/PostCard'
import NewPostModal from '../components/NewPostModal'
import { useAuth } from '../context/AuthContext'

const SUGGESTIONS = [
  { name: 'Jeff Nippard', handle: 'jeff_nip_official', similarity: '78%', verified: true },
  { name: 'Alex Eubank', handle: 'Elysium_Alex', similarity: '71%', verified: true },
  { name: 'Hussein Farhat', handle: 'Frnrt_Hussein', similarity: '65%', verified: true },
  { name: 'Sam Sulek', handle: 'Sam_Sulek_Official', similarity: '60%', verified: true },
]

export default function HomePage() {
  const [tab, setTab] = useState('all')
  const [posts, setPosts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const { user } = useAuth()
  const nav = useNavigate()

  const handlePost = (postData) => {
    setPosts(prev => [{
      id: Date.now(),
      author: user?.name || 'You',
      handle: user?.username || 'me',
      verified: false,
      timestamp: new Date(),
      ...postData,
    }, ...prev])
  }

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: '#0a0a0a',
      position: 'relative',
    }}>
      <Sidebar onNewPost={() => setShowModal(true)} />

      <main style={{ 
        marginLeft: 220, 
        flex: 1, 
        minWidth: 0, 
        maxWidth: 640, 
        padding: '0 0 40px',
      }}>
        <div style={{
          padding: '22px 28px', 
          borderBottom: '1px solid #1a1a1a',
          position: 'sticky', 
          top: 0, 
          background: 'rgba(10,10,10,0.9)',
          backdropFilter: 'blur(10px)', 
          zIndex: 10,
        }}>
          <h1 style={{ fontFamily: 'Syne', fontSize: 20, fontWeight: 700, margin: 0 }}>Home</h1>
        </div>

        <div style={{ padding: '20px 28px 0' }}>
          <div style={{
            background: '#111', 
            border: '1px solid #1a1a1a', 
            borderRadius: 12,
            padding: '14px 18px', 
            marginBottom: 20, 
            cursor: 'pointer', 
            transition: 'border-color 0.2s',
          }}
            onClick={() => setShowModal(true)}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#2a2a2a'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #c9a84c, #888)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, color: '#0a0a0a', fontFamily: 'Syne',
              }}>
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span style={{ color: '#666', fontSize: 14, fontFamily: 'DM Sans' }}>What's on your mind?</span>
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 14, paddingTop: 12, borderTop: '1px solid #1a1a1a' }}>
              <span style={{ color: '#666', fontSize: 13 }}>🖼 Photo</span>
              <span style={{ color: '#666', fontSize: 13 }}>🎥 Video</span>
              <span style={{ color: '#666', fontSize: 13 }}>📊 Progress</span>
              <span style={{ marginLeft: 'auto', color: '#c9a84c', fontSize: 12, fontFamily: 'DM Sans' }}>myfitnesspal ↗</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {['all', 'following'].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: '8px 20px', borderRadius: 20, fontSize: 14, fontFamily: 'DM Sans',
                background: tab === t ? '#c9a84c' : 'transparent',
                color: tab === t ? '#0a0a0a' : '#666',
                border: `1px solid ${tab === t ? '#c9a84c' : '#2a2a2a'}`,
                cursor: 'pointer', fontWeight: tab === t ? 700 : 400, transition: 'all 0.2s',
                textTransform: 'capitalize',
              }}>{t}</button>
            ))}
          </div>

          {posts.length === 0 ? (
            <div style={{
              background: '#111', 
              border: '1px solid #1a1a1a', 
              borderRadius: 16, 
              padding: '48px 32px',
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: 14, 
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 44 }}>🏋️</div>
              <h3 style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 700, margin: 0 }}>Feed is Empty</h3>
              <p style={{ color: '#888', fontSize: 14, maxWidth: 300, lineHeight: 1.6, margin: 0 }}>
                No posts yet. Follow creators or be the first to post something!
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                <button className="btn-gold" style={{ fontSize: 13, padding: '10px 20px' }} onClick={() => nav('/creators')}>
                  Discover Creators
                </button>
                <button className="btn-outline" style={{ fontSize: 13, padding: '10px 20px' }} onClick={() => setShowModal(true)}>
                  Create Post
                </button>
              </div>
            </div>
          ) : (
            posts.map(p => <PostCard key={p.id} post={p} />)
          )}
        </div>
      </main>

      <aside style={{
        width: 320, 
        flexShrink: 0, 
        borderLeft: '1px solid #1a1a1a',
        padding: '22px 20px', 
        position: 'sticky', 
        top: 0, 
        height: '100vh',
        overflowY: 'auto', 
        background: '#0a0a0a',
      }}>
        <div style={{ marginBottom: 18 }}>
          <div style={{
            display: 'flex', 
            alignItems: 'center', 
            gap: 10,
            background: '#111', 
            border: '1px solid #1a1a1a', 
            borderRadius: 10, 
            padding: '10px 14px',
          }}>
            <span style={{ color: '#555', fontSize: 15 }}>🔍</span>
            <input placeholder="Search Velora..." style={{
              background: 'transparent', 
              border: 'none', 
              flex: 1, 
              fontSize: 13, 
              color: '#888',
              padding: 0,
            }} />
          </div>
        </div>

        <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Syne', fontSize: 14, fontWeight: 700 }}>Suggestions</span>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ background: '#1a1a1a', border: '1px solid #222', color: '#666', padding: '3px 9px', borderRadius: 5, cursor: 'pointer', fontSize: 11 }}>{'<'}</button>
            <button style={{ background: '#1a1a1a', border: '1px solid #222', color: '#666', padding: '3px 9px', borderRadius: 5, cursor: 'pointer', fontSize: 11 }}>{'>'}</button>
          </div>
        </div>
        <p style={{ fontSize: 11, color: '#555', marginBottom: 12 }}>75–89% Body Frame Similarity</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {SUGGESTIONS.map(s => (
            <div key={s.name} style={{
              background: '#111', 
              border: '1px solid #1a1a1a', 
              borderRadius: 10,
              padding: '11px 13px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: 10,
              cursor: 'pointer', 
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#2a2a2a'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}
            >
              <div style={{
                width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, rgba(201,168,76,0.3), rgba(51,51,51,0.6))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, color: '#c9a84c', fontFamily: 'Syne', fontWeight: 700,
              }}>
                {s.name[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: '#e0e0e0', fontFamily: 'Syne', fontWeight: 600, display: 'flex', gap: 4, alignItems: 'center' }}>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</span>
                  {s.verified && <span style={{ color: '#c9a84c', fontSize: 10, flexShrink: 0 }}>✓</span>}
                </div>
                <div style={{ fontSize: 11, color: '#555' }}>@{s.handle}</div>
              </div>
              <button style={{
                background: '#c9a84c', 
                border: 'none', 
                color: '#0a0a0a',
                fontSize: 11, 
                fontFamily: 'Syne', 
                fontWeight: 700,
                padding: '4px 10px', 
                borderRadius: 5, 
                cursor: 'pointer', 
                flexShrink: 0,
              }}>+</button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: '16px', background: '#111', border: '1px solid #1a1a1a', borderRadius: 12 }}>
          <h4 style={{ fontFamily: 'Syne', fontSize: 13, fontWeight: 700, marginBottom: 10, color: '#c9a84c', margin: '0 0 10px 0' }}>Your Stats</h4>
          {[
            { label: 'Posts', val: posts.length },
            { label: 'Followers', val: 0 },
            { label: 'Following', val: 0 },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #1a1a1a' }}>
              <span style={{ fontSize: 13, color: '#666' }}>{s.label}</span>
              <span style={{ fontFamily: 'Syne', fontSize: 13, fontWeight: 700, color: '#e0e0e0' }}>{s.val}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, color: '#444', fontSize: 11, lineHeight: 1.8 }}>
          © 2025 Velora Inc. All Rights Reserved.<br />
          Privacy Policy · Terms of Service · Community Guidelines
        </div>
      </aside>

      {showModal && <NewPostModal onClose={() => setShowModal(false)} onPost={handlePost} />}
    </div>
  )
}