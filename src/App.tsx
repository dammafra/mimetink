import { Experience, StartScreen } from '@components'
import { DoubleTapPreventer, GUI } from '@components/helpers'
import { StrictMode } from 'react'

export default function App() {
  return (
    <>
      <GUI />
      <DoubleTapPreventer />

      <StartScreen />

      <StrictMode>
        <Experience />
      </StrictMode>
    </>
  )
}
