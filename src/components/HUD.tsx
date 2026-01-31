import { GameStatus, useGameStore } from '@stores'
import { clsx } from 'clsx'

export function HUD() {
  const status = useGameStore(state => state.status)
  const restartLevel = useGameStore(state => state.restartLevel)
  const isCoralRestored = useGameStore(state => state.isLevelCompleted)

  if (status === GameStatus.READY) return null

  const objectives = [
    { id: 'coral', label: 'Restore the coral reef', completed: isCoralRestored },
    { id: 'exit', label: 'Reach the exit', completed: status === GameStatus.COMPLETED },
  ]

  return (
    <>
      {/* Top Center: Level Indicator */}
      <div className="animate-in zoom-in-50 fixed top-6 left-1/2 z-100 -translate-x-1/2 rounded-2xl border border-white/20 bg-white/15 px-6 py-3 text-sm font-bold tracking-widest text-white shadow-2xl backdrop-blur-md pointer-events-none md:top-6">
        LEVEL 1
      </div>

      {/* Top Left: Objectives (Below level on mobile) */}
      <div className="animate-in zoom-in-50 fixed top-22 left-1/2 z-100 w-70 -translate-x-1/2 rounded-2xl border border-white/20 bg-white/15 p-4 text-white shadow-2xl backdrop-blur-md pointer-events-none md:top-6 md:left-6 md:w-auto md:translate-x-0">
        <div className="mb-2 text-[0.7rem] font-extrabold tracking-[0.15rem] text-[#ffb142] opacity-60">
          OBJECTIVE
        </div>
        <div className="flex flex-col gap-1.5">
          {objectives.map(obj => (
            <div
              key={obj.id}
              className={clsx(
                'flex items-center gap-2.5 text-[0.95rem] font-medium transition-all duration-300',
                obj.completed && 'opacity-50',
              )}
            >
              <span
                className={clsx(
                  'text-[1.2rem]',
                  obj.completed ? 'text-green-400' : 'text-[#ff5252]',
                )}
              >
                {obj.completed ? '✓' : '•'}
              </span>
              <span className={clsx(obj.completed && 'line-through')}>{obj.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Right: Restart Button */}
      <div className="animate-in zoom-in-50 fixed top-6 right-6 z-100">
        <button
          onClick={restartLevel}
          className="group flex size-12.5 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white shadow-2xl outline-none backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-white/30"
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
            className="transition-transform duration-500 group-hover:rotate-180"
          >
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <polyline points="21 3 21 8 16 8" />
          </svg>
        </button>
      </div>

      {/* Level Completed Overlay */}
      {status === GameStatus.COMPLETED && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center  backdrop-blur-sm transition-all duration-700 animate-in fade-in">
          <div className="animate-in zoom-in-50 rounded-3xl border border-white/20 bg-white/15 p-12 text-center shadow-2xl backdrop-blur-xl">
            <h2 className="mb-2 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-5xl font-black tracking-widest text-transparent">
              LEVEL COMPLETED
            </h2>
            <p className="mb-8 text-lg opacity-80 text-white">The coral reef is thriving again!</p>
            <button
              onClick={restartLevel}
              className="cursor-pointer rounded-2xl bg-white/10 px-8 py-3 text-lg font-bold text-white border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              PLAY AGAIN
            </button>
          </div>
        </div>
      )}
    </>
  )
}
