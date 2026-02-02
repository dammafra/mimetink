import { Suspense, useEffect, useMemo } from 'react'

import {
  CollectibleBlock,
  CoralBlock,
  EndBlock,
  EnemyBlock,
  MimeticBlock,
  SandBlock,
  StartBlock,
} from '@components/blocks'
import { Dynamic } from '@components/helpers'
import { ANIMATION_DELAYS, BlockType, levels } from '@config'
import { getBlockType, getGridDimensions } from '@utils'
import { useGameStore } from '@stores'

const componentsMap = {
  [BlockType.Sand]: SandBlock,
  [BlockType.Start]: StartBlock,
  [BlockType.End]: EndBlock,
  [BlockType.VitalCoral]: CoralBlock,
  [BlockType.DeadCoral]: CoralBlock,
  [BlockType.ActivatedDeadCoral]: CoralBlock,
  [BlockType.MimeticBlock]: MimeticBlock,
  [BlockType.EnemyBlock]: EnemyBlock,
  [BlockType.CollectibleBlock]: CollectibleBlock,
}

export function Grid() {
  const level = useGameStore(state => state.grid)
  const setGridReady = useGameStore(state => state.setGridReady)
  const restartKey = useGameStore(state => state.restartKey)
  const currentLevelIndex = useGameStore(state => state.currentLevelIndex)
  const isExiting = useGameStore(state => state.isExiting)
  const currentTutorialStep = useGameStore(state => state.currentTutorialStep)
  const showTutorial = useGameStore(state => state.showTutorial)

  const { rows, cols } = getGridDimensions(level)
  const centerX = (cols - 1) / 2
  const centerZ = (rows - 1) / 2

  const visibleBlocks = useMemo(() => {
    if (!showTutorial || currentTutorialStep === null) return null
    const levelConfig = levels[currentLevelIndex]
    const step = levelConfig.tutorialSteps?.[currentTutorialStep]
    return step?.visibleBlocks || null
  }, [showTutorial, currentTutorialStep, currentLevelIndex])

  // Find End block for exit animation
  const endBlockPosition = useMemo(() => {
    let pos = { row: 0, col: 0 }
    level.forEach((row, rIndex) => {
      row.forEach((cell, cIndex) => {
        if (getBlockType(cell) === BlockType.End) {
          pos = { row: rIndex, col: cIndex }
        }
      })
    })
    return pos
  }, [level])

  const delays = useMemo(() => {
    if (isExiting) {
      return level.map((row, rIndex) =>
        row.map((_, cIndex) => {
          const dist =
            Math.abs(rIndex - endBlockPosition.row) + Math.abs(cIndex - endBlockPosition.col)
          return dist * ANIMATION_DELAYS.LEVEL_EXIT_PER_DISTANCE
        }),
      )
    }
    return level.map(row => row.map((_, col) => col * ANIMATION_DELAYS.BLOCK_SPAWN_PER_COLUMN))
  }, [level, restartKey, isExiting, endBlockPosition])

  useEffect(() => {
    const maxDelay = cols * ANIMATION_DELAYS.BLOCK_SPAWN_PER_COLUMN
    const timer = setTimeout(() => {
      setGridReady(true)
    }, maxDelay + ANIMATION_DELAYS.GRID_READY_BUFFER)
    return () => clearTimeout(timer)
  }, [setGridReady, restartKey, cols])

  return (
    <group position-y={-0.4} scale={2}>
      {level.flatMap((cells, row) =>
        cells.map((cell, column) => {
          const type = getBlockType(cell)
          const cellProps = typeof cell === 'object' ? cell : {}

          const isVisible =
            !visibleBlocks || visibleBlocks.some(vb => vb.row === row && vb.col === column)

          return (
            type !== BlockType.Empty &&
            isVisible && (
              <Suspense key={`level-${currentLevelIndex}-cell-${row}-${column}`}>
                <Dynamic
                  component={componentsMap[type]}
                  blockType={type}
                  position={[column - centerX, 0, row - centerZ] as [number, number, number]}
                  delay={delays[row][column]}
                  isExiting={isExiting}
                  col={column}
                  row={row}
                  {...cellProps}
                />
              </Suspense>
            )
          )
        }),
      )}
    </group>
  )
}
