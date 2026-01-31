import { useTexture } from '@react-three/drei'
import { randomOneOf } from '@utils'
import { useMemo, type JSX } from 'react'
import { MathUtils } from 'three'
import { BLOCK_CONFIG, BlockType } from '../../logic/Grid'
import { BaseBlock } from './BaseBlock'

export function SandBlock(props: JSX.IntrinsicElements['group']) {
  const sprites = useTexture([
    '/sprites/sand/01.png',
    '/sprites/sand/02.png',
    // '/sprites/sand/03.png',
    // '/sprites/sand/04.png',
  ])

  const sprite = useMemo(() => randomOneOf(sprites), [])
  const rotationZ = useMemo(() => randomOneOf([0, 90, 180, 270]), [])

  return (
    <group {...props}>
      <mesh
        rotation-x={MathUtils.degToRad(-90)}
        rotation-z={MathUtils.degToRad(rotationZ)}
        position-y={0.21}
        scale={0.75}
      >
        <planeGeometry />
        <meshBasicMaterial map={sprite} transparent />
      </mesh>

      <BaseBlock color={BLOCK_CONFIG[BlockType.Sand].color} />
    </group>
  )
}
