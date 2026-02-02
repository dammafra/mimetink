import { Suspense, useEffect, useMemo } from 'react'
import { levels } from '../logic/levels'
import { BlockType, useGameStore } from '../stores'
import { CollectibleBlock } from './blocks/CollectibleBlock'
import { CoralBlock } from './blocks/CoralBlock'
import { EndBlock } from './blocks/EndBlock'
import { EnemyBlock } from './blocks/EnemyBlock'
import { MimeticBlock } from './blocks/MimeticBlock'
import { SandBlock } from './blocks/SandBlock'

import { StartBlock } from './blocks/StartBlock'
import { Dynamic } from './helpers'

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

  const rows = level.length
  const cols = level[0]?.length || 0 // Handle empty grid
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
        const type = typeof cell === 'object' ? cell.type : cell
        if (type === BlockType.End) {
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
          // Manhattan distance from End block
          const dist =
            Math.abs(rIndex - endBlockPosition.row) + Math.abs(cIndex - endBlockPosition.col)
          return dist * 100 // Wave propagation speed
        }),
      )
    }
    return level.map(row => row.map((_, col) => col * 150))
  }, [level, restartKey, isExiting, endBlockPosition])

  useEffect(() => {
    const maxDelay = cols * 150
    const timer = setTimeout(() => {
      setGridReady(true)
    }, maxDelay + 600) // Max column delay + spring animation duration
    return () => clearTimeout(timer)
  }, [setGridReady, restartKey, cols])

  return (
    <group position-y={-0.4} scale={2}>
      {level.flatMap((cells, row) =>
        cells.map((cell, column) => {
          const type = typeof cell === 'object' ? cell.type : cell
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
