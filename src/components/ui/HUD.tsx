import { GameStatus } from '@config'
import { useGameStore } from '@stores'

import { type Objective, Objectives } from './Objectives'

export function HUD() {
  const status = useGameStore(state => state.status)
  const currentLevelIndex = useGameStore(state => state.currentLevelIndex)
  const restartLevel = useGameStore(state => state.restartLevel)
  const nextLevel = useGameStore(state => state.nextLevel)
  const isCoralRestored = useGameStore(state => state.isLevelCompleted)
  const showCompletionOverlay = useGameStore(state => state.showCompletionOverlay)
  const showFailureOverlay = useGameStore(state => state.showFailureOverlay)
  const currentMoves = useGameStore(state => state.currentMoves)
  const maxMoves = useGameStore(state => state.maxMoves)
  const vitalMovesLeft = useGameStore(state => state.vitalMovesLeft)
  const hasCollectible = useGameStore(state => state.hasCollectible)
  const isShellCollected = useGameStore(state => state.isCollected)
  const showTutorial = useGameStore(state => state.showTutorial)

  if (status === GameStatus.READY || status === GameStatus.INTRO || showTutorial) return null

  const isMoveLimitExceeded = maxMoves !== undefined && currentMoves > maxMoves
  const isExitFailed = isMoveLimitExceeded
  const isExitCompleted = status === GameStatus.COMPLETED && !isExitFailed

  const objectives: Objective[] = [
    {
      id: 'coral',
      label: 'Restore the coral reef',
      completed: isCoralRestored,
      failed: false,
      showMoves: false,
    },
    ...(maxMoves !== undefined
      ? [
          {
            id: 'exit',
            label: `Reach the exit in ${maxMoves} moves`,
            completed: isExitCompleted,
            failed: isExitFailed,
            showMoves: true,
          },
        ]
      : []),
    ...(hasCollectible
      ? [
          {
            id: 'shell',
            label: 'Collect the shell for your garden',
            completed: isShellCollected,
            failed: false,
            showMoves: false,
          },
        ]
      : []),
  ]

  return (
    <>
      {/* Top Center: Level Indicator */}
      <div className="animate-in zoom-in-50 fixed max-md:bottom-6 md:top-6 max-md:left-6 md:right-1/2 z-100 md:translate-x-1/2 rounded-2xl border border-white/20 bg-white/15 px-6 py-3 text-xl font-bold tracking-widest text-white shadow-2xl backdrop-blur-md pointer-events-none">
        LEVEL {currentLevelIndex + 1}
      </div>

      {/* Top Left: Objectives (Below level on mobile) */}
      <div className="animate-in zoom-in-50 fixed z-100 w-70 rounded-2xl border border-white/20 bg-white/15 p-4 text-white shadow-2xl backdrop-blur-md pointer-events-none top-6 left-1/2 max-md:-translate-x-1/2 md:left-6">
        <Objectives objectives={objectives} currentMoves={currentMoves} maxMoves={maxMoves} />
        {!!vitalMovesLeft && (
          <div className="mt-2 flex items-center gap-2 border-t border-white/10 pt-2 animate-in slide-in-from-left-2">
            <span className="flex size-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            <span className="text-xs font-bold tracking-wider text-red-400 uppercase">
              {vitalMovesLeft === 1 ? '1 algal symbiont' : `${vitalMovesLeft} algal symbionts`}{' '}
              remaining
            </span>
          </div>
        )}
      </div>

      {/* Top Right: Restart Button */}
      <div className="animate-in zoom-in-50 fixed max-md:bottom-6 right-6 md:top-6 z-100">
        <button
          onClick={restartLevel}
          className="cursor-pointer group flex size-12.5 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white shadow-2xl outline-none backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-white/30 active:scale-110 active:bg-white/30"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-500 group-hover:rotate-180 group-active:rotate-180"
          >
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <polyline points="21 3 21 8 16 8" />
          </svg>
        </button>
      </div>

      {/* Level Completed Overlay */}
      {showCompletionOverlay && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center  backdrop-blur-sm transition-all duration-700 animate-in fade-in">
          <div className="animate-in zoom-in-50 rounded-2xl border border-white/20 bg-white/15 p-12 text-center shadow-2xl backdrop-blur-xl">
            <h2 className="mb-2 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-5xl font-black tracking-widest text-transparent">
              LEVEL COMPLETED
            </h2>
            <p className="mb-6 text-lg opacity-80 text-white">The coral reef is thriving again!</p>

            {/* Objectives Summary */}
            {/* <div className="mb-8 mx-auto max-w-md rounded-2xl border border-white/20 bg-white/10 p-4 text-left text-white">
              <Objectives objectives={objectives} currentMoves={currentMoves} maxMoves={maxMoves} />
            </div> */}

            <div className="flex gap-4 justify-center">
              <button
                onClick={restartLevel}
                className="cursor-pointer rounded-2xl bg-white/15 px-8 py-3 text-lg font-bold text-white border border-white/20 transition-all duration-300 hover:bg-white/30 hover:scale-105 active:bg-white/30 active:scale-105"
              >
                RETRY
              </button>
              <button
                onClick={nextLevel}
                className="cursor-pointer rounded-2xl bg-green-500/20 px-8 py-3 text-lg font-bold text-green-400 border border-green-500/20 transition-all duration-300 hover:bg-green-500/30 hover:scale-105 active:bg-green-500/30 active:scale-105"
              >
                NEXT LEVEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Level Failed Overlay */}
      {showFailureOverlay && (
        <div className="fixed flex-col inset-0 z-1000 flex items-center justify-center backdrop-blur-sm transition-all duration-700 animate-in fade-in bg-black/60">
          <h2 className="mb-2 bg-linear-to-r from-red-400 to-orange-500 bg-clip-text text-5xl font-black tracking-widest text-transparent">
            FAILED
          </h2>
          <p className="mb-6 text-lg opacity-80 text-white">You were spotted!</p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={restartLevel}
              className="cursor-pointer rounded-2xl bg-white/15 px-8 py-3 text-lg font-bold text-white border border-white/20 transition-all duration-300 hover:bg-white/30 hover:scale-105 active:bg-white/30 active:scale-105"
            >
              RETRY
            </button>
          </div>
        </div>
      )}
    </>
  )
}
