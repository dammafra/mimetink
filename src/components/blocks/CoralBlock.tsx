import { Billboard } from '@react-three/drei'
import { randomOneOf } from '@utils'
import { useMemo, type JSX } from 'react'
import { MathUtils } from 'three'
import { BLOCK_CONFIG, BlockType } from '../../constants/game'
import { useFolderTextures } from '../../hooks'
import { BaseBlock } from './BaseBlock'

const coralModules = import.meta.glob('/public/sprites/corals/*.png', { eager: true, as: 'url' })
const sandModules = import.meta.glob('/public/sprites/sand/*.png', { eager: true, as: 'url' })

export type CoralBlockProps = JSX.IntrinsicElements['group'] & {
  blockType: BlockType
  delay?: number
}

export function CoralBlock({ blockType, delay, ...props }: CoralBlockProps) {
  const coralSprites = useFolderTextures(coralModules)
  const sandSprites = useFolderTextures(sandModules)

  const coralSprite = useMemo(() => randomOneOf(coralSprites), [coralSprites])
  const sandSprite = useMemo(() => randomOneOf(sandSprites), [sandSprites])
  const rotationZ = useMemo(() => randomOneOf([0, 90, 180, 270]), [])

  const color = (BLOCK_CONFIG as any)[blockType].color

  return (
    <BaseBlock color={color} delay={delay} {...props}>
      <Billboard position-y={0.7}>
        <mesh>
          <planeGeometry />
          <meshBasicMaterial map={coralSprite} transparent color={color} />
        </mesh>
      </Billboard>
      <mesh
        rotation-x={MathUtils.degToRad(-90)}
        rotation-z={MathUtils.degToRad(rotationZ)}
        position-y={0.21}
        scale={0.75}
      >
        <planeGeometry />
        <meshBasicMaterial map={sandSprite} transparent alphaMap={sandSprite} color={color} />
      </mesh>
    </BaseBlock>
  )
}
