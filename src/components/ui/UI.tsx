import { GameStatus } from '@config'
import { useGameStore } from '@stores'

import { ControlsOverlay } from './ControlsOverlay'
import { Foreground } from './Foregroung'
import { HUD } from './HUD'
import { IntroVideo } from './IntroVideo'
import { TitleScreen } from './TitleScreen'
import { TutorialOverlay } from './TutorialOverlay'

export function UI() {
  const status = useGameStore(state => state.status)

  return (
    <>
      <HUD />
      <TitleScreen />
      <Foreground />

      {status === GameStatus.INTRO && <IntroVideo />}
      {status === GameStatus.PLAYING && (
        <>
          <TutorialOverlay />
          <ControlsOverlay />
        </>
      )}
    </>
  )
}
