import { GameStatus, useGameStore } from '../stores/use-game'

export function StartScreen() {
    const startGame = useGameStore(state => state.startGame)
    const status = useGameStore(state => state.status)

    if (status !== GameStatus.READY) return null

    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <h1 style={titleStyle}>INKOGNITO</h1>
                <p style={subtitleStyle}>Navigate the grid. Activate the coral.</p>
                <button
                    onClick={startGame}
                    style={buttonStyle}
                    onMouseEnter={e => {
                        ; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)'
                            ; (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ff6b6b'
                    }}
                    onMouseLeave={e => {
                        ; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'
                            ; (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ff5252'
                    }}
                >
                    START GAME
                </button>
            </div>
        </div>
    )
}

const containerStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(8px)',
    zIndex: 1000,
    fontFamily: '"Outfit", sans-serif',
    color: 'white',
}

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '40px',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
}

const titleStyle: React.CSSProperties = {
    fontSize: '4rem',
    fontWeight: 900,
    letterSpacing: '0.2rem',
    margin: '0 0 10px 0',
    background: 'linear-gradient(to right, #ff5252, #ffb142)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
}

const subtitleStyle: React.CSSProperties = {
    fontSize: '1.2rem',
    opacity: 0.8,
    marginBottom: '40px',
}

const buttonStyle: React.CSSProperties = {
    padding: '16px 48px',
    fontSize: '1.2rem',
    fontWeight: 700,
    color: 'white',
    backgroundColor: '#ff5252',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 20px rgba(255, 82, 82, 0.3)',
    outline: 'none',
}
