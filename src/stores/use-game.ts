import { create } from 'zustand'
import { BLOCK_CONFIG, BlockType } from '../logic/Grid'
import { levels } from '../logic/levels'

interface GameState {
  grid: BlockType[][]
  playerColor: string

  setPlayerColor: (color: string) => void
  onPlayerMove: (col: number, row: number) => void
}

export const useGameStore = create<GameState>((set, get) => ({
  grid: levels[0], // Initialize with Level 1
  playerColor: 'blue',

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

    // Interaction 2: Player (Red) turns DeadCoral into VitalCoral
    if (blockType === BlockType.DeadCoral && playerColor === BLOCK_CONFIG[BlockType.VitalCoral].color) {
      const newGrid = grid.map(r => [...r]) // Deep copy rows
      newGrid[row][col] = BlockType.VitalCoral
      set({ grid: newGrid })
    }
  },
}))
