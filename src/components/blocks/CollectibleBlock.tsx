import { Float, useTexture } from '@react-three/drei'
import { useEffect, type JSX } from 'react'
import { MathUtils, SRGBColorSpace } from 'three'

import type { BlockType } from '@config'
import { useGameStore } from '@stores'

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
        <>
          <Float rotationIntensity={0.8} floatIntensity={0} speed={10}>
            <mesh rotation-x={MathUtils.degToRad(-35)} position={[-0.025, 0.5, 0.1]} scale={0.7}>
              <planeGeometry />
              <meshBasicMaterial map={sprite} transparent color="skyblue" />
            </mesh>
          </Float>
        </>
      )}
    </SandBlock>
  )
}
