import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VeloraLogo from '../components/VeloraLogo'

const MESSAGES = [
  'Setting up your profile...',
  'Personalizing your experience...',
  'Loading fitness data...',
  'Almost ready...',
]

export default function LoadingPage() {
  const [progress, setProgress] = useState(0)
  const [msgIdx, setMsgIdx] = useState(0)
  const nav = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + 2
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 25 && msgIdx < 1) setMsgIdx(1)
    else if (progress >= 55 && msgIdx < 2) setMsgIdx(2)
    else if (progress >= 80 && msgIdx < 3) setMsgIdx(3)
  }, [progress])

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => nav('/onboarding'), 400)
      return () => clearTimeout(t)
    }
  }, [progress])

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0a',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        animation: 'pulse 2s ease-in-out infinite',
      }} />

      <style>{`
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes fadein { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div style={{ position: 'relative', marginBottom: 60 }}>
        <div style={{
          position: 'absolute', inset: -20,
          border: '2px solid rgba(201,168,76,0.2)',
          borderRadius: '50%',
          animation: 'spin 3s linear infinite',
        }} />
        <div style={{
          position: 'absolute', inset: -12,
          border: '1px solid rgba(201,168,76,0.1)',
          borderRadius: '50%',
          animation: 'spin 5s linear infinite reverse',
        }} />
        <VeloraLogo size={64} showText={false} />
      </div>

      <h2 style={{
        fontFamily: 'Syne', fontSize: 32, fontWeight: 800, marginBottom: 12,
        background: 'linear-gradient(135deg, #f5f5f5, #c9a84c)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>VELORA</h2>

      <p style={{
        color: '#666', fontSize: 14, marginBottom: 48,
        animation: 'fadein 0.4s ease',
        key: msgIdx,
      }}>
        {MESSAGES[msgIdx]}
      </p>

      <div style={{ width: 280, position: 'relative' }}>
        <div style={{
          height: 3, background: '#1a1a1a', borderRadius: 2, overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', width: `${progress}%`,
            background: 'linear-gradient(90deg, #c9a84c, #e8c46a)',
            borderRadius: 2, transition: 'width 0.05s linear',
            boxShadow: '0 0 8px rgba(201,168,76,0.5)',
          }} />
        </div>
        <p style={{ textAlign: 'center', marginTop: 16, color: '#c9a84c', fontFamily: 'Syne', fontSize: 20, fontWeight: 700 }}>
          {progress}%
        </p>
      </div>
    </div>
  )
}