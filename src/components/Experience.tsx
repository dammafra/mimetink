import { Canvas, Helpers } from '@components/helpers'
import { useDebug } from '@hooks'
import { CameraControls } from '@react-three/drei'
import { PCFShadowMap } from 'three'
import { FitCamera } from './FitCamera'
import { World } from './World'

export function Experience() {
  const debug = useDebug()

  return (
    <Canvas shadows={{ type: PCFShadowMap }} orthographic>
      <CameraControls
        makeDefault
        polarRotateSpeed={debug ? undefined : 0}
        azimuthRotateSpeed={debug ? undefined : 0}
        minZoom={5}
        maxZoom={100}
      />
      <FitCamera />
      <World />
      <Helpers />
    </Canvas>
  )
}
