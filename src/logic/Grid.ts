import { Vector3 } from 'three'

import { BlockType, GRID_CONFIG, type GridCell } from '@config'
import { findStartPosition, getBlockType } from '@utils'

export class Grid {
  rows: number
  cols: number
  centerX: number
  centerZ: number

  config: GridCell[][]

  constructor(config: GridCell[][]) {
    this.config = config
    this.rows = config.length
    this.cols = config[0]?.length || 0
    this.centerX = (this.cols - 1) / 2
    this.centerZ = (this.rows - 1) / 2
  }

  isWalkable(col: number, row: number, isLevelCompleted: boolean = true): boolean {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return false

    const cell = this.config[row][col]
    const blockType = getBlockType(cell)

    if (blockType === BlockType.Empty) return false
    if (blockType === BlockType.End && !isLevelCompleted) return false

    return true
  }

  getWorldPosition(col: number, row: number): Vector3 {
    return new Vector3(
      (col - this.centerX) * GRID_CONFIG.BLOCK_SPACING,
      0,
      (row - this.centerZ) * GRID_CONFIG.BLOCK_SPACING,
    )
  }

  getInitialPosition() {
    return findStartPosition(this.config)
  }
}
