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
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'black',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <video
                ref={videoRef}
                src="/intro.mp4"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                }}
                autoPlay
                playsInline
                muted
                onEnded={finishIntro}
            />

            <button
                onClick={finishIntro}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-bold tracking-widest text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95 outline-none"
            >
                SKIP
            </button>
        </div>
    )
}
