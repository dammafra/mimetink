import { useIsTouch } from '@hooks'
import { GameStatus, useGameStore } from '@stores'

export function ControlsOverlay() {
  const isTouch = useIsTouch()
  const status = useGameStore(state => state.status)
  const currentLevelIndex = useGameStore(state => state.currentLevelIndex)
  const currentMoves = useGameStore(state => state.currentMoves)
  const showTutorial = useGameStore(state => state.showTutorial)

  const isVisible =
    status === GameStatus.PLAYING && currentLevelIndex === 0 && currentMoves === 0 && !showTutorial

  if (!isVisible) return null

  return (
    <div className="fixed bottom-10 left-1/2 z-100 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-[env(safe-area-inset-bottom)] pointer-events-none">
      <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 shadow-2xl backdrop-blur-md">
        <span className="text-sm font-bold tracking-widest text-white/80 uppercase">
          {isTouch ? 'Swipe to move' : 'Use Arrow Keys or WASD to move'}
        </span>
      </div>
    </div>
  )
}
