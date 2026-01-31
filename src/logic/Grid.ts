import { Vector3 } from 'three'

export const BlockType = {
  Empty: 0,
  Sand: 1,
  Start: 2,
  End: 3,
  VitalCoral: 4,
  DeadCoral: 5,
} as const

export type BlockType = (typeof BlockType)[keyof typeof BlockType]

export const BLOCK_CONFIG = {
  [BlockType.Sand]: { color: '#E6D0B3' },
  [BlockType.Start]: { color: '#E6D0B3' },
  [BlockType.End]: { color: '#333333' },
  [BlockType.VitalCoral]: { color: '#FF6F61' },
  [BlockType.DeadCoral]: { color: '#D3D3D3' },
} as const

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
