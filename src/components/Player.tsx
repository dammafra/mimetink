import { useFrame } from '@react-three/fiber'
import { useController, useGameStore } from '@stores'
import { useMemo, useRef } from 'react'
import { Group } from 'three'
import { Grid } from '../logic/Grid'
import { levels } from '../logic/levels'
import { Player as PlayerLogic } from '../logic/Player'
import { Controller } from './Controller'

export function Player() {
  const radius = 0.5
  const { up, down, left, right } = useController()
  const playerColor = useGameStore(state => state.playerColor)
  const onPlayerMove = useGameStore(state => state.onPlayerMove)

  const ref = useRef<Group>(null)

  const playerLogic = useMemo(() => {
    const grid = new Grid(levels[0])
    return new PlayerLogic(grid)
  }, [])

  /* Store previous position to detect changes */
  const prevPos = useRef({ col: playerLogic.col, row: playerLogic.row })

  useFrame((_, delta) => {
    if (!ref.current) return

    const position = ref.current.position

    const target = playerLogic.targetPosition
    const step = 20 * delta
    if (position.distanceTo(target) > 0.01) {
      position.lerp(target, step)
      return
    }

    position.copy(target)

    if (up) playerLogic.move('up')
    else if (down) playerLogic.move('down')
    else if (left) playerLogic.move('left')
    else if (right) playerLogic.move('right')

    /* Check for position change to trigger interaction */
    if (prevPos.current.col !== playerLogic.col || prevPos.current.row !== playerLogic.row) {
      onPlayerMove(playerLogic.col, playerLogic.row)
      prevPos.current = { col: playerLogic.col, row: playerLogic.row }
    }
  })

  return (
    <Controller>
      <group ref={ref}>
        <mesh castShadow position-y={radius}>
          <icosahedronGeometry args={[radius, 3]} />
          <meshMatcapMaterial color={playerColor} />
        </mesh>

        {Array.from({ length: 8 }, (_, i) => {
          const angle = Math.PI * 2 * (i / 8)
          return (
            <mesh
              key={`tentacle-${i}`}
              castShadow
              position={[Math.sin(angle) * radius, 0.225, Math.cos(angle) * radius]}
            >
              <icosahedronGeometry args={[radius * 0.45, 3]} />
              <meshMatcapMaterial color={playerColor} />
            </mesh>
          )
        })}

        {Array.from({ length: 2 }, (_, i) => {
          return [
            <mesh key={`eye-${i}`} position={[0.2 * (i ? 1 : -1), 0.8, 0.4]}>
              <icosahedronGeometry args={[radius * 0.25, 3]} />
              <meshBasicMaterial color="white" />
            </mesh>,
            <mesh key={`pupil-${i}`} position={[0.2 * (i ? 1 : -1), 0.85, 0.45]}>
              <icosahedronGeometry args={[radius * 0.2, 3]} />
              <meshBasicMaterial color="black" />
            </mesh>,
          ]
        })}
      </group>
    </Controller>
  )
}
