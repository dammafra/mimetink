import { GameStatus, useGameStore } from '@stores'

export function HUD() {
  const status = useGameStore(state => state.status)
  const restartLevel = useGameStore(state => state.restartLevel)

  if (status === GameStatus.READY) return null

  return (
    <>
      {/* Top Left: Objectives */}
      <div style={objectivesContainerStyle}>
        <div style={objectivesHeaderStyle}>OBJECTIVE</div>
        <div style={objectivesListStyle}>
          <div style={objectiveItemStyle}>
            <span style={objectiveBulletStyle}>•</span>
            <span>Restore the coral reef and reach the exit</span>
          </div>
        </div>
      </div>

      {/* Top Center: Level Indicator */}
      <div style={levelIndicatorStyle}>LEVEL 1</div>

      {/* Top Right: Restart Button */}
      <div style={containerStyle}>
        <button
          onClick={restartLevel}
          style={buttonStyle}
          onMouseEnter={e => {
            ; (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
              ; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'
          }}
          onMouseLeave={e => {
            ; (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
              ; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'
          }}
        >
          <RestartIcon />
        </button>
      </div>
    </>
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
  top: '24px',
  right: '24px',
  zIndex: 100,
}

const objectivesContainerStyle: React.CSSProperties = {
  position: 'fixed',
  top: '24px',
  left: '24px',
  zIndex: 100,
  padding: '16px 20px',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  color: 'white',
  fontFamily: '"Outfit", sans-serif',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  pointerEvents: 'none',
}

const objectivesHeaderStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 800,
  letterSpacing: '0.15rem',
  marginBottom: '8px',
  opacity: 0.6,
  color: '#ffb142',
}

const objectivesListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
}

const objectiveItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.95rem',
  fontWeight: 500,
  gap: '10px',
}

const objectiveBulletStyle: React.CSSProperties = {
  color: '#ff5252',
  fontSize: '1.2rem',
}

const levelIndicatorStyle: React.CSSProperties = {
  position: 'fixed',
  top: '24px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 100,
  padding: '12px 24px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '50px',
  color: 'white',
  fontFamily: '"Outfit", sans-serif',
  fontSize: '1rem',
  fontWeight: 700,
  letterSpacing: '0.1rem',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  pointerEvents: 'none',
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
