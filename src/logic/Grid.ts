import { Vector3 } from 'three'

import { BlockType, type GridCell } from '@config'

export class Grid {
  rows: number
  cols: number
  centerX: number
  centerZ: number

  config: GridCell[][]

  constructor(config: GridCell[][]) {
    this.config = config
    this.rows = config.length
    this.cols = config[0].length
    this.centerX = (this.cols - 1) / 2
    this.centerZ = (this.rows - 1) / 2
  }

  isWalkable(col: number, row: number, isLevelCompleted: boolean = true): boolean {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return false

    const cell = this.config[row][col]
    const blockType = typeof cell === 'object' ? cell.type : cell

    if (blockType === BlockType.Empty) return false
    if (blockType === BlockType.End && !isLevelCompleted) return false

    return true
  }

  getWorldPosition(col: number, row: number): Vector3 {
    return new Vector3((col - this.centerX) * 2, 0, (row - this.centerZ) * 2)
  }

  getInitialPosition() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.config[row][col] === BlockType.Start) {
          return { col, row }
        }
      }
    }
    return { col: 0, row: 0 }
  }
}
