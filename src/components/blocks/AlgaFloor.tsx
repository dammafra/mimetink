import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber' // Importa useFrame
import { useEffect, useRef } from 'react' // Importa useRef
import {
  DoubleSide,
  MathUtils,
  Mesh, // Importa tipo Mesh
  MeshBasicMaterial,
  PlaneGeometry,
  SRGBColorSpace,
  type ColorRepresentation,
} from 'three'

interface AlgaFloorProps {
  color: ColorRepresentation
}

export function AlgaFloor({ color }: AlgaFloorProps) {
  const algaSprite = useTexture('/sprites/alga.png')

  useEffect(() => {
    algaSprite.colorSpace = SRGBColorSpace
    algaSprite.needsUpdate = true
  }, [algaSprite])

  // 1. Creiamo un array di riferimenti per accedere alle mesh
  const meshesRef = useRef<Mesh[]>([])

  const geometry = new PlaneGeometry()
  const material = new MeshBasicMaterial({
    map: algaSprite,
    transparent: true,
    color: color,
    side: DoubleSide,
    depthWrite: false,
  })

  // 2. Logica di animazione
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    meshesRef.current.forEach((mesh, i) => {
      if (!mesh) return

      // Parametri per l'animazione
      const speed = 2 // Velocità dell'ondeggiamento
      const amplitude = 0.01 // Ampiezza del movimento

      // Alterna la direzione: se l'indice è pari va in una direzione, se dispari nell'altra
      const direction = i % 2 === 0 ? 1 : -1

      // Applica il movimento sull'asse X
      mesh.position.x = Math.sin(time * speed) * amplitude * direction
    })
  })

  // Configurazione dei 5 strati (per pulire il JSX e assegnare le ref facilmente)
  const layers = [
    { z: -0.3, flipped: false },
    { z: -0.15, flipped: true },
    { z: 0, flipped: false },
    { z: 0.15, flipped: true },
    { z: 0.3, flipped: false },
  ]

  return (
    <group scale={[0.9, 0.4, 0.8]} position-y={0.3}>
      {layers.map((layer, index) => (
        <mesh
          key={index}
          // 3. Assegna ogni mesh all'array di ref
          ref={el => {
            if (el) meshesRef.current[index] = el
          }}
          material={material}
          geometry={geometry}
          position-z={layer.z}
          // Manteniamo la logica di rotazione originale
          rotation={
            layer.flipped
              ? [MathUtils.degToRad(-35), MathUtils.degToRad(180), 0]
              : [MathUtils.degToRad(-35), 0, 0] // Semplificato rotation-x in array Euler
          }
        />
      ))}
    </group>
  )
}

useTexture.preload('/sprites/alga.png')
