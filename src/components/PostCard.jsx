import { useState } from 'react'

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likes, setLikes] = useState(post.likes || 0)

  const handleLike = () => {
    if (liked) {
      setLikes(l => l - 1)
    } else {
      setLikes(l => l + 1)
    }
    setLiked(!liked)
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Just now'
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp)
    const now = new Date()
    const diff = Math.floor((now - date) / 1000)
    
    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }

  return (
    <div style={{
      background: '#111',
      border: '1px solid #1a1a1a',
      borderRadius: 12,
      marginBottom: 20,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #c9a84c, #888)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 700,
            color: '#0a0a0a',
            fontFamily: 'Syne',
          }}>
            {post.author?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                fontFamily: 'Syne',
                fontSize: 14,
                fontWeight: 700,
                color: '#f5f5f5',
              }}>
                {post.author || 'User'}
              </span>
              {post.verified && (
                <span style={{
                  color: '#c9a84c',
                  fontSize: 12,
                }}>✓</span>
              )}
            </div>
            <div style={{ fontSize: 12, color: '#555' }}>
              @{post.handle || 'user'} · {formatTime(post.timestamp)}
            </div>
          </div>
        </div>
        <button style={{
          background: 'none',
          border: 'none',
          color: '#555',
          fontSize: 18,
          cursor: 'pointer',
          padding: '4px 8px',
        }}>⋯</button>
      </div>

      {/* Content / Caption */}
      {post.caption && (
        <div style={{ padding: '0 16px 12px' }}>
          <p style={{
            fontSize: 14,
            color: '#e0e0e0',
            lineHeight: 1.6,
            margin: 0,
          }}>
            {post.caption}
          </p>
        </div>
      )}

      {/* Media Placeholder */}
      {post.media ? (
        <div style={{
          width: '100%',
          minHeight: 300,
          background: '#0d0d0d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid #1a1a1a',
          borderBottom: '1px solid #1a1a1a',
        }}>
          <img
            src={post.media}
            alt="Post content"
            style={{ width: '100%', maxHeight: 500, objectFit: 'cover' }}
          />
        </div>
      ) : (
        <div style={{
          width: '100%',
          minHeight: 200,
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid #1a1a1a',
          borderBottom: '1px solid #1a1a1a',
          color: '#444',
          fontSize: 13,
        }}>
          {post.type === 'progress' ? '📊 Progress Update' : '🏋️ Workout Post'}
        </div>
      )}

      {/* Stats Row */}
      <div style={{ padding: '12px 16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={handleLike}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <span style={{
                fontSize: 22,
                color: liked ? '#e05252' : '#666',
                transition: 'color 0.2s',
              }}>
                {liked ? '❤️' : '🤍'}
              </span>
              <span style={{
                fontSize: 13,
                color: liked ? '#e05252' : '#666',
                fontFamily: 'DM Sans',
              }}>
                {likes}
              </span>
            </button>
            <button style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
              padding: 0,
            }}>
              <span style={{ fontSize: 20, color: '#666' }}>💬</span>
              <span style={{ fontSize: 13, color: '#666', fontFamily: 'DM Sans' }}>
                {post.comments || 0}
              </span>
            </button>
            <button style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
              padding: 0,
            }}>
              <span style={{ fontSize: 20, color: '#666' }}>🔄</span>
              <span style={{ fontSize: 13, color: '#666', fontFamily: 'DM Sans' }}>
                {post.shares || 0}
              </span>
            </button>
          </div>
          <button
            onClick={() => setSaved(!saved)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <span style={{
              fontSize: 20,
              color: saved ? '#c9a84c' : '#666',
            }}>
              {saved ? '🔖' : '🔖'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}