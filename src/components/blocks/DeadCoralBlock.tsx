import { Billboard, useTexture } from '@react-three/drei'
import { randomOneOf } from '@utils'
import { useMemo, type JSX } from 'react'
import { MathUtils } from 'three'
import { BLOCK_CONFIG, BlockType } from '../../logic/Grid'
import { BaseBlock } from './BaseBlock'

export function DeadCoralBlock({
  blockType = BlockType.DeadCoral,
  ...props
}: JSX.IntrinsicElements['group'] & { blockType?: BlockType }) {
  const sprites = useTexture([
    '/sprites/corals/1.png',
    '/sprites/corals/2.png',
    '/sprites/corals/3.png',
    '/sprites/corals/4.png',
    // '/sprites/corals/5.png',
    '/sprites/corals/6.png',
    '/sprites/corals/7.png',
    '/sprites/corals/8.png',
    '/sprites/corals/9.png',
    '/sprites/corals/10.png',
    '/sprites/corals/11.png',
    '/sprites/corals/12.png',
  ])

  const sprite = useMemo(() => randomOneOf(sprites), [])

  const sandSprites = useTexture([
    '/sprites/sand/01.png',
    '/sprites/sand/02.png',
    // '/sprites/sand/03.png',
    // '/sprites/sand/04.png',
  ])

  const sandSprite = useMemo(() => randomOneOf(sandSprites), [])
  const rotationZ = useMemo(() => randomOneOf([0, 90, 180, 270]), [])

  return (
    <group {...props}>
      <Billboard position-y={0.7}>
        <mesh>
          <planeGeometry />
          <meshBasicMaterial map={sprite} transparent color={(BLOCK_CONFIG as any)[blockType].color} />
        </mesh>
      </Billboard>
      <mesh
        rotation-x={MathUtils.degToRad(-90)}
        rotation-z={MathUtils.degToRad(rotationZ)}
        position-y={0.21}
        scale={0.75}
      >
        <planeGeometry />
        <meshBasicMaterial
          map={sandSprite}
          transparent
          alphaMap={sandSprite}
          color={(BLOCK_CONFIG as any)[blockType].color}
        />
      </mesh>
      <BaseBlock color={(BLOCK_CONFIG as any)[blockType].color} />
    </group>
  )
}
