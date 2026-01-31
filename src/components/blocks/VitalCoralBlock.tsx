import type { JSX } from 'react'
import { BLOCK_CONFIG, BlockType } from '../../logic/Grid'
import { BaseBlock } from './BaseBlock'

export function VitalCoralBlock(props: JSX.IntrinsicElements['group']) {
  return (
    <BaseBlock color={BLOCK_CONFIG[BlockType.VitalCoral].color} {...props}>
      <mesh position={[0, 1, 0]}>
        <coneGeometry args={[0.222, 1, 32]} />
        <meshMatcapMaterial color={BLOCK_CONFIG[BlockType.VitalCoral].color} />
      </mesh>
    </BaseBlock>
  )
}
