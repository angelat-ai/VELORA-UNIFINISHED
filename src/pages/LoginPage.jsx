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
    await new Promise(r => setTimeout(r, 500))
    const result = login(email, password)
    if (result.success) {
      const dest = result.user.role === 'admin'
        ? '/admin'
        : result.user.onboardingDone ? '/home' : '/onboarding'
      nav('/loading', { state: { dest } })
    } else {
      setError(result.error)
      setLoading(false)
    }
  }

  const fillDemo = (type) => {
    if (type === 'admin') { setEmail('admin@velora.com'); setPassword('admin123') }
    else { setEmail('demo@velora.com'); setPassword('demo123') }
    setError('')
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0a',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 24, position: 'relative', overflow: 'hidden',
    }}>
      <style>{`@keyframes glow { 0%,100%{opacity:0.5} 50%{opacity:1} }`}</style>

      <div style={{
        position: 'absolute', top: '35%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 480, height: 480,
        background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        animation: 'glow 4s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      <div style={{ marginBottom: 36 }}>
        <VeloraLogo size={42} textSize={20} />
      </div>

      <div style={{
        width: '100%', maxWidth: 400,
        background: '#0f0f0f', border: '1px solid #1e1e1e',
        borderRadius: 16, padding: '36px 32px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: 100, height: 100,
          background: 'radial-gradient(circle at top left, rgba(201,168,76,0.12), transparent)',
          pointerEvents: 'none',
        }} />

        <h2 style={{ fontFamily: 'Syne', fontSize: 26, fontWeight: 800, marginBottom: 4, letterSpacing: '-0.5px' }}>WELCOME</h2>
        <p style={{ color: '#444', fontSize: 13, marginBottom: 28, fontFamily: 'DM Sans' }}>Sign in to your account</p>

        {/* Demo buttons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {['admin', 'user'].map(t => (
            <button key={t} onClick={() => fillDemo(t)} style={{
              flex: 1, padding: '9px', borderRadius: 8,
              background: '#161616', border: '1px solid #1e1e1e',
              color: '#555', fontSize: 12, fontFamily: 'DM Sans', cursor: 'pointer',
              transition: 'all 0.18s', textTransform: 'capitalize',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.color = '#c9a84c' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.color = '#555' }}
            >
              Demo {t === 'admin' ? 'Admin' : 'User'}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
          <div style={{ flex: 1, height: 1, background: '#1a1a1a' }} />
          <span style={{ color: '#2a2a2a', fontSize: 11, fontFamily: 'DM Sans' }}>or continue</span>
          <div style={{ flex: 1, height: 1, background: '#1a1a1a' }} />
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="email" placeholder="Email address"
            value={email} onChange={e => setEmail(e.target.value)} required
            style={{ background: '#080808', border: '1px solid #1e1e1e', padding: '12px 14px', borderRadius: 9, fontSize: 14 }}
          />
          <input
            type="password" placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)} required
            style={{ background: '#080808', border: '1px solid #1e1e1e', padding: '12px 14px', borderRadius: 9, fontSize: 14 }}
          />

          {error && <p style={{ color: '#c05252', fontSize: 12, textAlign: 'center', fontFamily: 'DM Sans' }}>{error}</p>}

          <button type="submit" disabled={loading} style={{
            background: loading ? '#7a6530' : '#c9a84c',
            color: '#0a0a0a', fontFamily: 'Syne', fontWeight: 700, fontSize: 14,
            padding: '13px', borderRadius: 9, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.18s', marginTop: 4, letterSpacing: 0.3,
          }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#e8c46a' }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#c9a84c' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 22, color: '#333', fontSize: 13, fontFamily: 'DM Sans' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#c9a84c', fontWeight: 600 }}>Sign Up</Link>
        </p>
      </div>

      <p style={{ marginTop: 28, color: '#1e1e1e', fontSize: 12 }}>
        © 2025 Velora Inc. All Rights Reserved.
      </p>
    </div>
  )
}