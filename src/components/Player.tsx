import { animated, useSpring } from '@react-spring/three'
import { Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { MathUtils, type Group } from 'three'

import { Controller, SpriteAnimator } from '@components/helpers'
import { GameStatus } from '@config'
import { Grid, Player as PlayerLogic } from '@logic'
import { useController, useGameStore, useSoundBoard } from '@stores'

const OCTOPUS_SPRITES = [
  '/sprites/octopus/01.png',
  '/sprites/octopus/02.png',
  '/sprites/octopus/03.png',
  '/sprites/octopus/04.png',
  '/sprites/octopus/05.png',
  '/sprites/octopus/06.png',
  '/sprites/octopus/07.png',
  '/sprites/octopus/08.png',
  '/sprites/octopus/09.png',
  '/sprites/octopus/10.png',
]

const EYE_SPRITES = [
  '/sprites/octopus/eyes/01.png',
  '/sprites/octopus/eyes/02.png',
  '/sprites/octopus/eyes/03.png',
  '/sprites/octopus/eyes/04.png',
  '/sprites/octopus/eyes/05.png',
  '/sprites/octopus/eyes/06.png',
  '/sprites/octopus/eyes/07.png',
  '/sprites/octopus/eyes/08.png',
  '/sprites/octopus/eyes/09.png',
  '/sprites/octopus/eyes/10.png',
]

export function Player() {
  const { up, down, left, right } = useController()
  const playerColor = useGameStore(state => state.playerColor)
  const onPlayerMove = useGameStore(state => state.onPlayerMove)
  const gridState = useGameStore(state => state.grid)
  const status = useGameStore(state => state.status)
  const vitalMovesLeft = useGameStore(state => state.vitalMovesLeft)
  const isGridReady = useGameStore(state => state.isGridReady)
  const showTutorial = useGameStore(state => state.showTutorial)
  const restartKey = useGameStore(state => state.restartKey)
  const isLevelCompleted = useGameStore(state => state.isLevelCompleted)
  const sounds = useSoundBoard(state => state.sounds)

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

  // Track scale value to hide sparkles during animation
  const [isScaledIn, setIsScaledIn] = useState(false)

  // Handle Level Restart
  useLayoutEffect(() => {
    playerLogic.reset()
    if (ref.current) {
      ref.current.position.copy(playerLogic.targetPosition)
    }
    prevPos.current = { col: playerLogic.col, row: playerLogic.row }
    setIsScaledIn(false) // Reset when restarting
  }, [restartKey, playerLogic])

  // Sync logic grid with store grid
  useEffect(() => {
    playerLogic.grid.config = gridState
  }, [gridState, playerLogic])

  /* Store previous position to detect changes */
  const prevPos = useRef({ col: playerLogic.col, row: playerLogic.row })

  useFrame((_, delta) => {
    // Track scale to hide sparkles during animation
    if (ref.current) {
      const currentScale = ref.current.scale.x
      setIsScaledIn(currentScale > 0.95)
    }

    if (!ref.current || status === GameStatus.READY || !isGridReady || showTutorial) return

    const position = ref.current.position

    const target = playerLogic.targetPosition
    const step = 20 * delta
    if (position.distanceTo(target) > 0.01) {
      position.lerp(target, step)
      return
    }

    position.copy(target)

    const canMove = status === GameStatus.PLAYING

    if (canMove) {
      if (up) playerLogic.move('up', isLevelCompleted)
      else if (down) playerLogic.move('down', isLevelCompleted)
      else if (left) playerLogic.move('left', isLevelCompleted)
      else if (right) playerLogic.move('right', isLevelCompleted)
    }

    /* Check for position change to trigger interaction */
    if (prevPos.current.col !== playerLogic.col || prevPos.current.row !== playerLogic.row) {
      if (sounds?.move) sounds.move.play()
      onPlayerMove(playerLogic.col, playerLogic.row)
      prevPos.current = { col: playerLogic.col, row: playerLogic.row }
    }
  })

  return (
    <Controller>
      <animated.group ref={ref} scale={scale}>
        {vitalMovesLeft !== 0 && isScaledIn && (
          <group renderOrder={2}>
            <Sparkles color={playerColor} size={30} count={10} position-y={1} position-x={-0.25} />
          </group>
        )}
        <SpriteAnimator
          rotation={[MathUtils.degToRad(-35), 0, 0]}
          position-y={0.8}
          position-z={-0.2}
          scale={2}
          color={playerColor}
          paths={OCTOPUS_SPRITES}
        />
        <SpriteAnimator
          rotation={[MathUtils.degToRad(-35), 0, 0]}
          position-y={0.8}
          position-z={-0.19}
          scale={2}
          paths={EYE_SPRITES}
        />
      </animated.group>
    </Controller>
  )
}
