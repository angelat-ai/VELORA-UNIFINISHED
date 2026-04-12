import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function NewPostModal({ onClose, onPost }) {
  const [caption, setCaption] = useState('')
  const [type, setType] = useState('post')
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!caption.trim()) return
    
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    
    onPost({
      caption,
      type,
      media: null,
      likes: 0,
      comments: 0,
      shares: 0,
    })
    
    setLoading(false)
    onClose()
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 20,
    }} onClick={onClose}>
      <div style={{
        width: '100%',
        maxWidth: 520,
        background: '#111',
        border: '1px solid #2a2a2a',
        borderRadius: 16,
        padding: 0,
        position: 'relative',
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          padding: '18px 22px',
          borderBottom: '1px solid #1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <h3 style={{
            fontFamily: 'Syne',
            fontSize: 18,
            fontWeight: 700,
            margin: 0,
          }}>Create New Post</h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#666',
              fontSize: 22,
              cursor: 'pointer',
              padding: 0,
              width: 30,
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        {/* User Info */}
        <div style={{
          padding: '16px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #c9a84c, #888)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 700,
            color: '#0a0a0a',
            fontFamily: 'Syne',
          }}>
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <div style={{
              fontFamily: 'Syne',
              fontSize: 14,
              fontWeight: 700,
              color: '#f5f5f5',
            }}>
              {user?.name || 'User'}
            </div>
            <div style={{ fontSize: 12, color: '#555' }}>
              @{user?.username || 'user'}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ padding: '0 22px 16px' }}>
            <textarea
              placeholder="What's on your mind?"
              value={caption}
              onChange={e => setCaption(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                background: '#0d0d0d',
                border: '1px solid #2a2a2a',
                borderRadius: 10,
                padding: '14px 16px',
                fontSize: 14,
                color: '#f5f5f5',
                resize: 'none',
                fontFamily: 'DM Sans',
              }}
              autoFocus
            />
          </div>

          {/* Post Type */}
          <div style={{
            padding: '12px 22px',
            borderTop: '1px solid #1a1a1a',
            borderBottom: '1px solid #1a1a1a',
          }}>
            <div style={{ display: 'flex', gap: 20 }}>
              {[
                { id: 'post', label: '📝 Post', icon: '📝' },
                { id: 'progress', label: '📊 Progress', icon: '📊' },
                { id: 'workout', label: '🏋️ Workout', icon: '🏋️' },
              ].map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  style={{
                    background: type === t.id ? 'rgba(201,168,76,0.15)' : 'transparent',
                    border: `1px solid ${type === t.id ? '#c9a84c' : '#2a2a2a'}`,
                    borderRadius: 20,
                    padding: '8px 16px',
                    fontSize: 13,
                    fontFamily: 'DM Sans',
                    color: type === t.id ? '#c9a84c' : '#888',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Media Upload (Placeholder) */}
          <div style={{
            padding: '16px 22px',
            borderBottom: '1px solid #1a1a1a',
          }}>
            <button
              type="button"
              style={{
                width: '100%',
                padding: '40px',
                background: '#0d0d0d',
                border: '1px dashed #2a2a2a',
                borderRadius: 10,
                color: '#666',
                fontSize: 14,
                fontFamily: 'DM Sans',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 28 }}>📸</span>
              <span>Add Photos or Videos</span>
              <span style={{ fontSize: 11, color: '#444' }}>Coming soon</span>
            </button>
          </div>

          {/* Actions */}
          <div style={{
            padding: '16px 22px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 12,
          }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
              style={{ padding: '10px 20px', fontSize: 13 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-gold"
              disabled={loading || !caption.trim()}
              style={{
                padding: '10px 28px',
                fontSize: 13,
                opacity: (!caption.trim() || loading) ? 0.5 : 1,
              }}
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}