import { useIsTouch } from '@hooks'
import { GameStatus, useGameStore } from '@stores'

export function StartScreen() {
  const startGame = useGameStore(state => state.startGame)
  const status = useGameStore(state => state.status)
  const isTouch = useIsTouch()

  if (status !== GameStatus.READY) return null

  return (
    <div className="fixed inset-0 z-1000 flex flex-col items-center justify-center text-white p-4 text-center">
      <div className="max-w-xl mb-5">
        <img src="/title.png" />
      </div>

      <button
        onClick={startGame}
        className="cursor-pointer tracking-widest rounded-3xl bg-teal-500 px-12 py-4 text-xl font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-teal-600 active:scale-105 active:bg-teal-600 outline-none"
      >
        START
      </button>
      <p className="mt-2 font-bold tracking-widest text-white backdrop-blur-md">
        🕹️ {isTouch ? 'Swipe to move' : 'Move with Arrow Keys or WASD'}
      </p>
    </div>
  )
}
