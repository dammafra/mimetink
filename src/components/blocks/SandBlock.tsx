import { randomOneOf } from '@utils'
import { useMemo, type JSX } from 'react'
import { MathUtils } from 'three'
import { useFolderTextures } from '../../hooks'
import { BLOCK_CONFIG, BlockType } from '../../logic/Grid'
import { BaseBlock } from './BaseBlock'

const sandModules = import.meta.glob('/public/sprites/sand/*.png', { eager: true, as: 'url' })

export function SandBlock(props: JSX.IntrinsicElements['group']) {
  const sprites = useFolderTextures(sandModules)

  const sprite = useMemo(() => randomOneOf(sprites), [sprites])
  const rotationZ = useMemo(() => randomOneOf([0, 90, 180, 270]), [])

  return (
    <group {...props}>
      <mesh
        rotation-x={MathUtils.degToRad(-90)}
        rotation-z={MathUtils.degToRad(rotationZ)}
        position-y={0.21}
        scale={0.75}
      >
        <planeGeometry />
        <meshBasicMaterial map={sprite} transparent />
      </mesh>

      <BaseBlock color={BLOCK_CONFIG[BlockType.Sand].color} />
    </group>
  )
}
