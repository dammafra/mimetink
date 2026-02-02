import { Experience } from '@components'
import { DoubleTapPreventer, GUI } from '@components/helpers'
import { UI } from '@components/ui'
import { StrictMode } from 'react'

export default function App() {
  return (
    <>
      <GUI />
      <DoubleTapPreventer />

      <StrictMode>
        <UI />
        <Experience />
      </StrictMode>
    </>
  )
}
