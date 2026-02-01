import { animated, useSpring } from '@react-spring/three'
import { useTexture } from '@react-three/drei'
import type { JSX } from 'react'
import { DoubleSide, MathUtils } from 'three'
import { BLOCK_CONFIG, BlockType } from '../../constants/game'
import { useGameStore } from '../../stores'
import { BaseBlock } from './BaseBlock'

export type EndBlockProps = JSX.IntrinsicElements['group'] & {
  delay?: number
  color?: string
}

export function EndBlock({ delay, color, ...props }: EndBlockProps) {
  const isLevelCompleted = useGameStore(state => state.isLevelCompleted)
  const sprite = useTexture('/sprites/cave.png')

  const { opacity } = useSpring({
    opacity: isLevelCompleted ? 1 : 0.5,
    config: { mass: 1, tension: 280, friction: 20 },
  })

  return (
    <group {...props}>
      <BaseBlock color={color || BLOCK_CONFIG[BlockType.End].color} delay={delay}>
        <mesh
          rotation={[MathUtils.degToRad(-35), 0, MathUtils.degToRad(-10)]}
          position-y={0.6}
          position-z={0.1}
          renderOrder={0}
        >
          <planeGeometry />
          {/* @ts-ignore */}
          <animated.meshBasicMaterial
            map={sprite}
            transparent
            side={DoubleSide}
            depthTest={false}
            depthWrite={false}
            // opacity={opacity}
          />
        </mesh>
      </BaseBlock>
    </group>
  )
}

useTexture.preload('/sprites/cave.png')
