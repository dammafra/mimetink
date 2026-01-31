import { create } from 'zustand'
import { BLOCK_CONFIG, BlockType } from '../logic/Grid'
import { levels } from '../logic/levels'

export const GameStatus = {
  READY: 'READY',
  PLAYING: 'PLAYING',
  COMPLETED: 'COMPLETED',
} as const

export type GameStatus = (typeof GameStatus)[keyof typeof GameStatus]

interface GameState {
  status: GameStatus
  grid: BlockType[][]
  playerColor: string
  isLevelCompleted: boolean
  restartKey: number

  startGame: () => void
  restartLevel: () => void
  setPlayerColor: (color: string) => void
  onPlayerMove: (col: number, row: number) => void
}

const checkLevelCompletion = (grid: BlockType[][]) => {
  return !grid.some(row => row.includes(BlockType.DeadCoral))
}

export const useGameStore = create<GameState>((set, get) => ({
  status: GameStatus.READY,
  grid: levels[0], // Initialize with Level 1
  playerColor: 'darkorange',
  isLevelCompleted: checkLevelCompletion(levels[0]),
  restartKey: 0,

  startGame: () => set({ status: GameStatus.PLAYING }),

  restartLevel: () =>
    set({
      grid: levels[0],
      isLevelCompleted: checkLevelCompletion(levels[0]),
      restartKey: get().restartKey + 1,
      playerColor: 'darkorange',
    }),

  setPlayerColor: color => set({ playerColor: color }),

  onPlayerMove: (col, row) => {
    const { grid, playerColor } = get()

    // Bounds check handled by Player logic

    const blockType = grid[row][col]

    // Interaction 1: VitalCoral turns player Red
    if (blockType === BlockType.VitalCoral) {
      if (playerColor !== BLOCK_CONFIG[BlockType.VitalCoral].color) {
        set({ playerColor: BLOCK_CONFIG[BlockType.VitalCoral].color })
      }
    }

    // Interaction 2: Player (Red) turns DeadCoral into ActivatedDeadCoral
    if (
      blockType === BlockType.DeadCoral &&
      playerColor === BLOCK_CONFIG[BlockType.VitalCoral].color
    ) {
      const newGrid = grid.map(r => [...r]) // Deep copy rows
      newGrid[row][col] = BlockType.ActivatedDeadCoral
      set({
        grid: newGrid,
        isLevelCompleted: checkLevelCompletion(newGrid),
      })
    }
  },
}))
