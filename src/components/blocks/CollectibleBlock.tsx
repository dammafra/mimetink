import { Float, Sparkles, useTexture } from '@react-three/drei'
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
          <Float rotationIntensity={0} floatIntensity={0.8} speed={10}>
            <Sparkles scale={0.5} size={30} count={5} position-y={0.5} />
            <mesh rotation-x={MathUtils.degToRad(-35)} position-y={0.4} scale={0.5}>
              <planeGeometry />
              <meshMatcapMaterial
                map={sprite}
                transparent
                depthTest={false}
                depthWrite={false}
                alphaTest={0.5}
              />
            </mesh>
          </Float>
        </>
      )}
    </SandBlock>
  )
}
