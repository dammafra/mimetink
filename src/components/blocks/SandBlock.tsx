import { useTexture } from '@react-three/drei'
import { type JSX, useEffect, useMemo } from 'react'
import { MathUtils, SRGBColorSpace } from 'three'

import { BLOCK_CONFIG, BlockType } from '@config'
import { randomOneOf } from '@utils'

import { BaseBlock } from './BaseBlock'

export function SandBlock({
  delay,
  children,
  ...props
}: JSX.IntrinsicElements['group'] & { delay?: number; blockType?: BlockType }) {
  const sprites = useTexture(['/sprites/sand/01.png', '/sprites/sand/02.png'])

  const sprite = useMemo(() => randomOneOf(sprites), [sprites])
  const rotationZ = useMemo(() => randomOneOf([0, 90, 180, 270]), [])

  useEffect(() => {
    sprites.forEach(texture => {
      texture.colorSpace = SRGBColorSpace
      texture.needsUpdate = true
    })
  }, [sprites])

  return (
    <BaseBlock color={BLOCK_CONFIG[BlockType.Sand].color} delay={delay} {...props}>
      <mesh
        rotation-x={MathUtils.degToRad(-90)}
        rotation-z={MathUtils.degToRad(rotationZ)}
        position-y={0.21}
        scale={0.75}
      >
        <planeGeometry />
        <meshBasicMaterial map={sprite} transparent toneMapped={false} />
      </mesh>
      {children}
    </BaseBlock>
  )
}

useTexture.preload(['/sprites/sand/01.png', '/sprites/sand/02.png'])
