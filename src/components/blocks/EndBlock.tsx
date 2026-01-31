import { a, useSpring } from '@react-spring/three'
import { Billboard, useTexture } from '@react-three/drei'
import type { JSX } from 'react'
import { DoubleSide } from 'three'
import { BLOCK_CONFIG, BlockType } from '../../constants/game'
import { useGameStore } from '../../stores'
import { BaseBlock } from './BaseBlock'

export function EndBlock({ delay, ...props }: JSX.IntrinsicElements['group'] & { delay?: number }) {
  const isLevelCompleted = useGameStore(state => state.isLevelCompleted)
  const sprite = useTexture('/sprites/cave.png')

  const spring = useSpring({ scale: isLevelCompleted ? 1 : 0 })

  return (
    <group {...props}>
      <BaseBlock color={BLOCK_CONFIG[BlockType.End].color} delay={delay}>
        <a.group scale={spring.scale}>
          <Billboard position-y={0.5}>
            <mesh>
              <planeGeometry />
              <meshBasicMaterial map={sprite} transparent side={DoubleSide} />
            </mesh>
          </Billboard>
        </a.group>
      </BaseBlock>
    </group>
  )
}
