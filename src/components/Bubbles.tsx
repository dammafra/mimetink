import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import { AdditiveBlending, DoubleSide, InstancedMesh, MathUtils, Object3D } from 'three'

interface BubbleProps {
  count?: number
  speed?: number
}

export function Bubbles({ count = 30, speed = 1 }: BubbleProps) {
  const mesh = useRef<InstancedMesh>(null!)
  const texture = useTexture('/sprites/bubble.png')

  const dummy = useMemo(() => new Object3D(), [])

  // Generiamo i dati iniziali
  const [particles] = useState(() =>
    Array.from({ length: count }, () => {
      return {
        // Posizione iniziale sparsa (adattata al HUD)
        x: MathUtils.randFloatSpread(15),
        y: -10,
        z: MathUtils.randFloatSpread(10), // Tra -5 e 5

        // VELOCITÀ RIDOTTA:
        // Molto più lente per l'effetto "floating" (tra 0.1 e 0.4 unità/sec)
        velocity: MathUtils.randFloat(0.1, 0.4) * speed,

        // DIMENSIONI VARIABILI:
        // Più piccole e variegate (da 0.2 a 0.8)
        scale: MathUtils.randFloat(0.2, 0.8),

        // FLOATING:
        // Parametri per l'oscillazione laterale
        phase: Math.random() * Math.PI * 2,
        frequency: Math.random() * 0.2 + 0.1, // Frequenza bassa = oscillazione lenta
        amplitude: Math.random() * 1.5 + 0.5, // Ampiezza maggiore = movimento laterale più visibile
      }
    }),
  )

  useFrame((state, delta) => {
    if (!mesh.current) return

    const t = state.clock.getElapsedTime()
    const cameraQuaternion = state.camera.quaternion

    particles.forEach((particle, i) => {
      // 1. Movimento verso l'alto (Lento)
      particle.y += particle.velocity * delta

      // 2. Reset quando escono in alto (Range ridotto per HUD)
      if (particle.y > 20) {
        particle.x = MathUtils.randFloatSpread(15)
        particle.y = MathUtils.randFloat(-20, -10)
        particle.z = MathUtils.randFloatSpread(10)
      }

      // 3. Calcolo del "Floating" (Sway)
      // Usiamo il seno per un movimento dolce destra/sinistra
      const xOffset = Math.sin(t * particle.frequency + particle.phase) * particle.amplitude

      // 4. Aggiorna posizione
      dummy.position.set(particle.x + xOffset, particle.y, particle.z)

      // 5. BILLBOARDING: Copia la rotazione della camera
      // Così le bolle "guardano" sempre l'utente
      dummy.quaternion.copy(cameraQuaternion)

      // 6. Scala
      dummy.scale.set(particle.scale, particle.scale, particle.scale)

      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })

    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
      {/* Geometria base (1x1), la dimensione reale è controllata da dummy.scale */}
      <planeGeometry />
      <meshBasicMaterial
        map={texture}
        alphaMap={texture}
        transparent
        depthWrite={false} // Evita artefatti visivi sui bordi
        blending={AdditiveBlending} // Effetto luminoso/vetroso
        side={DoubleSide}
        color="#aabbff"
        opacity={0.6} // Leggermente più trasparenti
      />
    </instancedMesh>
  )
}

useTexture.preload('/sprites/bubble.png')
