import { GameStatus } from '@config'
import { useGameStore } from '@stores'

export function TitleScreen() {
  const startGame = useGameStore(state => state.startGame)
  const status = useGameStore(state => state.status)

  if (status !== GameStatus.READY) return null

  return (
    <div className="fixed inset-0 z-1000 flex flex-col items-center justify-center text-white p-4 text-center">
      <div className="relative max-w-xl mb-5 animate-in zoom-in-150 duration-700">
        <img src="/title.png" />
        <h2 className="absolute bottom-0 right-0">DEMO</h2>
      </div>

      <button
        onClick={startGame}
        className="flex items-center justify-center rounded-full size-25 cursor-pointer border-3 border-white/20 bg-white/15 text-2xl text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-teal-600 active:scale-105 active:bg-teal-600 outline-none backdrop-blur-md animate-in zoom-in-0 duration-1000"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z"
          />
        </svg>
      </button>

      <a
        className="fixed bottom-10 flex items-center gap-2 cursor-pointer group animate-in fade-in slide-in-from-bottom-4 duration-1000"
        href="https://globalgamejam.org/games/2026/mimetink-0"
        target="_blank"
      >
        <div className="font font-extrabold flex items-center justify-center text-2xl border border-white/20 bg-white/15 rounded-full size-10 transition-all duration-300 group-hover:scale-105 group-hover:bg-teal-600 group-active:scale-105 group-active:bg-teal-600 outline-none backdrop-blur-md ">
          i
        </div>
        <p className="tracking-widest uppercase">credits</p>
      </a>
    </div>
  )
}
