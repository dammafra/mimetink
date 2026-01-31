import { animated, useSpring } from '@react-spring/three'
import { Billboard } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { GameStatus, useController, useGameStore } from '@stores'
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { Group } from 'three'
import { Grid } from '../logic/Grid'
import { Player as PlayerLogic } from '../logic/Player'
import { Controller } from './Controller'
import { SpriteAnimator } from './helpers'

export function Player() {
  const { up, down, left, right } = useController()
  const playerColor = useGameStore(state => state.playerColor)
  const onPlayerMove = useGameStore(state => state.onPlayerMove)
  const isLevelCompleted = useGameStore(state => state.isLevelCompleted)
  const gridState = useGameStore(state => state.grid)
  const status = useGameStore(state => state.status)
  const isGridReady = useGameStore(state => state.isGridReady)
  const restartKey = useGameStore(state => state.restartKey)

  const ref = useRef<Group>(null)

  const playerLogic = useMemo(() => {
    const grid = new Grid(gridState)
    return new PlayerLogic(grid)
  }, [restartKey]) // Re-init logic on restart

  const spawnDelay = useMemo(() => {
    // We only care about the INITIAL position's delay
    const { col } = playerLogic
    return col * 150
  }, [playerLogic])

  const isCompleted = status === GameStatus.COMPLETED

  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: isCompleted ? 0 : 1 },
    delay: isCompleted ? 500 : spawnDelay,
    config: isCompleted
      ? { mass: 1, tension: 40, friction: 25 } // Slow scale down
      : { mass: 1, tension: 280, friction: 20 },
    key: restartKey,
  })

  // Handle Level Restart
  useLayoutEffect(() => {
    playerLogic.reset()
    if (ref.current) {
      ref.current.position.copy(playerLogic.targetPosition)
    }
    prevPos.current = { col: playerLogic.col, row: playerLogic.row }
  }, [restartKey, playerLogic])

  // Sync logic grid with store grid
  useEffect(() => {
    playerLogic.grid.config = gridState
  }, [gridState, playerLogic])

  /* Store previous position to detect changes */
  const prevPos = useRef({ col: playerLogic.col, row: playerLogic.row })

  useFrame((_, delta) => {
    if (!ref.current || status === GameStatus.READY || !isGridReady) return

    const position = ref.current.position

    const target = playerLogic.targetPosition
    const step = 20 * delta
    if (position.distanceTo(target) > 0.01) {
      position.lerp(target, step)
      return
    }

    position.copy(target)

    if (up) playerLogic.move('up', isLevelCompleted)
    else if (down) playerLogic.move('down', isLevelCompleted)
    else if (left) playerLogic.move('left', isLevelCompleted)
    else if (right) playerLogic.move('right', isLevelCompleted)

    /* Check for position change to trigger interaction */
    if (prevPos.current.col !== playerLogic.col || prevPos.current.row !== playerLogic.row) {
      onPlayerMove(playerLogic.col, playerLogic.row)
      prevPos.current = { col: playerLogic.col, row: playerLogic.row }
    }
  })

  if (status === GameStatus.READY) return null

  return (
    <Controller>
      <animated.group ref={ref} scale={scale}>
        <Billboard position={[-0.1, 1, 0.25]}>
          <SpriteAnimator
            scale={2}
            color={playerColor}
            paths={[
              '/sprites/octopus/down/01.png',
              '/sprites/octopus/down/02.png',
              '/sprites/octopus/down/03.png',
              '/sprites/octopus/down/04.png',
              '/sprites/octopus/down/05.png',
              '/sprites/octopus/down/06.png',
              '/sprites/octopus/down/07.png',
              '/sprites/octopus/down/08.png',
              '/sprites/octopus/down/09.png',
              '/sprites/octopus/down/10.png',
            ]}
          />
        </Billboard>
      </animated.group>
    </Controller>
  )
}
