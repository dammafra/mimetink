import { type JSX } from 'react'
import { BlockType } from '../../constants/game'
import { AlgaFloor } from './AlgaFloor'
import { BaseBlock } from './BaseBlock'

export function DecorativeBlock({
  delay,
  ...props
}: JSX.IntrinsicElements['group'] & { delay?: number; blockType?: BlockType }) {
  return (
    <BaseBlock color="teal" delay={delay} {...props}>
      <AlgaFloor tall color="limegreen" />
    </BaseBlock>
  )
}
