import { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import NewPostModal from '../components/NewPostModal'
import PostCard from '../components/PostCard'
import { useAuth } from '../context/AuthContext'

const IconCamera = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
)
const IconImage = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
  </svg>
)
const IconFolder = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
)
const IconLink = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
)
const IconX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const IconCheck = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

function ImageUploadField({ label, hint, currentSrc, onSave, isCircle }) {
  const [urlInput, setUrlInput] = useState('')
  const [preview, setPreview] = useState(currentSrc || null)
  const [saved, setSaved] = useState(!!currentSrc)
  const [urlMode, setUrlMode] = useState(false)
  const fileRef = useRef()

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    setSaved(false)
    setUrlMode(false)
  }

  const handleUrl = () => {
    if (!urlInput.trim()) return
    setPreview(urlInput.trim())
    setSaved(false)
    setUrlMode(false)
  }

  const handleSave = () => {
    if (preview) { onSave(preview); setSaved(true) }
  }

  const handleCancel = () => {
    setPreview(currentSrc || null)
    setUrlInput('')
    setSaved(!!currentSrc)
    setUrlMode(false)
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <p style={{ fontSize: 12, color: '#888', fontFamily: 'DM Sans', marginBottom: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8 }}>
        {label}
      </p>
      <p style={{ fontSize: 12, color: '#3a3a3a', marginBottom: 12, fontFamily: 'DM Sans' }}>{hint}</p>

      {/* Preview */}
      <div style={{ marginBottom: 14 }}>
        {preview ? (
          isCircle ? (
            <div style={{
              width: 80, height: 80, borderRadius: '50%', overflow: 'hidden',
              border: '2px solid rgba(201,168,76,0.3)',
              background: '#0d0d0d',
            }}>
              <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <div style={{ width: '100%', height: 100, borderRadius: 10, overflow: 'hidden', border: '1px solid #2a2a2a', background: '#0d0d0d' }}>
              <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )
        ) : (
          <div style={{
            width: isCircle ? 80 : '100%',
            height: isCircle ? 80 : 100,
            borderRadius: isCircle ? '50%' : 10,
            background: '#111', border: '1px dashed #2a2a2a',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <span style={{ color: '#2a2a2a' }}><IconImage /></span>
            <span style={{ fontSize: 11, color: '#2a2a2a' }}>No image</span>
          </div>
        )}
      </div>

      {/* URL input toggle */}
      {urlMode ? (
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <input
            placeholder="Paste image URL..."
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleUrl()}
            style={{ flex: 1, padding: '9px 12px', background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: 8, fontSize: 13, color: '#d0d0d0', fontFamily: 'DM Sans' }}
            autoFocus
          />
          <button onClick={handleUrl} style={{ background: '#c9a84c', border: 'none', color: '#0a0a0a', padding: '9px 14px', borderRadius: 8, cursor: 'pointer', fontFamily: 'Syne', fontWeight: 700, fontSize: 12 }}>
            Apply
          </button>
          <button onClick={() => setUrlMode(false)} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#666', padding: '9px 10px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <IconX />
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <button onClick={() => fileRef.current?.click()} style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: '#161616', border: '1px solid #2a2a2a', color: '#888',
            padding: '9px 14px', borderRadius: 8, cursor: 'pointer', fontFamily: 'DM Sans', fontSize: 12,
            transition: 'all 0.18s', flex: 1,
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.color = '#c9a84c' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#888' }}
          >
            <IconFolder /> Open Folder
          </button>
          <button onClick={() => setUrlMode(true)} style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: '#161616', border: '1px solid #2a2a2a', color: '#888',
            padding: '9px 14px', borderRadius: 8, cursor: 'pointer', fontFamily: 'DM Sans', fontSize: 12,
            transition: 'all 0.18s', flex: 1,
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.color = '#c9a84c' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#888' }}
          >
            <IconLink /> Paste URL
          </button>
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />

      {/* Save / Cancel for this photo */}
      {preview && !saved && (
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={handleSave} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: '#c9a84c', border: 'none', color: '#0a0a0a',
            padding: '8px 16px', borderRadius: 7, cursor: 'pointer',
            fontFamily: 'Syne', fontWeight: 700, fontSize: 12,
            transition: 'background 0.18s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#e8c46a'}
            onMouseLeave={e => e.currentTarget.style.background = '#c9a84c'}
          >
            <IconCheck /> Save Photo
          </button>
          <button onClick={handleCancel} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'transparent', border: '1px solid #2a2a2a', color: '#555',
            padding: '8px 14px', borderRadius: 7, cursor: 'pointer',
            fontFamily: 'DM Sans', fontSize: 12, transition: 'all 0.18s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#444'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2a2a'}
          >
            <IconX /> Cancel
          </button>
        </div>
      )}
      {saved && (
        <p style={{ fontSize: 11, color: '#52a07a', fontFamily: 'DM Sans', display: 'flex', alignItems: 'center', gap: 5 }}>
          <IconCheck /> Photo saved
        </p>
      )}
    </div>
  )
}

function EditProfileModal({ user, onClose, onSave }) {
  const [bio, setBio] = useState(user?.bio || '')
  const [name, setName] = useState(user?.name || '')
  const [coverSrc, setCoverSrc] = useState(user?.coverPhoto || null)
  const [avatarSrc, setAvatarSrc] = useState(user?.avatarPhoto || null)

  const handleSave = () => {
    onSave({ bio, name, coverPhoto: coverSrc, avatarPhoto: avatarSrc })
    onClose()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }} onClick={onClose}>
      <div style={{
        background: '#0f0f0f', border: '1px solid #2a2a2a',
        borderRadius: 16, width: '100%', maxWidth: 520,
        maxHeight: '90vh', overflowY: 'auto',
        position: 'relative',
      }} onClick={e => e.stopPropagation()}>
        {/* Top gold line */}
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)', borderRadius: '16px 16px 0 0' }} />

        {/* Header */}
        <div style={{ padding: '20px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1a1a1a' }}>
          <div>
            <h3 style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 700, marginBottom: 2 }}>Edit Profile</h3>
            <p style={{ fontSize: 12, color: '#3a3a3a', fontFamily: 'DM Sans' }}>Update your info, photos and bio</p>
          </div>
          <button onClick={onClose} style={{ background: '#161616', border: '1px solid #2a2a2a', color: '#666', width: 32, height: 32, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.18s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.style.color = '#aaa' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#666' }}
          ><IconX /></button>
        </div>

        <div style={{ padding: '24px' }}>
          {/* Cover Photo */}
          <ImageUploadField
            label="Cover Photo"
            hint="Recommended: 1200×300px. This appears as your profile banner."
            currentSrc={coverSrc}
            onSave={setCoverSrc}
            isCircle={false}
          />

          <div style={{ height: 1, background: '#1a1a1a', margin: '4px 0 24px' }} />

          {/* Profile Photo */}
          <ImageUploadField
            label="Profile Photo"
            hint="Recommended: 400×400px. Displayed as your circular avatar."
            currentSrc={avatarSrc}
            onSave={setAvatarSrc}
            isCircle={true}
          />

          <div style={{ height: 1, background: '#1a1a1a', margin: '4px 0 24px' }} />

          {/* Name */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 12, color: '#888', fontFamily: 'DM Sans', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', marginBottom: 8 }}>
              Display Name
            </label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              style={{ background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: 9, padding: '11px 14px', fontSize: 14, color: '#d0d0d0', fontFamily: 'DM Sans' }}
            />
          </div>

          {/* Bio */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: 12, color: '#888', fontFamily: 'DM Sans', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', marginBottom: 8 }}>
              Bio
            </label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Tell the community about yourself — your goals, training style, achievements..."
              rows={4}
              maxLength={200}
              style={{
                background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: 9,
                padding: '11px 14px', fontSize: 14, color: '#d0d0d0',
                fontFamily: 'DM Sans', resize: 'vertical', lineHeight: 1.6,
              }}
            />
            <p style={{ fontSize: 11, color: '#2a2a2a', textAlign: 'right', marginTop: 4, fontFamily: 'DM Sans' }}>
              {bio.length}/200
            </p>
          </div>

          {/* Footer actions */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 16, borderTop: '1px solid #1a1a1a' }}>
            <button onClick={onClose} style={{
              background: 'transparent', border: '1px solid #2a2a2a', color: '#555',
              fontFamily: 'DM Sans', fontSize: 13, padding: '10px 22px', borderRadius: 9,
              cursor: 'pointer', transition: 'all 0.18s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.style.color = '#888' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#555' }}
            >Cancel</button>
            <button onClick={handleSave} style={{
              background: '#c9a84c', border: 'none', color: '#0a0a0a',
              fontFamily: 'Syne', fontWeight: 700, fontSize: 13,
              padding: '10px 28px', borderRadius: 9, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 7, transition: 'background 0.18s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#e8c46a'}
              onMouseLeave={e => e.currentTarget.style.background = '#c9a84c'}
            >
              <IconCheck /> Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const { username } = useParams()
  const { user, updateUser } = useAuth()
  const isOwn = user?.username === username
  const [posts, setPosts] = useState([])
  const [showPostModal, setShowPostModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [tab, setTab] = useState('posts')
  const fp = user?.fitnessProfile || {}

  const handlePost = (postData) => {
    setPosts(prev => [{ id: Date.now(), author: user?.name || 'You', handle: user?.username || 'me', verified: false, timestamp: new Date(), ...postData }, ...prev])
  }

  const handleSaveProfile = (data) => {
    updateUser({ ...data })
  }

  const BODY = [
    { label: 'Height', val: fp.height ? `${fp.height}cm` : '—' },
    { label: 'Weight', val: fp.weight ? `${fp.weight}kg` : '—' },
    { label: 'Body Fat', val: fp.bodyFat ? `${fp.bodyFat}%` : '—' },
    { label: 'Chest', val: fp.chest ? `${fp.chest}cm` : '—' },
    { label: 'Waist', val: fp.waist ? `${fp.waist}cm` : '—' },
    { label: 'Hips', val: fp.hips ? `${fp.hips}cm` : '—' },
    { label: 'Shoulders', val: fp.shoulderWidth ? `${fp.shoulderWidth}cm` : '—' },
    { label: 'Level', val: fp.level || '—' },
  ]

  const coverBg = user?.coverPhoto
    ? `url(${user.coverPhoto}) center/cover no-repeat`
    : 'linear-gradient(135deg, #161616 0%, #0a0a0a 100%)'

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#0a0a0a', overflow: 'hidden' }}>
      <Sidebar onNewPost={() => setShowPostModal(true)} />

      <main style={{ marginLeft: 220, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Cover Banner */}
        <div style={{
          height: 160, flexShrink: 0,
          background: coverBg,
          borderBottom: '1px solid #1e1e1e',
          position: 'relative',
        }}>
          {/* subtle overlay always on top of cover */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.7))', pointerEvents: 'none' }} />
          {!user?.coverPhoto && (
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.05), transparent)', pointerEvents: 'none' }} />
          )}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.12), transparent)', pointerEvents: 'none' }} />

          {/* Cover photo camera hint for own profile */}
          {isOwn && (
            <button onClick={() => setShowEditModal(true)} style={{
              position: 'absolute', bottom: 12, right: 16,
              background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#aaa', padding: '7px 12px', borderRadius: 8, cursor: 'pointer',
              fontFamily: 'DM Sans', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6,
              backdropFilter: 'blur(6px)', transition: 'all 0.18s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.85)'; e.currentTarget.style.color = '#c9a84c' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.65)'; e.currentTarget.style.color = '#aaa' }}
            >
              <IconCamera /> Change Cover
            </button>
          )}
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ padding: '0 32px 40px' }}>
            {/* Avatar row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 18, marginTop: -48 }}>
              {/* Avatar */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: 96, height: 96, borderRadius: '50%',
                  border: '4px solid #0a0a0a',
                  background: user?.avatarPhoto ? `url(${user.avatarPhoto}) center/cover no-repeat` : 'linear-gradient(135deg, #c9a84c 0%, #7a6530 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 34, fontWeight: 800, color: '#0a0a0a', fontFamily: 'Syne',
                  overflow: 'hidden',
                }}>
                  {!user?.avatarPhoto && (user?.name?.[0]?.toUpperCase() || 'U')}
                </div>
                {/* Camera button on avatar */}
                {isOwn && (
                  <button onClick={() => setShowEditModal(true)} style={{
                    position: 'absolute', bottom: 2, right: 2,
                    width: 28, height: 28, borderRadius: '50%',
                    background: '#c9a84c', border: '2px solid #0a0a0a',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#0a0a0a', transition: 'background 0.18s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = '#e8c46a'}
                    onMouseLeave={e => e.currentTarget.style.background = '#c9a84c'}
                  ><IconCamera /></button>
                )}
              </div>

              {/* Edit Profile button */}
              {isOwn && (
                <button onClick={() => setShowEditModal(true)} style={{
                  background: 'transparent', color: '#c9a84c',
                  fontFamily: 'Syne', fontWeight: 600, fontSize: 13,
                  padding: '9px 22px', borderRadius: 9,
                  border: '1px solid rgba(201,168,76,0.35)',
                  cursor: 'pointer', transition: 'all 0.18s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.borderColor = '#c9a84c' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)' }}
                >Edit Profile</button>
              )}
            </div>

            {/* Name / handle / bio */}
            <h2 style={{ fontFamily: 'Syne', fontSize: 21, fontWeight: 800, marginBottom: 3 }}>
              {user?.name || 'User'}
            </h2>
            <p style={{ color: '#3a3a3a', fontSize: 13, marginBottom: 10, fontFamily: 'DM Sans' }}>@{username}</p>
            <p style={{ color: '#666', fontSize: 13, lineHeight: 1.7, marginBottom: 22, maxWidth: 460, fontFamily: 'DM Sans' }}>
              {user?.bio || 'Fitness enthusiast. Gym rat. Building my best physique.'}
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 28, marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid #1a1a1a' }}>
              {[{ label: 'Posts', val: posts.length }, { label: 'Followers', val: 0 }, { label: 'Following', val: 0 }].map(s => (
                <div key={s.label}>
                  <span style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 800, color: s.val > 0 ? '#c9a84c' : '#d0d0d0' }}>{s.val}</span>
                  <span style={{ color: '#3a3a3a', fontSize: 13, marginLeft: 6 }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 2, marginBottom: 24, borderBottom: '1px solid #1a1a1a' }}>
              {['posts', 'body stats', 'goals'].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding: '9px 18px', background: 'none', border: 'none', cursor: 'pointer',
                  color: tab === t ? '#c9a84c' : '#3a3a3a',
                  borderBottom: `2px solid ${tab === t ? '#c9a84c' : 'transparent'}`,
                  fontFamily: 'Syne', fontSize: 11, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: 1,
                  transition: 'all 0.18s', marginBottom: -1,
                }}>{t}</button>
              ))}
            </div>

            {/* Tab content */}
            {tab === 'posts' && (
              posts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                  <p style={{ color: '#2a2a2a', fontSize: 13, marginBottom: 16 }}>No posts yet.</p>
                  <button onClick={() => setShowPostModal(true)} style={{
                    background: '#c9a84c', color: '#0a0a0a',
                    fontFamily: 'Syne', fontWeight: 700, fontSize: 13,
                    padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    transition: 'background 0.18s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = '#e8c46a'}
                    onMouseLeave={e => e.currentTarget.style.background = '#c9a84c'}
                  >Create First Post</button>
                </div>
              ) : posts.map(p => <PostCard key={p.id} post={p} />)
            )}

            {tab === 'body stats' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, paddingBottom: 24 }}>
                {BODY.map(s => (
                  <div key={s.label} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 10, padding: '14px 16px', transition: 'border-color 0.18s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}
                  >
                    <div style={{ fontSize: 10, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{s.label}</div>
                    <div style={{ fontFamily: 'Syne', fontSize: 20, fontWeight: 800, color: s.val === '—' ? '#1e1e1e' : '#c9a84c' }}>{s.val}</div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'goals' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 24, maxWidth: 560 }}>
                {[
                  { label: 'Primary Goal', val: fp.goals?.join(', ') || 'Not set' },
                  { label: 'Fitness Level', val: fp.level || 'Not set' },
                  { label: 'Focus Areas', val: fp.targetArea?.join(', ') || 'Not set' },
                  { label: 'Workout Style', val: fp.workoutType || 'Not set' },
                  { label: 'Motivation', val: fp.motivation?.join(', ') || 'Not set' },
                  { label: 'Target Weight', val: fp.targetWeight ? `${fp.targetWeight}kg` : 'Not set' },
                ].map(i => (
                  <div key={i.label} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 10, padding: '13px 16px', display: 'flex', justifyContent: 'space-between', gap: 16, transition: 'border-color 0.18s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#2a2a2a'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}
                  >
                    <span style={{ fontSize: 13, color: '#3a3a3a', flexShrink: 0, fontFamily: 'DM Sans' }}>{i.label}</span>
                    <span style={{ fontSize: 13, color: i.val === 'Not set' ? '#1e1e1e' : '#d0d0d0', textAlign: 'right', fontFamily: 'DM Sans' }}>{i.val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {showPostModal && <NewPostModal onClose={() => setShowPostModal(false)} onPost={handlePost} />}
      {showEditModal && <EditProfileModal user={user} onClose={() => setShowEditModal(false)} onSave={handleSaveProfile} />}
    </div>
  )
}