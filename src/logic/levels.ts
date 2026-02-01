import { BlockType } from '../constants/game'

export type GridCell =
  | BlockType
  | { type: BlockType; color?: string; moves?: number; isMimetic?: boolean }

export type LevelConfig = {
  grid: GridCell[][]
  maxMoves?: number
  hasCollectible?: boolean
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
      BlockType.MimeticBlock,
      { type: BlockType.DeadCoral, isMimetic: true },
      BlockType.MimeticBlock,
      BlockType.EnemyBlock,
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
      BlockType.CollectibleBlock,
      BlockType.Sand,
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Empty,
    ],
    [
      BlockType.Empty,
      BlockType.EnemyBlock,
      BlockType.MimeticBlock,
      BlockType.MimeticBlock,
      BlockType.MimeticBlock,
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
      BlockType.MimeticBlock,
      BlockType.Sand,
      BlockType.Empty,
      BlockType.Empty,
    ],
    [
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Sand,
      BlockType.Sand,
      BlockType.MimeticBlock,
      BlockType.DeadCoral,
      BlockType.Empty,
      BlockType.Empty,
    ],
    [
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Sand,
      BlockType.MimeticBlock,
      BlockType.Sand,
      BlockType.Empty,
      BlockType.Empty,
    ],
    [
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Empty,
      BlockType.EnemyBlock,
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Empty,
    ],
  ],
  maxMoves: 18,
  hasCollectible: true,
}

const level5: LevelConfig = {
  grid: [
    [
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Empty,
      BlockType.EnemyBlock,
      BlockType.Empty,
      BlockType.Empty,
    ],
    [
      BlockType.Start,
      BlockType.Sand,
      BlockType.Sand,
      BlockType.MimeticBlock,
      BlockType.Empty,
      BlockType.Empty,
    ],
    [
      BlockType.Sand,
      BlockType.Sand,
      { type: BlockType.VitalCoral, moves: 5 },
      BlockType.MimeticBlock,
      BlockType.Sand,
      BlockType.Sand,
    ],
    [
      BlockType.Sand,
      BlockType.Empty,
      BlockType.Empty,
      BlockType.MimeticBlock,
      BlockType.Empty,
      BlockType.DeadCoral,
    ],
    [
      BlockType.Sand,
      BlockType.EnemyBlock,
      BlockType.MimeticBlock,
      BlockType.MimeticBlock,
      BlockType.MimeticBlock,
      BlockType.CollectibleBlock,
    ],
    [
      BlockType.Sand,
      BlockType.Sand,
      BlockType.Sand,
      BlockType.DeadCoral,
      BlockType.Sand,
      BlockType.Sand,
    ],
    [
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Empty,
      BlockType.Empty,
      BlockType.End,
    ],
  ],
  maxMoves: 22,
  hasCollectible: true,
}

export const levels: LevelConfig[] = [level1, level2, level3, level4, level5]
