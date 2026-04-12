import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import VeloraLogo from '../components/VeloraLogo'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const nav = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const result = login(email, password)
    if (result.success) {
      if (result.user.role === 'admin') {
        nav('/admin')
      } else if (!result.user.onboardingDone) {
        nav('/onboarding')
      } else {
        nav('/home')
      }
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  const fillDemo = (type) => {
    if (type === 'admin') {
      setEmail('admin@velora.com')
      setPassword('admin123')
    } else {
      setEmail('demo@velora.com')
      setPassword('demo123')
    }
    setError('')
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0a',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 24, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ marginBottom: 40 }}>
        <VeloraLogo size={44} textSize={22} />
      </div>

      <div style={{
        width: '100%', maxWidth: 420,
        background: '#111',
        border: '1px solid #2a2a2a',
        borderRadius: 16,
        padding: '40px 36px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: 80, height: 80,
          background: 'radial-gradient(circle at top left, rgba(201,168,76,0.25), transparent)',
          borderRadius: '16px 0 0 0',
          pointerEvents: 'none',
        }} />

        <h2 style={{ fontFamily: 'Syne', fontSize: 28, fontWeight: 700, marginBottom: 6 }}>WELCOME</h2>
        <p style={{ color: '#666', fontSize: 14, marginBottom: 32 }}>Sign in to your account</p>

        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          <button onClick={() => fillDemo('admin')} style={{
            flex: 1, padding: '9px 12px', borderRadius: 8,
            background: '#1a1a1a', border: '1px solid #2a2a2a',
            color: '#888', fontSize: 12, fontFamily: 'DM Sans',
            transition: 'all 0.2s', cursor: 'pointer',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#c9a84c' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#888' }}
          >
            Demo Admin
          </button>
          <button onClick={() => fillDemo('user')} style={{
            flex: 1, padding: '9px 12px', borderRadius: 8,
            background: '#1a1a1a', border: '1px solid #2a2a2a',
            color: '#888', fontSize: 12, fontFamily: 'DM Sans',
            transition: 'all 0.2s', cursor: 'pointer',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#c9a84c' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#888' }}
          >
            Demo User
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: '#222' }} />
          <span style={{ color: '#444', fontSize: 12 }}>or sign in manually</span>
          <div style={{ flex: 1, height: 1, background: '#222' }} />
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ background: '#0d0d0d', border: '1px solid #2a2a2a' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ background: '#0d0d0d', border: '1px solid #2a2a2a' }}
          />

          {error && (
            <p style={{ color: '#e05252', fontSize: 13, textAlign: 'center' }}>{error}</p>
          )}

          <button type="submit" className="btn-gold" disabled={loading} style={{
            width: '100%', padding: '13px', fontSize: 15, marginTop: 8,
            opacity: loading ? 0.7 : 1, justifyContent: 'center',
          }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, color: '#555', fontSize: 14 }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#c9a84c', fontWeight: 600 }}>Sign Up</Link>
        </p>
      </div>

      <p style={{ marginTop: 32, color: '#333', fontSize: 12 }}>
        © 2025 Velora Inc. All Rights Reserved.
      </p>
    </div>
  )
}