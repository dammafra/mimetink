import { BlockType } from '../constants/game'

export type GridCell = BlockType | { type: BlockType; color?: string }

export type LevelConfig = {
  grid: GridCell[][]
  maxMoves: number
}

const level1: LevelConfig = {
  grid: [
    [
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Empty,
      BlockType.DeadCoral,
      BlockType.Sand,
      BlockType.End,
    ],
    [
      BlockType.Start,
      BlockType.Sand,
      BlockType.VitalCoral,
      BlockType.Sand,
      BlockType.Empty,
      BlockType.Empty,
    ],
  ],
  maxMoves: 6,
}

const level2: LevelConfig = {
  grid: [
    [
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Sand,
      BlockType.Sand,
      BlockType.Sand,
      BlockType.Empty,
    ],
    [
      BlockType.Start,
      BlockType.Sand,
      BlockType.Sand,
      BlockType.Empty,
      BlockType.VitalCoral,
      BlockType.Empty,
    ],
    [
      BlockType.Empty,
      BlockType.Empty,
      { type: BlockType.Sand, color: '#FF6F61' },
      BlockType.DeadCoral,
      { type: BlockType.Sand, color: '#FF6F61' },
      { type: BlockType.Sand, color: '#FF6F61' },
    ],
    [
      BlockType.Empty,
      BlockType.Empty,
      BlockType.End,
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Empty,
    ],
  ],
  maxMoves: 12,
}

export const levels: LevelConfig[] = [level1, level2]
