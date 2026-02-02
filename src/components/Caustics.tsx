import { useSpring } from '@react-spring/three'
import { Hud, PerspectiveCamera, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  NormalBlending,
  RepeatWrapping,
  SRGBColorSpace,
} from 'three'

export function Caustics() {
  const meshRef1 = useRef<Mesh>(null)
  const meshRef2 = useRef<Mesh>(null)
  const causticsTexture = useTexture('/sprites/caustics.png')

  // Spring animation for fade in
  const { opacity } = useSpring({
    from: { opacity: 0 },
    to: { opacity: 0.08 },
    config: { duration: 3000 },
  })

  // Configure base texture
  causticsTexture.wrapS = RepeatWrapping
  causticsTexture.wrapT = RepeatWrapping
  causticsTexture.colorSpace = SRGBColorSpace
  // Tile the texture less densely for a more subtle effect
  causticsTexture.repeat.set(2, 2)

  // Clone texture for second layer
  const causticsTexture2 = causticsTexture.clone()
  causticsTexture2.wrapS = RepeatWrapping
  causticsTexture2.wrapT = RepeatWrapping
  causticsTexture2.repeat.set(2, 2)

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    const currentOpacity = opacity.get()

    // Layer 1: movimento ondulatorio più lento
    if (meshRef1.current) {
      const material1 = meshRef1.current.material as MeshBasicMaterial
      const speed1 = 0.008 // Movimento molto più lento
      // Movimento ondulatorio usando sin/cos (frequenze più basse)
      const waveX = Math.sin(time * 0.15) * 0.5
      const waveY = Math.cos(time * 0.12) * 0.5
      const offsetX1 = (time * speed1 + waveX * 0.1) % 1
      const offsetY1 = (time * speed1 * 0.8 + waveY * 0.1) % 1

      if (material1.map) {
        material1.map.offset.set(offsetX1, offsetY1)
      }
      material1.opacity = currentOpacity
    }

    // Layer 2: movimento in direzione leggermente diversa
    if (meshRef2.current) {
      const material2 = meshRef2.current.material as MeshBasicMaterial
      const speed2 = 0.007 // Velocità leggermente diversa per il drift (più lenta)
      // Movimento ondulatorio con fase diversa (frequenze più basse)
      const waveX2 = Math.cos(time * 0.14) * 0.5
      const waveY2 = Math.sin(time * 0.11) * 0.5
      const offsetX2 = (time * speed2 * -0.6 + waveX2 * 0.1) % 1 // Direzione opposta
      const offsetY2 = (time * speed2 * 0.9 + waveY2 * 0.1) % 1

      if (material2.map) {
        material2.map.offset.set(offsetX2, offsetY2)
      }
      material2.opacity = currentOpacity
    }
  })

  return (
    <Hud>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />
      <group>
        {/* Primo layer */}
        <mesh ref={meshRef1} position={[0, 5, 0]} scale={[50, 50, 1]}>
          <planeGeometry />
          <meshBasicMaterial
            map={causticsTexture}
            transparent
            opacity={0} // Will be animated by spring
            side={DoubleSide}
            depthWrite={false}
            blending={NormalBlending}
          />
        </mesh>
        {/* Secondo layer con leggero offset per il drift */}
        <mesh
          ref={meshRef2}
          position={[0, 5.01, 0]} // Leggerissimo offset verticale
          scale={[50, 50, 1]}
        >
          <planeGeometry />
          <meshBasicMaterial
            map={causticsTexture2}
            transparent
            opacity={0} // Will be animated by spring
            side={DoubleSide}
            depthWrite={false}
            blending={NormalBlending}
          />
        </mesh>
      </group>
    </Hud>
  )
}

useTexture.preload('/sprites/caustics.png')
