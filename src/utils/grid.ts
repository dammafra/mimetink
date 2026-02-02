import { BlockType, type GridCell } from '@config'

/**
 * Extracts the block type from a GridCell, handling both simple types and object cells
 */
export function getBlockType(cell: GridCell): BlockType {
  return typeof cell === 'object' ? cell.type : cell
}

/**
 * Checks if a level is completed (no DeadCoral blocks remaining)
 */
export function checkLevelCompletion(grid: GridCell[][]): boolean {
  return !grid.some(row => row.some(cell => getBlockType(cell) === BlockType.DeadCoral))
}

/**
 * Finds the initial player position (Start block) in a grid
 */
export function findStartPosition(grid: GridCell[][]): { col: number; row: number } {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col]
      const type = getBlockType(cell)
      if (type === BlockType.Start) {
        return { col, row }
      }
    }
  }
  return { col: 0, row: 0 }
}

/**
 * Calculates grid dimensions from a grid
 */
export function getGridDimensions(grid: GridCell[][]): { rows: number; cols: number } {
  return {
    rows: grid.length,
    cols: grid[0]?.length || 0,
  }
}
