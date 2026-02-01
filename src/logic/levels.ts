import { BlockType } from '../constants/game'

export type GridCell =
  | BlockType
  | { type: BlockType; color?: string; moves?: number; isMimetic?: boolean }

export type TutorialStep = {
  message: string
  visibleBlocks?: { row: number; col: number }[]
}

export type LevelConfig = {
  grid: GridCell[][]
  maxMoves?: number
  hasCollectible?: boolean
  tutorialSteps?: TutorialStep[]
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
  tutorialSteps: [
    {
      message: "Hi! I'm Vincent van Polp. I'll guide you through the reef!",
      visibleBlocks: [{ row: 1, col: 0 }],
    },
    {
      message: "See that gray coral? It's dead. We need to help it thrive again!",
      visibleBlocks: [
        { row: 1, col: 0 },
        { row: 0, col: 3 },
      ],
    },
    {
      message: 'This red one is a living coral. Touch it to collect algal symbionts!',
      visibleBlocks: [
        { row: 1, col: 0 },
        { row: 0, col: 3 },
        { row: 1, col: 2 },
      ],
    },
    {
      message:
        'Once you have the symbionts, bring them to the dead coral to restore the reef life.',
      visibleBlocks: [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 1, col: 3 },
        { row: 0, col: 3 },
        { row: 0, col: 4 },
      ],
    },
    {
      message: "Restore this coral, then let's go find more to save",
    },
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
