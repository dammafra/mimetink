import { useTexture } from '@react-three/drei'
import { randomOneOf } from '@utils'
import { useMemo, type JSX } from 'react'
import { MathUtils } from 'three'
import { BLOCK_CONFIG, BlockType } from '../../constants/game'
import { BaseBlock } from './BaseBlock'

export function SandBlock({
  delay,
  color,
  ...props
}: JSX.IntrinsicElements['group'] & { delay?: number; color?: string; blockType?: BlockType }) {
  const sprites = useTexture(['/sprites/sand/01.png', '/sprites/sand/02.png'])

  const sprite = useMemo(() => randomOneOf(sprites), [sprites])
  const rotationZ = useMemo(() => randomOneOf([0, 90, 180, 270]), [])

  return (
    <BaseBlock color={color || BLOCK_CONFIG[BlockType.Sand].color} delay={delay} {...props}>
      <mesh
        rotation-x={MathUtils.degToRad(-90)}
        rotation-z={MathUtils.degToRad(rotationZ)}
        position-y={0.21}
        scale={0.75}
      >
        <planeGeometry />
        <meshBasicMaterial
          map={sprite}
          transparent
          alphaMap={color ? sprite : undefined}
          color={color}
        />
      </mesh>
    </BaseBlock>
  )
}

useTexture.preload(['/sprites/sand/01.png', '/sprites/sand/02.png'])
