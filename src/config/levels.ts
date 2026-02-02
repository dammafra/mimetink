import { BlockType } from './game'

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
      message: "See that gray coral? It's dead and we need to help it thrive again!",
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
      message: "Restore this coral, then let's go find more to save!",
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
  tutorialSteps: [
    {
      message: 'Some corals have limited symbiotic algae. The bubble shows how many moves I get!',
      visibleBlocks: [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
      ],
    },
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
  tutorialSteps: [
    {
      message: 'Watch out for crabs! They are dangerous enemies.',
      visibleBlocks: [
        { row: 1, col: 0 },
        { row: 2, col: 5 },
      ],
    },
    {
      message:
        'With the right colored symbiotic algae, I can camouflage myself and pass unnoticed.',
      visibleBlocks: [
        { row: 1, col: 0 },
        { row: 2, col: 5 },
        { row: 1, col: 4 },
        { row: 2, col: 2 },
        { row: 2, col: 3 },
        { row: 2, col: 4 },
      ],
    },
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

// const level6: LevelConfig = {
//   grid: [
//     [
//       BlockType.Empty,
//       BlockType.Empty,
//       BlockType.Empty,
//       BlockType.Empty,
//       BlockType.Empty,
//       BlockType.Empty,
//       BlockType.Empty,
//       BlockType.End,
//     ],
//     [
//       BlockType.Empty,
//       BlockType.EnemyBlock,
//       BlockType.EnemyBlock,
//       BlockType.EnemyBlock,
//       BlockType.EnemyBlock,
//       BlockType.EnemyBlock,
//       BlockType.EnemyBlock,
//       BlockType.Sand,
//     ],
//     [
//       BlockType.Empty,
//       BlockType.EnemyBlock,
//       BlockType.DeadCoral,
//       BlockType.MimeticBlock,
//       BlockType.MimeticBlock,
//       BlockType.MimeticBlock,
//       BlockType.MimeticBlock,
//       BlockType.Sand,
//     ],
//     [
//       BlockType.Empty,
//       BlockType.EnemyBlock,
//       BlockType.MimeticBlock,
//       BlockType.EnemyBlock,
//       BlockType.EnemyBlock,
//       BlockType.EnemyBlock,
//       BlockType.MimeticBlock,
//       BlockType.Sand,
//     ],
//     [
//       BlockType.Empty,
//       BlockType.EnemyBlock,
//       BlockType.MimeticBlock,
//       BlockType.EnemyBlock,
//       BlockType.CollectibleBlock,
//       BlockType.EnemyBlock,
//       BlockType.MimeticBlock,
//       BlockType.Sand,
//     ],
//     [
//       BlockType.Empty,
//       BlockType.EnemyBlock,
//       BlockType.MimeticBlock,
//       BlockType.Sand,
//       BlockType.Sand,
//       BlockType.Sand,
//       BlockType.MimeticBlock,
//       BlockType.Sand,
//     ],
//     [
//       BlockType.Empty,
//       BlockType.EnemyBlock,
//       BlockType.MimeticBlock,
//       BlockType.MimeticBlock,
//       BlockType.MimeticBlock,
//       BlockType.MimeticBlock,
//       BlockType.DeadCoral,
//       BlockType.Sand,
//     ],
//     [
//       BlockType.Start,
//       BlockType.Sand,
//       BlockType.Sand,
//       { type: BlockType.VitalCoral, moves: 12 },
//       BlockType.Sand,
//       BlockType.Sand,
//       BlockType.Sand,
//       BlockType.Sand,
//     ],
//   ],
//   maxMoves: 28,
//   hasCollectible: true,
// }

// const level7: LevelConfig = {
//   grid: [
//     [
//       BlockType.Start,
//       BlockType.Sand,
//       BlockType.Sand,
//       BlockType.CollectibleBlock,
//       BlockType.Sand,
//       BlockType.Sand,
//       BlockType.DeadCoral,
//     ],
//     [
//       BlockType.Sand,
//       BlockType.EnemyBlock,
//       BlockType.EnemyBlock,
//       BlockType.MimeticBlock,
//       BlockType.EnemyBlock,
//       BlockType.EnemyBlock,
//       BlockType.Sand,
//     ],
//     [
//       BlockType.Sand,
//       BlockType.EnemyBlock,
//       BlockType.Empty,
//       BlockType.MimeticBlock,
//       BlockType.Empty,
//       BlockType.EnemyBlock,
//       BlockType.Sand,
//     ],
//     [
//       BlockType.Sand,
//       BlockType.Sand,
//       BlockType.Sand,
//       { type: BlockType.VitalCoral, moves: 15 },
//       BlockType.MimeticBlock,
//       BlockType.MimeticBlock,
//       BlockType.DeadCoral,
//     ],
//     [
//       BlockType.Sand,
//       BlockType.EnemyBlock,
//       BlockType.Empty,
//       BlockType.Sand,
//       BlockType.Empty,
//       BlockType.EnemyBlock,
//       BlockType.Sand,
//     ],
//     [
//       BlockType.Sand,
//       BlockType.EnemyBlock,
//       BlockType.EnemyBlock,
//       BlockType.Sand,
//       BlockType.EnemyBlock,
//       BlockType.EnemyBlock,
//       BlockType.Sand,
//     ],
//     [
//       BlockType.DeadCoral,
//       BlockType.Sand,
//       BlockType.Sand,
//       BlockType.DeadCoral,
//       BlockType.Sand,
//       BlockType.Sand,
//       BlockType.End,
//     ],
//   ],
//   maxMoves: 30,
//   hasCollectible: true,
// }

const levelEnd: LevelConfig = {
  grid: [[BlockType.Empty]],
  tutorialSteps: [
    {
      message:
        'Thank you for playing MimetInk! More exciting levels are coming soon. Stay tuned for new adventures in the reef!',
    },
  ],
}

export const levels: LevelConfig[] = [
  level1,
  level2,
  level3,
  level4,
  level5,
  // level6, //AI generated
  // level7, //AI generated
  levelEnd,
]
