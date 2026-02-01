import { type JSX } from 'react'
import { BLOCK_CONFIG, BlockType } from '../../constants/game'
import { AlgaFloor } from './AlgaFloor'
import { BaseBlock } from './BaseBlock'

export function MimeticBlock({
  delay,
  ...props
}: JSX.IntrinsicElements['group'] & { delay?: number; blockType?: BlockType }) {
  const color = BLOCK_CONFIG[BlockType.MimeticBlock].color

  return (
    <BaseBlock color={color} delay={delay} {...props}>
      <AlgaFloor color={color} />
    </BaseBlock>
  )
}
