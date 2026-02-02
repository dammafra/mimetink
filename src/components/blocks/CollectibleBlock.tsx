import { Float, useTexture } from '@react-three/drei'
import { useGameStore } from '@stores'
import { useEffect, type JSX } from 'react'
import { MathUtils, SRGBColorSpace } from 'three'
import { BlockType } from '../../constants/game'
import { SandBlock } from './SandBlock'

export function CollectibleBlock(
  props: JSX.IntrinsicElements['group'] & { delay?: number; blockType?: BlockType },
) {
  const collected = useGameStore(s => s.isCollected)
  const sprite = useTexture('/sprites/clam.png')

  useEffect(() => {
    sprite.colorSpace = SRGBColorSpace
    sprite.needsUpdate = true
  }, [sprite])

  return (
    <SandBlock {...props}>
      {!collected && (
        <Float rotationIntensity={0} speed={10}>
          <mesh rotation-x={MathUtils.degToRad(-35)} position-y={0.4} scale={0.5}>
            <planeGeometry />
            <meshMatcapMaterial map={sprite} transparent depthTest={false} depthWrite={false} />
          </mesh>
        </Float>
      )}
    </SandBlock>
  )
}
