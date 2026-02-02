import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import { DoubleSide, SRGBColorSpace, type ColorRepresentation } from 'three'

interface SpriteAnimatorProps {
  paths: string[]
  fps?: number
  loop?: boolean
  playing?: boolean
  position?: [number, number, number]
  scale?: number | [number, number, number]
  rotation?: [number, number, number]
  color?: ColorRepresentation
}

export function SpriteAnimator({
  paths,
  fps = 10,
  loop = true,
  playing = true,
  ...meshProps
}: SpriteAnimatorProps) {
  const [index, setIndex] = useState(0)
  const timer = useRef(0)

  // load textures
  const result = useTexture(paths)
  const textures = useMemo(() => (Array.isArray(result) ? result : [result]), [result])

  useEffect(() => {
    textures.forEach(texture => {
      texture.colorSpace = SRGBColorSpace
      texture.needsUpdate = true
    })
  }, [textures])

  useFrame((_, delta) => {
    if (!playing || textures.length === 0) return

    timer.current += delta
    const interval = 1 / fps

    if (timer.current >= interval) {
      timer.current = 0
      const nextIndex = index + 1

      if (nextIndex >= textures.length) {
        if (loop) setIndex(0)
      } else {
        setIndex(nextIndex)
      }
    }
  })

  return (
    <mesh {...meshProps} renderOrder={1}>
      <planeGeometry />
      <meshBasicMaterial
        map={textures[index]}
        transparent
        side={DoubleSide}
        color={meshProps.color}
        alphaTest={0.5}
      />
    </mesh>
  )
}
