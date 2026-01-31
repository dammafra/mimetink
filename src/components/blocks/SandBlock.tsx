import { randomOneOf } from '@utils'
import { useMemo, type JSX } from 'react'
import { MathUtils } from 'three'
import { BLOCK_CONFIG, BlockType } from '../../constants/game'
import { useFolderTextures } from '../../hooks'
import { BaseBlock } from './BaseBlock'

const sandModules = import.meta.glob('/public/sprites/sand/*.png', { eager: true, as: 'url' })

export function SandBlock({
  delay,
  ...props
}: JSX.IntrinsicElements['group'] & { delay?: number }) {
  const sprites = useFolderTextures(sandModules)

  const sprite = useMemo(() => randomOneOf(sprites), [sprites])
  const rotationZ = useMemo(() => randomOneOf([0, 90, 180, 270]), [])

  return (
    <BaseBlock color={BLOCK_CONFIG[BlockType.Sand].color} delay={delay} {...props}>
      <mesh
        rotation-x={MathUtils.degToRad(-90)}
        rotation-z={MathUtils.degToRad(rotationZ)}
        position-y={0.21}
        scale={0.75}
      >
        <planeGeometry />
        <meshBasicMaterial map={sprite} transparent />
      </mesh>
    </BaseBlock>
  )
}
