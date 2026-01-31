import { CameraControls } from '@react-three/drei'
import { PCFShadowMap } from 'three'

import { Canvas, Helpers } from '@components/helpers'
import { useDebug } from '@hooks'

import { World } from './World'

export function Experience() {
  const debug = useDebug()

  return (
    <Canvas
      shadows={{ type: PCFShadowMap }}
      orthographic
      camera={{
        position: [-10, 45, 35],
        zoom: 50,
      }}
    >
      <CameraControls
        makeDefault
        polarRotateSpeed={debug ? undefined : 0}
        azimuthRotateSpeed={debug ? undefined : 0}
      />
      <World />
      <Helpers />
    </Canvas>
  )
}
