import { CameraControls } from '@react-three/drei'
import { PCFShadowMap } from 'three'

import { Canvas, Helpers } from '@components/helpers'

import { Environment } from './Environment'
import { World } from './World'

export function Experience() {
  return (
    <Canvas
      shadows={{ type: PCFShadowMap }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 100,
        position: [2, 4, 6],
      }}
    >
      <CameraControls makeDefault />
      <Environment />
      <World />
      <Helpers />
    </Canvas>
  )
}
