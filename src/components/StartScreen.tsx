import { GameStatus, useGameStore } from '@stores'

export function StartScreen() {
  const startGame = useGameStore(state => state.startGame)
  const status = useGameStore(state => state.status)

  if (status !== GameStatus.READY) return null

  return (
    <div className="fixed inset-0 z-1000 flex flex-col items-center justify-center text-white p-12 text-center transition-all duration-700 animate-in zoom-in-50">
      <h1 className="mb-2 bg-gradient-to-r from-[#ff5252] to-[#ffb142] bg-clip-text text-6xl font-black tracking-widest text-transparent uppercase">
        MimetInk
      </h1>
      <p className="mb-10 text-xl">Navigate the grid. Activate the coral.</p>
      <button
        onClick={startGame}
        className="cursor-pointer rounded-2xl bg-[#ff5252] px-12 py-4 text-xl font-bold text-white shadow-[0_10_20px_rgba(255,82,82,0.3)] transition-all duration-300 hover:scale-105 hover:bg-[#ff6b6b] outline-none"
      >
        START GAME
      </button>
    </div>
  )
}
