import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { DEMO_ACCOUNTS } from '../context/AuthContext'
import VeloraLogo from '../components/VeloraLogo'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginWithCredentials, loginDirect } = useAuth()
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    const result = loginWithCredentials(email, password)
    if (result.success) {
      const u = result.user
      if (u.role === 'admin') {
        nav('/admin')
      } else if (!u.onboardingDone) {
        nav('/onboarding')
      } else {
        nav('/home')
      }
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  const handleDemoUser = () => {
    const u = { ...DEMO_ACCOUNTS.user, onboardingDone: false }
    loginDirect(u)
    nav('/onboarding')
  }

  const handleDemoAdmin = () => {
    loginDirect(DEMO_ACCOUNTS.admin)
    nav('/admin')
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#080808',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      position: 'relative', overflow: 'hidden',
    }}>
      <style>{`@keyframes glow { 0%,100%{opacity:0.4} 50%{opacity:0.8} }`}</style>

      <div style={{
        position: 'absolute', top: '40%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
        animation: 'glow 5s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%', maxWidth: 420,
        background: '#0c0c0c',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 20, padding: 40,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
        }} />

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <VeloraLogo size={40} textSize={18} />
        </div>

        <h2 style={{
          fontFamily: 'Syne', fontSize: 24, fontWeight: 800,
          color: '#EAEAEA', marginBottom: 6, textAlign: 'center',
        }}>Welcome back</h2>
        <p style={{
          color: 'rgba(234,234,234,0.4)', fontSize: 14,
          textAlign: 'center', marginBottom: 32,
        }}>Sign in to continue your fitness journey</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              padding: '14px 16px',
              background: '#111', border: '1px solid #1e1e1e',
              borderRadius: 10, color: '#EAEAEA', fontSize: 14,
              fontFamily: 'DM Sans', outline: 'none', width: '100%',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.4)'}
            onBlur={e => e.target.style.borderColor = '#1e1e1e'}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              padding: '14px 16px',
              background: '#111', border: '1px solid #1e1e1e',
              borderRadius: 10, color: '#EAEAEA', fontSize: 14,
              fontFamily: 'DM Sans', outline: 'none', width: '100%',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.4)'}
            onBlur={e => e.target.style.borderColor = '#1e1e1e'}
          />

          {error && (
            <p style={{
              color: '#e05252', fontSize: 13,
              textAlign: 'center', fontFamily: 'DM Sans',
              background: 'rgba(224,82,82,0.08)',
              border: '1px solid rgba(224,82,82,0.2)',
              borderRadius: 8, padding: '8px 12px',
            }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '14px',
              background: loading ? '#7a6530' : '#c9a84c',
              border: 'none', borderRadius: 10,
              color: '#080808', fontWeight: 700, fontSize: 15,
              fontFamily: 'Syne', cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s', marginTop: 4,
              boxShadow: '0 4px 16px rgba(201,168,76,0.2)',
            }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#e8c46a'; e.currentTarget.style.transform = 'scale(1.01)' } }}
            onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = '#c9a84c'; e.currentTarget.style.transform = 'scale(1)' } }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: 28, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}>
          <p style={{
            color: 'rgba(234,234,234,0.3)', fontSize: 12,
            textAlign: 'center', marginBottom: 14, fontFamily: 'DM Sans',
          }}>Demo Accounts</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={handleDemoUser}
              style={{
                flex: 1, padding: '12px',
                background: 'transparent',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: 10, color: '#c9a84c',
                fontSize: 13, fontWeight: 600, fontFamily: 'Syne',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.borderColor = '#c9a84c' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)' }}
            >Demo User</button>
            <button
              onClick={handleDemoAdmin}
              style={{
                flex: 1, padding: '12px',
                background: '#c9a84c', border: 'none',
                borderRadius: 10, color: '#080808',
                fontSize: 13, fontWeight: 700, fontFamily: 'Syne',
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: '0 4px 14px rgba(201,168,76,0.2)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e8c46a'; e.currentTarget.style.transform = 'scale(1.01)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#c9a84c'; e.currentTarget.style.transform = 'scale(1)' }}
            >Demo Admin</button>
          </div>
        </div>

        <p style={{
          textAlign: 'center', marginTop: 24,
          color: 'rgba(234,234,234,0.3)', fontSize: 13, fontFamily: 'DM Sans',
        }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#c9a84c', fontWeight: 600 }}>Sign up</Link>
        </p>
      </div>
    </div>
  )
}