import { create } from 'zustand'
import { BLOCK_CONFIG, BlockType, GameStatus } from '../constants/game'
import { levels } from '../logic/levels'

interface GameState {
  status: GameStatus
  grid: BlockType[][]
  gridDimensions: { rows: number; cols: number }
  playerColor: string
  isLevelCompleted: boolean
  restartKey: number
  isGridReady: boolean

  startGame: () => void
  restartLevel: () => void
  setGridReady: (ready: boolean) => void
  setPlayerColor: (color: string) => void
  onPlayerMove: (col: number, row: number) => void
}

const checkLevelCompletion = (grid: BlockType[][]) => {
  return !grid.some(row => row.includes(BlockType.DeadCoral))
}

export const useGameStore = create<GameState>((set, get) => ({
  status: GameStatus.READY,
  grid: levels[0], // Initialize with Level 1
  gridDimensions: { rows: levels[0].length, cols: levels[0][0]?.length || 0 },
  playerColor: 'darkorange',
  isLevelCompleted: checkLevelCompletion(levels[0]),
  restartKey: 0,
  isGridReady: false,

  startGame: () => set({ status: GameStatus.PLAYING, isGridReady: false }),

  restartLevel: () => {
    const initialGrid = levels[0]
    set({
      status: GameStatus.PLAYING,
      grid: initialGrid,
      gridDimensions: { rows: initialGrid.length, cols: initialGrid[0]?.length || 0 },
      isLevelCompleted: checkLevelCompletion(initialGrid),
      restartKey: get().restartKey + 1,
      playerColor: 'darkorange',
      isGridReady: false,
    })
  },

  setGridReady: ready => set({ isGridReady: ready }),

  setPlayerColor: color => set({ playerColor: color }),

  onPlayerMove: (col, row) => {
    const { grid, playerColor } = get()
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

    // Interaction 3: Reaching the End block
    if (blockType === BlockType.End && get().isLevelCompleted) {
      set({ status: GameStatus.COMPLETED })
    }
  },
}))
