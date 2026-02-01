export const BlockType = {
  Empty: 0,
  Sand: 1,
  Start: 2,
  End: 3,
  VitalCoral: 4,
  DeadCoral: 5,
  ActivatedDeadCoral: 6,
  MimeticBlock: 7,
  EnemyBlock: 8,
  CollectibleBlock: 9,
} as const

export type BlockType = (typeof BlockType)[keyof typeof BlockType]

export const BLOCK_CONFIG = {
  [BlockType.Sand]: { color: '#deaa66' },
  [BlockType.Start]: { color: '#deaa66' },
  [BlockType.End]: { color: '#8D8F7F' },
  [BlockType.VitalCoral]: { color: '#FF6F61' },
  [BlockType.DeadCoral]: { color: '#D3D3D3' },
  [BlockType.ActivatedDeadCoral]: { color: '#FF6F61' },
  [BlockType.MimeticBlock]: { color: '#FF6F61' },
  [BlockType.EnemyBlock]: { color: '#FF6F61' },
  [BlockType.CollectibleBlock]: { color: '#deaa66' },
} as const

export const GameStatus = {
  READY: 'READY',
  PLAYING: 'PLAYING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
} as const

export type GameStatus = (typeof GameStatus)[keyof typeof GameStatus]
