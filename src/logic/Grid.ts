import { Vector3 } from 'three'

export const GRID_CONFIG = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
]

export class Grid {
  rows: number
  cols: number
  centerX: number
  centerZ: number

  config: number[][]

  constructor(config: any[][] = GRID_CONFIG) {
    this.config = config
    this.rows = config.length
    this.cols = config[0].length
    this.centerX = (this.cols - 1) / 2
    this.centerZ = (this.rows - 1) / 2
  }

  isWalkable(col: number, row: number): boolean {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols && this.config[row][col] === 1
  }

  getWorldPosition(col: number, row: number): Vector3 {
    return new Vector3((col - this.centerX) * 2, 0, (row - this.centerZ) * 2)
  }

  getInitialPosition() {
    return { col: 0, row: 0 }
  }
}
