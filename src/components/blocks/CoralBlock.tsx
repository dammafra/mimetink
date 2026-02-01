import { Billboard, useTexture } from '@react-three/drei'
import { randomOneOf } from '@utils'
import { useMemo, type JSX } from 'react'
import { MathUtils } from 'three'
import { BLOCK_CONFIG, BlockType } from '../../constants/game'
import { BaseBlock } from './BaseBlock'

export type CoralBlockProps = JSX.IntrinsicElements['group'] & {
  blockType: BlockType
  delay?: number
}

export function CoralBlock({ blockType, delay, ...props }: CoralBlockProps) {
  const coralSprites = useTexture([
    '/sprites/corals/1.png',
    '/sprites/corals/2.png',
    '/sprites/corals/3.png',
    '/sprites/corals/4.png',
    '/sprites/corals/6.png',
    '/sprites/corals/7.png',
    '/sprites/corals/8.png',
    '/sprites/corals/9.png',
    '/sprites/corals/10.png',
    '/sprites/corals/11.png',
    '/sprites/corals/12.png',
  ])
  const sandSprites = useTexture(['/sprites/sand/01.png', '/sprites/sand/02.png'])

  const coralSprite = useMemo(() => randomOneOf(coralSprites), [coralSprites])
  const sandSprite = useMemo(() => randomOneOf(sandSprites), [sandSprites])
  const rotationZ = useMemo(() => randomOneOf([0, 90, 180, 270]), [])

  const color = (BLOCK_CONFIG as any)[blockType].color

  return (
    <BaseBlock color={color} delay={delay} {...props}>
      <Billboard position-y={0.7}>
        <mesh>
          <planeGeometry />
          <meshBasicMaterial map={coralSprite} transparent color={color} />
        </mesh>
      </Billboard>
      <mesh
        rotation-x={MathUtils.degToRad(-90)}
        rotation-z={MathUtils.degToRad(rotationZ)}
        position-y={0.21}
        scale={0.75}
      >
        <planeGeometry />
        <meshBasicMaterial map={sandSprite} transparent alphaMap={sandSprite} color={color} />
      </mesh>
    </BaseBlock>
  )
}

useTexture.preload([
  '/sprites/corals/1.png',
  '/sprites/corals/2.png',
  '/sprites/corals/3.png',
  '/sprites/corals/4.png',
  '/sprites/corals/6.png',
  '/sprites/corals/7.png',
  '/sprites/corals/8.png',
  '/sprites/corals/9.png',
  '/sprites/corals/10.png',
  '/sprites/corals/11.png',
  '/sprites/corals/12.png',
])

useTexture.preload(['/sprites/sand/01.png', '/sprites/sand/02.png'])
