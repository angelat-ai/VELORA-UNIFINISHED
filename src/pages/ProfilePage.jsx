import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import NewPostModal from '../components/NewPostModal'
import PostCard from '../components/PostCard'
import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const { username } = useParams()
  const { user } = useAuth()
  const isOwn = user?.username === username
  const [posts, setPosts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState('posts')

  const fp = user?.fitnessProfile || {}

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

  const BODY_STATS = [
    { label: 'Height', val: fp.height ? `${fp.height}cm` : '—' },
    { label: 'Weight', val: fp.weight ? `${fp.weight}kg` : '—' },
    { label: 'Body Fat', val: fp.bodyFat ? `${fp.bodyFat}%` : '—' },
    { label: 'Chest', val: fp.chest ? `${fp.chest}cm` : '—' },
    { label: 'Waist', val: fp.waist ? `${fp.waist}cm` : '—' },
    { label: 'Hips', val: fp.hips ? `${fp.hips}cm` : '—' },
    { label: 'Shoulders', val: fp.shoulderWidth ? `${fp.shoulderWidth}cm` : '—' },
    { label: 'Level', val: fp.level || '—' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a' }}>
      <Sidebar onNewPost={() => setShowModal(true)} />
      <main style={{ marginLeft: 220, flex: 1, maxWidth: 900, padding: '0 0 48px' }}>
        <div style={{
          height: 180, background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
          borderBottom: '1px solid #1a1a1a', position: 'relative',
          display: 'flex', alignItems: 'flex-end', padding: '0 36px 0',
        }}>
          <div style={{
            width: 96, height: 96,
            borderRadius: '50%', border: '4px solid #111',
            background: 'linear-gradient(135deg, #c9a84c, #888)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, fontWeight: 800, color: '#0a0a0a', fontFamily: 'Syne',
            position: 'absolute', bottom: -48, left: 36,
          }}>
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>

        <div style={{ padding: '60px 36px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <h2 style={{ fontFamily: 'Syne', fontSize: 22, fontWeight: 800 }}>{user?.name || 'User'}</h2>
              </div>
              <p style={{ color: '#555', fontSize: 14, marginBottom: 8 }}>@{username}</p>
              <p style={{ color: '#777', fontSize: 14, lineHeight: 1.6, maxWidth: 400 }}>
                {user?.bio || 'Fitness enthusiast on Velora. Building my best physique every day.'}
              </p>
            </div>
            {isOwn && (
              <button className="btn-outline" style={{ padding: '9px 22px', fontSize: 13 }}>Edit Profile</button>
            )}
          </div>

          <div style={{ display: 'flex', gap: 32, marginBottom: 28, paddingBottom: 20, borderBottom: '1px solid #1a1a1a' }}>
            {[
              { label: 'Posts', val: posts.length },
              { label: 'Followers', val: 0 },
              { label: 'Following', val: 0 },
            ].map(s => (
              <div key={s.label}>
                <span style={{ fontFamily: 'Syne', fontSize: 20, fontWeight: 800 }}>{s.val}</span>
                <span style={{ color: '#555', fontSize: 13, marginLeft: 6 }}>{s.label}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 4, marginBottom: 28, borderBottom: '1px solid #1a1a1a' }}>
            {['posts', 'body stats', 'goals'].map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{
                padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer',
                color: activeTab === t ? '#c9a84c' : '#555',
                borderBottom: `2px solid ${activeTab === t ? '#c9a84c' : 'transparent'}`,
                fontFamily: 'Syne', fontSize: 13, fontWeight: 600, textTransform: 'capitalize',
                transition: 'all 0.2s', marginBottom: -1,
              }}>{t}</button>
            ))}
          </div>

          {activeTab === 'posts' && (
            posts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📷</div>
                <p style={{ color: '#555', fontSize: 14 }}>No posts yet.</p>
                <button className="btn-gold" style={{ marginTop: 16, fontSize: 13, padding: '10px 24px' }} onClick={() => setShowModal(true)}>
                  Create First Post
                </button>
              </div>
            ) : (
              posts.map(p => <PostCard key={p.id} post={p} />)
            )
          )}

          {activeTab === 'body stats' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
                {BODY_STATS.map(s => (
                  <div key={s.label} style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 10, padding: '14px 16px' }}>
                    <div style={{ fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>{s.label}</div>
                    <div style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 700, color: s.val === '—' ? '#333' : '#f5f5f5' }}>{s.val}</div>
                  </div>
                ))}
              </div>
              {fp.goals?.length > 0 && (
                <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, padding: '16px 20px' }}>
                  <div style={{ fontSize: 12, color: '#555', marginBottom: 10 }}>GOALS</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {fp.goals.map(g => (
                      <span key={g} style={{
                        background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.2)',
                        color: '#c9a84c', fontSize: 12, padding: '4px 12px', borderRadius: 20,
                      }}>{g}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'goals' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Primary Goal', val: fp.goals?.join(', ') || 'Not set' },
                { label: 'Fitness Level', val: fp.level || 'Not set' },
                { label: 'Target Areas', val: fp.targetArea?.join(', ') || 'Not set' },
                { label: 'Workout Style', val: fp.workoutType || 'Not set' },
                { label: 'Motivation', val: fp.motivation?.join(', ') || 'Not set' },
                { label: 'Target Weight', val: fp.targetWeight ? `${fp.targetWeight}kg` : 'Not set' },
              ].map(i => (
                <div key={i.label} style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 10, padding: '14px 18px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, color: '#666' }}>{i.label}</span>
                  <span style={{ fontSize: 13, color: '#e0e0e0', fontFamily: 'DM Sans', textAlign: 'right', maxWidth: '60%' }}>{i.val}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      {showModal && <NewPostModal onClose={() => setShowModal(false)} onPost={handlePost} />}
    </div>
  )
}