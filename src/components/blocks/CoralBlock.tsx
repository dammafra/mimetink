import { Billboard, useTexture } from '@react-three/drei'
import { randomOneOf } from '@utils'
import { useMemo, type JSX } from 'react'
import { MathUtils } from 'three'
import { BLOCK_CONFIG, BlockType } from '../../constants/game'
import { BaseBlock } from './BaseBlock'

export type CoralBlockProps = JSX.IntrinsicElements['group'] & {
  blockType: BlockType
  delay?: number
  color?: string
}

export function CoralBlock({ blockType, delay, color, ...props }: CoralBlockProps) {
  const coralSprites = useTexture([
    '/sprites/corals/01.png',
    '/sprites/corals/02.png',
    '/sprites/corals/03.png',
    '/sprites/corals/04.png',
    '/sprites/corals/05.png',
    '/sprites/corals/06.png',
    '/sprites/corals/07.png',
    '/sprites/corals/08.png',
    '/sprites/corals/09.png',
    '/sprites/corals/10.png',
    '/sprites/corals/11.png',
  ])
  const sandSprites = useTexture(['/sprites/sand/01.png', '/sprites/sand/02.png'])

  const coralSprite = useMemo(() => randomOneOf(coralSprites), [coralSprites])
  const sandSprite = useMemo(() => randomOneOf(sandSprites), [sandSprites])
  const rotationZ = useMemo(() => randomOneOf([0, 90, 180, 270]), [])

  const finalColor = color || (BLOCK_CONFIG as any)[blockType].color

  return (
    <BaseBlock color={finalColor} delay={delay} {...props}>
      <Billboard position-y={0.7}>
        <mesh>
          <planeGeometry />
          <meshBasicMaterial map={coralSprite} transparent color={finalColor} />
        </mesh>
      </Billboard>
      <mesh
        rotation-x={MathUtils.degToRad(-90)}
        rotation-z={MathUtils.degToRad(rotationZ)}
        position-y={0.21}
        scale={0.75}
      >
        <planeGeometry />
        <meshBasicMaterial map={sandSprite} transparent alphaMap={sandSprite} color={finalColor} />
      </mesh>
    </BaseBlock>
  )
}

useTexture.preload([
  '/sprites/corals/01.png',
  '/sprites/corals/02.png',
  '/sprites/corals/03.png',
  '/sprites/corals/04.png',
  '/sprites/corals/05.png',
  '/sprites/corals/06.png',
  '/sprites/corals/07.png',
  '/sprites/corals/08.png',
  '/sprites/corals/09.png',
  '/sprites/corals/10.png',
  '/sprites/corals/11.png',
])

useTexture.preload(['/sprites/sand/01.png', '/sprites/sand/02.png'])
