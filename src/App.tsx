import {
  ControlsOverlay,
  Experience,
  HUD,
  IntroVideo,
  StartScreen,
  TutorialOverlay,
} from '@components'
import { DoubleTapPreventer, GUI } from '@components/helpers'
import { GameStatus, useGameStore } from '@stores'
import { StrictMode } from 'react'

export default function App() {
  const status = useGameStore(state => state.status)

  return (
    <>
      <GUI />
      <DoubleTapPreventer />

      <HUD />
      <StartScreen />
      {status === GameStatus.INTRO && <IntroVideo />}
      {status === GameStatus.PLAYING && (
        <>
          <TutorialOverlay />
          <ControlsOverlay />
        </>
      )}

      {status !== GameStatus.INTRO && (
        <StrictMode>
          <Experience />
        </StrictMode>
      )}
    </>
  )
}
