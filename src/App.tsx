import { Experience } from '@components'
import { DoubleTapPreventer, GUI, SoundBoard } from '@components/helpers'
import { UI } from '@components/ui'
import { StrictMode } from 'react'

export default function App() {
  return (
    <>
      <GUI />
      <DoubleTapPreventer />

      <StrictMode>
        <Experience />
        <UI />
        <SoundBoard />
      </StrictMode>
    </>
  )
}
