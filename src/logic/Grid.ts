import { Vector3 } from 'three'
import { BlockType } from '../constants/game'

export class Grid {
  rows: number
  cols: number
  centerX: number
  centerZ: number

  config: BlockType[][]

  constructor(config: BlockType[][]) {
    this.config = config
    this.rows = config.length
    this.cols = config[0].length
    this.centerX = (this.cols - 1) / 2
    this.centerZ = (this.rows - 1) / 2
  }

  isWalkable(col: number, row: number, isCompleted: boolean = false): boolean {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return false

    const blockType = this.config[row][col]
    if (blockType === BlockType.Empty) return false

    // EndBlock is only walkable if the level is completed
    if (blockType === BlockType.End && !isCompleted) return false

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
