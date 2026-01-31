import { BlockType } from '../logic/Grid'
import { useGameStore } from '../stores'
import { DeadCoralBlock } from './blocks/DeadCoralBlock'
import { EndBlock } from './blocks/EndBlock'
import { SandBlock } from './blocks/SandBlock'
import { VitalCoralBlock } from './blocks/VitalCoralBlock'

import { Dynamic } from './helpers'

export function Grid() {
  const level = useGameStore(state => state.grid)

  if (!level) return null // Handle potential undefined state

  const rows = level.length
  const cols = level[0]?.length || 0 // Handle empty grid
  const centerX = (cols - 1) / 2
  const centerZ = (rows - 1) / 2

  const componentsMap = {
    [BlockType.Sand]: SandBlock,
    [BlockType.Start]: SandBlock,
    [BlockType.End]: EndBlock,
    [BlockType.VitalCoral]: VitalCoralBlock,
    [BlockType.DeadCoral]: DeadCoralBlock,
    [BlockType.ActivatedDeadCoral]: DeadCoralBlock,
  }

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
              />
            ),
        ),
      )}
    </group>
  )
}
