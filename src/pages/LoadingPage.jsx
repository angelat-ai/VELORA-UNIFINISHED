import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const MESSAGES = [
  'Connecting to Velora...',
  'Loading your profile...',
  'Fetching fitness data...',
  'Almost there...',
]

export default function LoadingPage() {
  const [progress, setProgress] = useState(0)
  const [msgIdx, setMsgIdx] = useState(0)
  const { user } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()

  const dest = loc.state?.dest || (user?.onboardingDone ? '/home' : '/onboarding')

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        const inc = p < 60 ? 2.5 : p < 85 ? 1.5 : 0.8
        return Math.min(p + inc, 100)
      })
    }, 40)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 20 && msgIdx < 1) setMsgIdx(1)
    else if (progress >= 50 && msgIdx < 2) setMsgIdx(2)
    else if (progress >= 80 && msgIdx < 3) setMsgIdx(3)
  }, [progress, msgIdx])

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => nav(dest), 500)
      return () => clearTimeout(t)
    }
  }, [progress, nav, dest])

  const r = 44
  const circ = 2 * Math.PI * r
  const offset = circ - (progress / 100) * circ

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0a',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes fadeMsg { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseRing { 0%,100%{ opacity:0.2; transform:scale(1); } 50%{ opacity:0.5; transform:scale(1.08); } }
        @keyframes slowSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        animation: 'pulseRing 3s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Outer spin ring */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 160, height: 160,
        border: '1px solid rgba(201,168,76,0.08)',
        borderRadius: '50%',
        animation: 'slowSpin 8s linear infinite',
        pointerEvents: 'none',
      }} />

      {/* SVG circular progress */}
      <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 36 }}>
        <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle cx="60" cy="60" r={r} fill="none" stroke="#1a1a1a" strokeWidth="3" />
          {/* Progress */}
          <circle
            cx="60" cy="60" r={r} fill="none"
            stroke="#c9a84c" strokeWidth="3"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.1s linear', filter: 'drop-shadow(0 0 6px rgba(201,168,76,0.5))' }}
          />
        </svg>

        {/* Center logo */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="46" stroke="#c9a84c" strokeWidth="4" fill="none" opacity="0.3" />
            <path d="M22 32 L50 70 L78 32" stroke="#c9a84c" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M22 32 L30 32" stroke="#c9a84c" strokeWidth="3" strokeLinecap="round" />
            <path d="M78 32 L70 32" stroke="#c9a84c" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Brand */}
      <h2 style={{
        fontFamily: 'Syne', fontSize: 24, fontWeight: 800, letterSpacing: '4px',
        background: 'linear-gradient(135deg, #c9a84c, #e8c46a, #c9a84c)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        marginBottom: 10,
      }}>VELORA</h2>

      {/* Message */}
      <p key={msgIdx} style={{
        color: '#444', fontSize: 13, fontFamily: 'DM Sans',
        animation: 'fadeMsg 0.4s ease', marginBottom: 32,
      }}>
        {MESSAGES[msgIdx]}
      </p>

      {/* Linear bar */}
      <div style={{ width: 200 }}>
        <div style={{ height: 2, background: '#1a1a1a', borderRadius: 1, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${progress}%`,
            background: 'linear-gradient(90deg, #c9a84c, #e8c46a)',
            borderRadius: 1, transition: 'width 0.08s linear',
            boxShadow: '0 0 8px rgba(201,168,76,0.4)',
          }} />
        </div>
        <p style={{
          textAlign: 'right', marginTop: 8,
          color: '#c9a84c', fontFamily: 'Syne', fontSize: 12, fontWeight: 700,
        }}>
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  )
}