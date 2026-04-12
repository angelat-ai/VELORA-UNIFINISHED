import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import VeloraLogo from '../components/VeloraLogo'

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { updateUser } = useAuth()
  const nav = useNavigate()

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    updateUser({
      id: 'user_new',
      name: form.name,
      email: form.email,
      role: 'user',
      username: form.name.toLowerCase().replace(/\s+/g, '_'),
      onboardingDone: false,
      followers: 0, following: 0, posts: 0,
    })
    nav('/loading')
    setLoading(false)
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

      <div style={{ marginBottom: 36 }}>
        <VeloraLogo size={40} textSize={20} />
      </div>

      <div style={{
        width: '100%', maxWidth: 420,
        background: '#111', border: '1px solid #2a2a2a',
        borderRadius: 16, padding: '40px 36px', position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: 80, height: 80,
          background: 'radial-gradient(circle at top left, rgba(201,168,76,0.25), transparent)',
          borderRadius: '16px 0 0 0', pointerEvents: 'none',
        }} />

        <h2 style={{ fontFamily: 'Syne', fontSize: 26, fontWeight: 700, marginBottom: 6 }}>CREATE ACCOUNT</h2>
        <p style={{ color: '#666', fontSize: 14, marginBottom: 28 }}>Join the Velora community</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input
            placeholder="Full name"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            required
            style={{ background: '#0d0d0d', border: '1px solid #2a2a2a' }}
          />
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={e => set('email', e.target.value)}
            required
            style={{ background: '#0d0d0d', border: '1px solid #2a2a2a' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => set('password', e.target.value)}
            required
            style={{ background: '#0d0d0d', border: '1px solid #2a2a2a' }}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={form.confirm}
            onChange={e => set('confirm', e.target.value)}
            required
            style={{ background: '#0d0d0d', border: '1px solid #2a2a2a' }}
          />

          {error && <p style={{ color: '#e05252', fontSize: 13, textAlign: 'center' }}>{error}</p>}

          <button type="submit" className="btn-gold" disabled={loading} style={{
            width: '100%', padding: '13px', fontSize: 15, marginTop: 8,
            opacity: loading ? 0.7 : 1, justifyContent: 'center',
          }}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, color: '#555', fontSize: 14 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#c9a84c', fontWeight: 600 }}>Log In</Link>
        </p>
      </div>
    </div>
  )
}