import { Vector3 } from 'three'
import { Grid } from './Grid'

export class Player {
  col: number
  row: number
  targetPosition: Vector3

  grid: Grid

  constructor(grid: Grid) {
    this.grid = grid
    const { col, row } = grid.getInitialPosition()
    this.col = col
    this.row = row
    this.targetPosition = grid.getWorldPosition(col, row)
  }

  move(direction: 'up' | 'down' | 'left' | 'right', isLevelCompleted: boolean) {
    let newCol = this.col
    let newRow = this.row

    if (direction === 'up') newRow -= 1
    if (direction === 'down') newRow += 1
    if (direction === 'left') newCol -= 1
    if (direction === 'right') newCol += 1

    if (this.grid.isWalkable(newCol, newRow, isLevelCompleted)) {
      this.col = newCol
      this.row = newRow
      this.targetPosition.copy(this.grid.getWorldPosition(newCol, newRow))
    }
  }

  reset() {
    const { col, row } = this.grid.getInitialPosition()
    this.col = col
    this.row = row
    this.targetPosition.copy(this.grid.getWorldPosition(col, row))
  }
}
