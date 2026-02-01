import { useEffect, useMemo } from 'react'
import { levels } from '../logic/levels'
import { BlockType, useGameStore } from '../stores'
import { CollectibleBlock } from './blocks/CollectibleBlock'
import { CoralBlock } from './blocks/CoralBlock'
import { EndBlock } from './blocks/EndBlock'
import { EnemyBlock } from './blocks/EnemyBlock'
import { MimeticBlock } from './blocks/MimeticBlock'
import { SandBlock } from './blocks/SandBlock'

import { Dynamic } from './helpers'

export function Grid() {
  const level = useGameStore(state => state.grid)
  const setGridReady = useGameStore(state => state.setGridReady)
  const restartKey = useGameStore(state => state.restartKey)
  const currentLevelIndex = useGameStore(state => state.currentLevelIndex)
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

  const componentsMap = {
    [BlockType.Sand]: SandBlock,
    [BlockType.Start]: SandBlock,
    [BlockType.End]: EndBlock,
    [BlockType.VitalCoral]: CoralBlock,
    [BlockType.DeadCoral]: CoralBlock,
    [BlockType.ActivatedDeadCoral]: CoralBlock,
    [BlockType.MimeticBlock]: MimeticBlock,
    [BlockType.EnemyBlock]: EnemyBlock,
    [BlockType.CollectibleBlock]: CollectibleBlock,
  }

  const delays = useMemo(() => {
    return level.map(row => row.map((_, col) => col * 150))
  }, [level, restartKey])

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
              <Dynamic
                component={componentsMap[type]}
                blockType={type}
                key={`level-${currentLevelIndex}-cell-${row}-${column}`}
                position={[column - centerX, 0, row - centerZ] as [number, number, number]}
                delay={delays[row][column]}
                {...cellProps}
              />
            )
          )
        }),
      )}
    </group>
  )
}
