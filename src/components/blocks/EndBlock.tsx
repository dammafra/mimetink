import type { JSX } from 'react'
import { BLOCK_CONFIG, BlockType } from '../../logic/Grid'
import { useGameStore } from '../../stores'
import { BaseBlock } from './BaseBlock'

export function EndBlock(props: JSX.IntrinsicElements['group']) {
    const isLevelCompleted = useGameStore(state => state.isLevelCompleted)

    return (
        <BaseBlock {...props}>
            <group scale={isLevelCompleted ? 1 : 0.5}>
                <mesh receiveShadow>
                    <boxGeometry />
                    <meshMatcapMaterial color={BLOCK_CONFIG[BlockType.End].color} />
                </mesh>
            </group>
        </BaseBlock>
    )
}
