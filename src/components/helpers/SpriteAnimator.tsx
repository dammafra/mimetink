import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import { DoubleSide, type ColorRepresentation } from 'three'

interface SpriteAnimatorProps {
    paths: string[]
    fps?: number
    loop?: boolean
    playing?: boolean
    onComplete?: () => void
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
    onComplete,
    ...meshProps
}: SpriteAnimatorProps) {
    const [index, setIndex] = useState(0)
    const timer = useRef(0)

    // load textures
    const result = useTexture(paths)
    const textures = useMemo(() => (Array.isArray(result) ? result : [result]), [result])

    useFrame((_, delta) => {
        if (!playing || textures.length === 0) return

        timer.current += delta
        const interval = 1 / fps

        if (timer.current >= interval) {
            timer.current = 0
            const nextIndex = index + 1

            if (nextIndex >= textures.length) {
                if (loop) {
                    setIndex(0)
                } else {
                    onComplete?.()
                }
            } else {
                setIndex(nextIndex)
            }
        }
    })

    return (
        <mesh {...meshProps}>
            <planeGeometry />
            <meshBasicMaterial
                map={textures[index]}
                alphaMap={textures[index]}
                transparent
                side={DoubleSide}
                color={meshProps.color}
            />
        </mesh>
    )
}
