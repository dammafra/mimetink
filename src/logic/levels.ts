import { BlockType } from '../constants/game'

type LevelConfig = BlockType[][]

const level1: LevelConfig = [
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
]

export const levels: LevelConfig[] = [level1]
