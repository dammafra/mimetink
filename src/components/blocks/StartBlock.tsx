import { type JSX } from 'react'

import { BLOCK_CONFIG, BlockType } from '@config'

import { AlgaFloor } from './AlgaFloor'
import { BaseBlock } from './BaseBlock'

type StartBlockProps = JSX.IntrinsicElements['group'] & {
  delay?: number
}

export function StartBlock({ delay, ...props }: StartBlockProps) {
  return (
    <BaseBlock color={BLOCK_CONFIG[BlockType.Start].color} delay={delay} {...props}>
      <AlgaFloor color="limegreen" />
    </BaseBlock>
  )
}
