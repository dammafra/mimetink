import type { JSX } from 'react'
import { BLOCK_CONFIG, BlockType } from '../../logic/Grid'
import { BaseBlock } from './BaseBlock'

export function VitalCoralBlock(props: JSX.IntrinsicElements['group']) {
    return (
        <BaseBlock {...props}>
            <mesh receiveShadow>
                <boxGeometry />
                <meshMatcapMaterial color={BLOCK_CONFIG[BlockType.VitalCoral].color} />
            </mesh>
            <mesh position={[0, 1, 0]}>
                <coneGeometry args={[0.222, 1, 32]} />
                <meshMatcapMaterial color={BLOCK_CONFIG[BlockType.VitalCoral].color} />
            </mesh>
        </BaseBlock>
    )
}
