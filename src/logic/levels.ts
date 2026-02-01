import { BlockType } from '../constants/game'

export type LevelConfig = {
  grid: BlockType[][]
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

export const levels: LevelConfig[] = [level1]
