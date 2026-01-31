import type { JSX } from 'react'
import { BLOCK_CONFIG, BlockType } from '../../logic/Grid'
import { BaseBlock } from './BaseBlock'

export function EndBlock(props: JSX.IntrinsicElements['group']) {
    return (
        <BaseBlock {...props}>
            <mesh receiveShadow>
                <boxGeometry />
                <meshMatcapMaterial color={BLOCK_CONFIG[BlockType.End].color} />
            </mesh>
        </BaseBlock>
    )
}
