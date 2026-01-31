import type { JSX } from 'react'
import { BLOCK_CONFIG, BlockType } from '../../logic/Grid'
import { BaseBlock } from './BaseBlock'

export function StartBlock(props: JSX.IntrinsicElements['group']) {
    return (
        <BaseBlock {...props}>
            <mesh receiveShadow>
                <boxGeometry />
                <meshMatcapMaterial color={BLOCK_CONFIG[BlockType.Start].color} />
            </mesh>
        </BaseBlock>
    )
}
