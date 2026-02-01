import React from 'react'
import { levels } from '../logic/levels'
import { useGameStore } from '../stores'

export const TutorialOverlay: React.FC = () => {
  const currentLevelIndex = useGameStore(state => state.currentLevelIndex)
  const currentTutorialStep = useGameStore(state => state.currentTutorialStep)
  const showTutorial = useGameStore(state => state.showTutorial)
  const nextTutorialStep = useGameStore(state => state.nextTutorialStep)

  if (!showTutorial || currentTutorialStep === null) return null

  const levelConfig = levels[currentLevelIndex]
  const step = levelConfig.tutorialSteps?.[currentTutorialStep]

  if (!step) return null

  return (
    <div
      onClick={nextTutorialStep}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-start p-10 cursor-pointer animate-in fade-in duration-500"
    >
      <div className="w-full max-w-2xl rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-white/15">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-teal-500 text-2xl">
            🐙
          </div>
          <span className="text-xl font-black tracking-widest text-white uppercase">
            Vincent van Polp
          </span>
        </div>
        <p className="text-2xl font-medium leading-relaxed text-white/90">{step.message}</p>
        <div className="mt-6 flex justify-end">
          <span className="animate-bounce text-sm font-bold tracking-widest text-white/40 uppercase">
            Continue
          </span>
        </div>
      </div>
    </div>
  )
}
