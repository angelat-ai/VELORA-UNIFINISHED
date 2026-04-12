export default function VeloraLogo({ size = 40, showText = true, textSize = 20 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" stroke="#c9a84c" strokeWidth="4" fill="none" />
        <path d="M22 30 L50 70 L78 30" stroke="#c9a84c" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M22 30 L32 30" stroke="#c9a84c" strokeWidth="3" strokeLinecap="round" />
        <path d="M78 30 L68 30" stroke="#c9a84c" strokeWidth="3" strokeLinecap="round" />
      </svg>
      {showText && (
        <span style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: textSize,
          color: '#f5f5f5',
          letterSpacing: '2px',
        }}>
          VELORA
        </span>
      )}
    </div>
  )
}