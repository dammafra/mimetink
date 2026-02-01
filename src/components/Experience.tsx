import { Canvas, Helpers } from '@components/helpers'
import { useDebug } from '@hooks'
import { CameraControls, CameraControlsImpl, Hud, PerspectiveCamera } from '@react-three/drei'
import { PCFShadowMap } from 'three'
import { Bubbles } from './Bubbles'
import { FitCamera } from './FitCamera'
import { World } from './World'
import SoundBoard from './helpers/SoundBoard'

export function Experience() {
  const debug = useDebug()

  return (
    <Canvas shadows={{ type: PCFShadowMap }} orthographic>
      <CameraControls
        makeDefault
        polarRotateSpeed={debug ? undefined : 0}
        azimuthRotateSpeed={debug ? undefined : 0}
        mouseButtons={{
          wheel: CameraControlsImpl.ACTION.NONE,
          left: CameraControlsImpl.ACTION.NONE,
          right: CameraControlsImpl.ACTION.NONE,
          middle: CameraControlsImpl.ACTION.NONE,
        }}
        touches={{
          one: CameraControlsImpl.ACTION.NONE,
          two: CameraControlsImpl.ACTION.NONE,
          three: CameraControlsImpl.ACTION.NONE,
        }}
      />
      <FitCamera />
      <World />
      <Helpers />

      <SoundBoard />

      <Hud>
        <Bubbles />
        <PerspectiveCamera makeDefault position={[0, 0, 15]} />
      </Hud>
    </Canvas>
  )
}
