import { createContext, useContext, useState, useCallback } from 'react'

const ToastCtx = createContext(null)

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#52c07a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const IconX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e05252" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const IconInfo = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
)
const IconClose = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((msg, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random()
    setToasts(p => [...p, { id, msg, type, exiting: false }])
    setTimeout(() => {
      setToasts(p => p.map(t => t.id === id ? { ...t, exiting: true } : t))
      setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 280)
    }, duration)
    return id
  }, [])

  const dismiss = useCallback((id) => {
    setToasts(p => p.map(t => t.id === id ? { ...t, exiting: true } : t))
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 280)
  }, [])

  const toast = {
    success: (msg, d) => addToast(msg, 'success', d),
    error:   (msg, d) => addToast(msg, 'error', d),
    info:    (msg, d) => addToast(msg, 'info', d),
  }

  const icons = { success: <IconCheck />, error: <IconX />, info: <IconInfo /> }

  return (
    <ToastCtx.Provider value={toast}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`toast toast-${t.type}${t.exiting ? ' exit' : ''}`}
          >
            <span style={{ flexShrink: 0 }}>{icons[t.type]}</span>
            <span style={{ flex: 1, lineHeight: 1.5 }}>{t.msg}</span>
            <button
              onClick={() => dismiss(t.id)}
              style={{
                background: 'none', border: 'none', color: 'rgba(234,234,234,0.3)',
                cursor: 'pointer', padding: 2, flexShrink: 0, display: 'flex',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(234,234,234,0.8)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(234,234,234,0.3)'}
            ><IconClose /></button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

export function useToast() {
  return useContext(ToastCtx)
}