import type { JSX } from 'react'
import { BLOCK_CONFIG, BlockType } from '../../logic/Grid'
import { BaseBlock } from './BaseBlock'

export function SandBlock(props: JSX.IntrinsicElements['group']) {
    return (
        <BaseBlock {...props}>
            <mesh receiveShadow>
                <boxGeometry />
                <meshMatcapMaterial color={BLOCK_CONFIG[BlockType.Sand].color} />
            </mesh>
        </BaseBlock>
    )
}
