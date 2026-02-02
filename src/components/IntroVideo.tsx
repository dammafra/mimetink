import React, { useEffect, useRef } from 'react'
import { useGameStore } from '../stores/use-game'

export const IntroVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const finishIntro = useGameStore(state => state.finishIntro)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error)
        // If autoplay fails, we might need a backup button or just finish the intro
        // for now let's just log it.
      })
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-screen h-dvh bg-black z-9999 flex items-center justify-center">
      <video
        ref={videoRef}
        src="/intro.mp4"
        className="w-full h-full object-contain"
        autoPlay
        playsInline
        onEnded={finishIntro}
      />

      <button
        onClick={finishIntro}
        className="absolute left-1/2 -translate-x-1/2 cursor-pointer rounded-2xl border border-white/20 bg-white/15 px-8 py-3 text-sm font-bold tracking-widest text-white backdrop-blur-md transition-all duration-300 hover:bg-white/30 hover:scale-105 active:scale-95 outline-none bottom-[calc(3rem+env(safe-area-inset-bottom))]"
      >
        SKIP
      </button>
    </div>
  )
}
