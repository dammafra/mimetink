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
  showCompletionOverlay: boolean
  currentMoves: number
  maxMoves: number

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
  grid: levels[0].grid, // Initialize with Level 1
  gridDimensions: { rows: levels[0].grid.length, cols: levels[0].grid[0]?.length || 0 },
  playerColor: 'darkorange',
  isLevelCompleted: checkLevelCompletion(levels[0].grid),
  restartKey: 0,
  isGridReady: false,
  showCompletionOverlay: false,
  currentMoves: 0,
  maxMoves: levels[0].maxMoves,

  startGame: () =>
    set({
      status: GameStatus.PLAYING,
      isGridReady: false,
      showCompletionOverlay: false,
      currentMoves: 0,
    }),

  restartLevel: () => {
    const level = levels[0]
    set({
      status: GameStatus.PLAYING,
      grid: level.grid,
      gridDimensions: { rows: level.grid.length, cols: level.grid[0]?.length || 0 },
      isLevelCompleted: checkLevelCompletion(level.grid),
      restartKey: get().restartKey + 1,
      playerColor: 'darkorange',
      isGridReady: false,
      showCompletionOverlay: false,
      currentMoves: 0,
      maxMoves: level.maxMoves,
    })
  },

  setGridReady: ready => set({ isGridReady: ready }),

  setPlayerColor: color => set({ playerColor: color }),

  onPlayerMove: (col, row) => {
    const { grid, playerColor, currentMoves } = get()
    const blockType = grid[row][col]

    // Increment move counter
    const newMoveCount = currentMoves + 1
    set({ currentMoves: newMoveCount })

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

    // Interaction 3: Reaching the End block (always completes the level)
    if (blockType === BlockType.End) {
      set({ status: GameStatus.COMPLETED })
      // Delay showing completion overlay to allow player scale-down animation
      setTimeout(() => {
        set({ showCompletionOverlay: true })
      }, 1000) // 500ms delay + ~1000ms for animation
    }
  },
}))
