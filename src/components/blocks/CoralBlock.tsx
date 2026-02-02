import { animated, config as springConfig, useSpring } from '@react-spring/three'
import { Billboard, Float, Sparkles, Text, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState, type JSX } from 'react'
import { Color, Group, MathUtils, SRGBColorSpace } from 'three'

import { BLOCK_CONFIG, BlockType } from '@config'
import { useGameStore } from '@stores'
import { randomOneOf } from '@utils'

import { AlgaFloor } from './AlgaFloor'
import { BaseBlock } from './BaseBlock'

const CORAL_SPRITES = [
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
]

export type CoralBlockProps = JSX.IntrinsicElements['group'] & {
  blockType: BlockType
  delay?: number
  color?: string
  moves?: number
  col?: number
  row?: number
}

export function CoralBlock({
  blockType,
  delay,
  color,
  moves,
  col,
  row,
  ...props
}: CoralBlockProps) {
  const vitalMovesLeft = useGameStore(state => state.vitalMovesLeft)
  const playerCol = useGameStore(state => state.playerCol)
  const playerRow = useGameStore(state => state.playerRow)
  const coralSprites = useTexture(CORAL_SPRITES)
  const groupRef = useRef<Group>(null)
  const [isScaledIn, setIsScaledIn] = useState(false)

  const sparklesRef = useRef<Group>(null)
  const [sparklesRotation, setSparklesRotation] = useState(0)
  const rotationStartTime = useRef<number | null>(null)

  const coralSprite = useMemo(() => randomOneOf(coralSprites), [coralSprites])

  // Check if player is on this block
  const isPlayerOnThisBlock =
    blockType === BlockType.VitalCoral &&
    col !== undefined &&
    row !== undefined &&
    playerCol === col &&
    playerRow === row

  // Start rotation when player enters, reset when exits
  useEffect(() => {
    if (isPlayerOnThisBlock) {
      if (rotationStartTime.current === null) {
        rotationStartTime.current = Date.now()
      }
    } else {
      rotationStartTime.current = null
      setSparklesRotation(0)
    }
  }, [isPlayerOnThisBlock])

  useEffect(() => {
    coralSprites.forEach(texture => {
      texture.colorSpace = SRGBColorSpace
      texture.needsUpdate = true
    })
  }, [coralSprites])

  // Track scale to hide sparkles during animation
  useFrame(() => {
    if (groupRef.current?.parent) {
      const parent = groupRef.current.parent as Group
      const currentScale = parent.scale.x
      setIsScaledIn(currentScale > 0.95)
    }

    // Animate sparkles: rotation while player is on this block
    if (isPlayerOnThisBlock && sparklesRef.current && rotationStartTime.current !== null) {
      const elapsed = (Date.now() - rotationStartTime.current) / 1000 // seconds
      const rotationSpeed = 0.01 // rotations per second (slower)
      setSparklesRotation(elapsed * rotationSpeed * Math.PI * 2)
    }
  })

  const config = BLOCK_CONFIG[blockType as keyof typeof BLOCK_CONFIG]
  const finalColor = color || (config && 'color' in config ? config.color : 'white')

  const bubbleSprite = useTexture('/sprites/bubble.png')

  const { scale } = useSpring({
    scale: !vitalMovesLeft ? 0.7 : 0,
    config: springConfig.wobbly,
  })

  // Spring animation for sparkles: Y position (rise when player is on block)
  const { sparklesY, sparklesScale } = useSpring({
    sparklesY: isPlayerOnThisBlock ? 0.8 : 0.25,
    sparklesScale: isPlayerOnThisBlock ? 0.8 : 1,
    config: { mass: 1, tension: 100, friction: 15 }, // Smooth transition
  })

  return (
    <BaseBlock color={finalColor} delay={delay} {...props}>
      <group ref={groupRef}>
        {blockType === BlockType.VitalCoral && isScaledIn && (
          <animated.group
            ref={sparklesRef}
            scale={sparklesScale}
            rotation-y={sparklesRotation}
            position-y={sparklesY}
          >
            <Sparkles color={finalColor} scale={1} size={20} position-y={0} />
          </animated.group>
        )}
        {blockType === BlockType.VitalCoral && !!moves && (
          <animated.group position={[0, 0.5, 0]} scale={scale}>
            <Billboard>
              <Float speed={5}>
                <mesh>
                  <planeGeometry />
                  <meshBasicMaterial
                    map={bubbleSprite}
                    alphaMap={bubbleSprite}
                    transparent
                    depthWrite={false}
                  />
                  <Text
                    font="/fonts/dyna-puff.ttf"
                    scale={0.5}
                    outlineColor={new Color(finalColor).multiply(new Color('#666666'))}
                    outlineWidth={0.2}
                    color={finalColor}
                  >
                    {moves}
                  </Text>
                </mesh>
              </Float>
            </Billboard>
          </animated.group>
        )}

        <mesh rotation={[MathUtils.degToRad(-35), 0, 0]} position={[0, 0.6, -0.25]}>
          <planeGeometry />
          <meshBasicMaterial map={coralSprite} transparent color={finalColor} alphaTest={0.5} />
        </mesh>
        <AlgaFloor color={finalColor} />
      </group>
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
