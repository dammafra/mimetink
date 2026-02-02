import { SpriteAnimator } from '@components/helpers'
import { randomInt } from '@utils'
import { type JSX } from 'react'
import { MathUtils } from 'three'
import { BLOCK_CONFIG, BlockType } from '../../constants/game'
import { AlgaFloor } from './AlgaFloor'
import { BaseBlock } from './BaseBlock'

export function EnemyBlock({
  delay,
  ...props
}: JSX.IntrinsicElements['group'] & { delay?: number; blockType?: BlockType }) {
  const color = BLOCK_CONFIG[BlockType.EnemyBlock].color

  return (
    <BaseBlock color={color} delay={delay} {...props}>
      <SpriteAnimator
        rotation={[MathUtils.degToRad(-35), 0, 0]}
        position-y={0.5}
        position-z={-0.1}
        fps={randomInt(5, 8)}
        paths={[
          '/sprites/crab/01.png',
          '/sprites/crab/02.png',
          '/sprites/crab/03.png',
          '/sprites/crab/04.png',
          '/sprites/crab/05.png',
        ]}
      />
      <AlgaFloor color={color} />
    </BaseBlock>
  )
}
