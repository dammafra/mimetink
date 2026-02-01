import { Billboard, Float, Sparkles, Text, useTexture } from '@react-three/drei'
import { randomOneOf } from '@utils'
import { useEffect, useMemo, type JSX } from 'react'
import { MathUtils, SRGBColorSpace } from 'three'
import { BLOCK_CONFIG, BlockType } from '../../constants/game'
import { useGameStore } from '../../stores/use-game'
import { AlgaFloor } from './AlgaFloor'
import { BaseBlock } from './BaseBlock'

export type CoralBlockProps = JSX.IntrinsicElements['group'] & {
  blockType: BlockType
  delay?: number
  color?: string
  moves?: number
}

export function CoralBlock({ blockType, delay, color, moves, ...props }: CoralBlockProps) {
  const vitalMovesLeft = useGameStore(state => state.vitalMovesLeft)
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

  const coralSprite = useMemo(() => randomOneOf(coralSprites), [coralSprites])

  useEffect(() => {
    coralSprites.forEach(texture => {
      texture.colorSpace = SRGBColorSpace
      texture.needsUpdate = true
    })
  }, [coralSprites])

  const finalColor = color || (BLOCK_CONFIG as any)[blockType].color

  const bubbleSprite = useTexture('/sprites/bubble.png')

  return (
    <BaseBlock color={finalColor} delay={delay} {...props}>
      {blockType === BlockType.VitalCoral && (
        <>
          <Sparkles
            color={finalColor}
            scale={0.8}
            size={30}
            count={10}
            position-y={1}
            material-depthWrite={false}
          />
          {!vitalMovesLeft && (
            <Billboard position={[0, 0.5, 0]} scale={0.7}>
              <Float speed={5}>
                <mesh>
                  <planeGeometry />
                  <meshBasicMaterial
                    map={bubbleSprite}
                    alphaMap={bubbleSprite}
                    transparent
                    depthWrite={false}
                  />
                  <Text scale={0.5} outlineColor="black" outlineWidth={0.08} color={finalColor}>
                    {moves}
                  </Text>
                </mesh>
              </Float>
            </Billboard>
          )}
        </>
      )}

      <mesh rotation={[MathUtils.degToRad(-35), 0, 0]} position={[0, 0.6, -0.25]}>
        <planeGeometry />
        <meshBasicMaterial map={coralSprite} transparent color={finalColor} alphaTest={0.5} />
      </mesh>
      <AlgaFloor color={finalColor} />
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

useTexture.preload('/sprites/bubbles.png')
