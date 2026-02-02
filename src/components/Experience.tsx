import { PCFShadowMap } from 'three'

import { Canvas, Helpers } from '@components/helpers'
import { GameStatus } from '@config'
import { useGameStore } from '@stores'

import { CameraRig } from './CameraRig'
import { Caustics } from './Caustics'
import { World } from './World'

export function Experience() {
  const status = useGameStore(state => state.status)

  if (status === GameStatus.INTRO) return null

  return (
    <Canvas
      shadows={{ type: PCFShadowMap }}
      orthographic
      camera={{ near: 0, far: 100, position: [0, 0, 15] }}
    >
      <CameraRig />
      <Caustics />
      <World />

      <Helpers />
    </Canvas>
  )
}
