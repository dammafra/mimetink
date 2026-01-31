import { a, useSpring } from '@react-spring/three'
import { Billboard, useTexture } from '@react-three/drei'
import type { JSX } from 'react'
import { DoubleSide } from 'three'
import { BLOCK_CONFIG, BlockType } from '../../logic/Grid'
import { useGameStore } from '../../stores'
import { BaseBlock } from './BaseBlock'

export function EndBlock(props: JSX.IntrinsicElements['group']) {
  const isLevelCompleted = useGameStore(state => state.isLevelCompleted)
  const sprite = useTexture('/sprites/cave.png')

  const spring = useSpring({ scale: isLevelCompleted ? 1 : 0 })

  return (
    <a.group scale={spring.scale} {...props}>
      <Billboard position-y={0.5}>
        <mesh>
          <planeGeometry />
          <meshBasicMaterial map={sprite} transparent side={DoubleSide} />
        </mesh>
      </Billboard>
      <BaseBlock color={BLOCK_CONFIG[BlockType.End].color} />
    </a.group>
  )
}
