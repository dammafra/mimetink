import { GameStatus, useGameStore } from '@stores'

export function HUD() {
  const status = useGameStore(state => state.status)
  const restartLevel = useGameStore(state => state.restartLevel)

  if (status === GameStatus.READY) return null

  return (
    <div style={containerStyle}>
      <button
        onClick={restartLevel}
        style={buttonStyle}
        onMouseEnter={e => {
          ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
          ;(e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'
        }}
        onMouseLeave={e => {
          ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
          ;(e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'
        }}
      >
        <RestartIcon />
      </button>
    </div>
  )
}

function RestartIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <polyline points="21 3 21 8 16 8" />
    </svg>
  )
}

const containerStyle: React.CSSProperties = {
  position: 'fixed',
  top: '20px',
  right: '24px',
  zIndex: 100,
}

const buttonStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '12px',
  color: 'white',
  cursor: 'pointer',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
  outline: 'none',
}
