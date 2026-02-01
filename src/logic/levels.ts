import { BlockType } from '../constants/game'

export type GridCell = BlockType | { type: BlockType; color?: string; moves?: number }

export type LevelConfig = {
  grid: GridCell[][]
  maxMoves?: number
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
      BlockType.Empty,
    ],
    [
      BlockType.Start,
      BlockType.Sand,
      { type: BlockType.VitalCoral, moves: 3 },
      BlockType.Empty,
      BlockType.Sand,
      BlockType.Empty,
      BlockType.Empty,
    ],
    [
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Sand,
      BlockType.Sand,
      BlockType.DeadCoral,
      BlockType.Sand,
      BlockType.End,
    ],
  ],
}

const level3: LevelConfig = {
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
      { type: BlockType.VitalCoral, moves: 3 },
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
}

const level4: LevelConfig = {
  grid: [
    [
      BlockType.Empty,
      BlockType.Empty,
      BlockType.DeadCoral,
      BlockType.Sand,
      BlockType.Sand,
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Empty,
    ],
    [
      BlockType.Empty,
      { type: BlockType.Sand, color: '#FF6F61' },
      { type: BlockType.Sand, color: '#FF6F61' },
      { type: BlockType.Sand, color: '#FF6F61' },
      { type: BlockType.Sand, color: '#FF6F61' },
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Empty,
    ],
    [
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Sand,
      BlockType.Sand,
      BlockType.Sand,
      BlockType.Sand,
      BlockType.Sand,
      BlockType.End,
    ],
    [
      BlockType.Start,
      BlockType.Sand,
      { type: BlockType.VitalCoral, moves: 5 },
      BlockType.Sand,
      { type: BlockType.Sand, color: '#FF6F61' },
      BlockType.Sand,
      BlockType.Empty,
      BlockType.Empty,
    ],
    [
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Sand,
      BlockType.Sand,
      { type: BlockType.Sand, color: '#FF6F61' },
      BlockType.DeadCoral,
      BlockType.Empty,
      BlockType.Empty,
    ],
    [
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Sand,
      { type: BlockType.Sand, color: '#FF6F61' },
      BlockType.Sand,
      BlockType.Empty,
      BlockType.Empty,
    ],
    [
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Empty,
      { type: BlockType.Sand, color: '#FF6F61' },
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Empty,
    ],
  ],
  maxMoves: 20,
}

export const levels: LevelConfig[] = [level1, level2, level3, level4]
