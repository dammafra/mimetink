import { CameraControls, CameraControlsImpl } from '@react-three/drei'
import { PCFShadowMap } from 'three'

import { Canvas, Helpers, SoundBoard } from '@components/helpers'
import { GameStatus } from '@config'
import { useDebug } from '@hooks'
import { useGameStore } from '@stores'

import { CameraRig } from './CameraRig'
import { Caustics } from './Caustics'
import { World } from './World'

export function Experience() {
  const debug = useDebug()
  const status = useGameStore(state => state.status)

  if (status === GameStatus.INTRO) return null

  return (
    <Canvas
      shadows={{ type: PCFShadowMap }}
      orthographic
      camera={{ near: 0, far: 100, position: [0, 0, 15] }}
    >
      <CameraControls
        makeDefault
        polarRotateSpeed={debug ? undefined : 0}
        azimuthRotateSpeed={debug ? undefined : 0}
        mouseButtons={
          debug
            ? undefined
            : {
                wheel: CameraControlsImpl.ACTION.NONE,
                left: CameraControlsImpl.ACTION.NONE,
                right: CameraControlsImpl.ACTION.NONE,
                middle: CameraControlsImpl.ACTION.NONE,
              }
        }
        touches={
          debug
            ? undefined
            : {
                one: CameraControlsImpl.ACTION.NONE,
                two: CameraControlsImpl.ACTION.NONE,
                three: CameraControlsImpl.ACTION.NONE,
              }
        }
      />

      <CameraRig />
      <Caustics />
      <World />

      <SoundBoard />
      <Helpers />
    </Canvas>
  )
}
