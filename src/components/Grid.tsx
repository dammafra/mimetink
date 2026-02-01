import { useEffect, useMemo } from 'react'
import { BlockType, useGameStore } from '../stores'
import { CoralBlock } from './blocks/CoralBlock'
import { EndBlock } from './blocks/EndBlock'
import { SandBlock } from './blocks/SandBlock'

import { Dynamic } from './helpers'

export function Grid() {
  const level = useGameStore(state => state.grid)
  const setGridReady = useGameStore(state => state.setGridReady)
  const restartKey = useGameStore(state => state.restartKey)

  const rows = level.length
  const cols = level[0]?.length || 0 // Handle empty grid
  const centerX = (cols - 1) / 2
  const centerZ = (rows - 1) / 2

  const componentsMap = {
    [BlockType.Sand]: SandBlock,
    [BlockType.Start]: SandBlock,
    [BlockType.End]: EndBlock,
    [BlockType.VitalCoral]: CoralBlock,
    [BlockType.DeadCoral]: CoralBlock,
    [BlockType.ActivatedDeadCoral]: CoralBlock,
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
        cells.map(
          (blockType, column) =>
            blockType !== BlockType.Empty && (
              <Dynamic
                component={componentsMap[blockType]}
                blockType={blockType}
                key={`cell-${row}-${column}`}
                position={[column - centerX, 0, row - centerZ] as [number, number, number]}
                delay={delays[row][column]}
              />
            ),
        ),
      )}
    </group>
  )
}
