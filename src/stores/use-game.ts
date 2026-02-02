import { create } from 'zustand'

import {
  ANIMATION_DELAYS,
  BLOCK_CONFIG,
  BlockType,
  GameStatus,
  PLAYER_CONFIG,
  levels,
  type GridCell,
} from '@config'
import { checkLevelCompletion, findStartPosition, getBlockType, getGridDimensions } from '@utils'

interface GameState {
  currentLevelIndex: number
  status: GameStatus
  grid: GridCell[][]
  gridDimensions: { rows: number; cols: number }
  playerColor: string
  playerCol: number
  playerRow: number
  isLevelCompleted: boolean
  restartKey: number
  isGridReady: boolean
  isExiting: boolean
  showCompletionOverlay: boolean
  showFailureOverlay: boolean
  currentMoves: number
  maxMoves: number | undefined
  vitalMovesLeft: number | null
  hasCollectible: boolean
  isCollected: boolean
  currentTutorialStep: number | null
  showTutorial: boolean
  lastVitalCoralWithOriginalColor: { col: number; row: number } | null

  startGame: () => void
  finishIntro: () => void
  nextTutorialStep: () => void
  restartLevel: () => void
  nextLevel: () => void
  setGridReady: (ready: boolean) => void
  setPlayerColor: (color: string) => void
  onPlayerMove: (col: number, row: number) => void
}

/**
 * Creates initial state for a level
 */
const createLevelState = (levelIndex: number, currentRestartKey: number) => {
  const level = levels[levelIndex]
  const initialPos = findStartPosition(level.grid)
  const gridDimensions = getGridDimensions(level.grid)

  return {
    currentLevelIndex: levelIndex,
    status: GameStatus.PLAYING,
    grid: level.grid,
    gridDimensions,
    isLevelCompleted: checkLevelCompletion(level.grid),
    restartKey: currentRestartKey + 1,
    playerColor: PLAYER_CONFIG.DEFAULT_COLOR,
    playerCol: initialPos.col,
    playerRow: initialPos.row,
    isGridReady: false,
    isExiting: false,
    showCompletionOverlay: false,
    showFailureOverlay: false,
    currentMoves: 0,
    maxMoves: level.maxMoves,
    hasCollectible: !!level.hasCollectible,
    isCollected: false,
    vitalMovesLeft: 0,
    currentTutorialStep: level.tutorialSteps ? 0 : null,
    showTutorial: !!level.tutorialSteps,
    lastVitalCoralWithOriginalColor: null as { col: number; row: number } | null,
  }
}

const START_LEVEL_INDEX = 0
const initialLevel = levels[START_LEVEL_INDEX]
const initialPos = findStartPosition(initialLevel.grid)
const initialGridDimensions = getGridDimensions(initialLevel.grid)

export const useGameStore = create<GameState>((set, get) => ({
  currentLevelIndex: START_LEVEL_INDEX,
  status: GameStatus.READY,
  grid: initialLevel.grid,
  gridDimensions: initialGridDimensions,
  playerColor: PLAYER_CONFIG.DEFAULT_COLOR,
  playerCol: initialPos.col,
  playerRow: initialPos.row,
  isLevelCompleted: checkLevelCompletion(initialLevel.grid),
  restartKey: 0,
  isGridReady: false,
  isExiting: false,
  showCompletionOverlay: false,
  showFailureOverlay: false,
  currentMoves: 0,
  maxMoves: levels[START_LEVEL_INDEX].maxMoves,
  hasCollectible: !!levels[START_LEVEL_INDEX].hasCollectible,
  isCollected: false,
  vitalMovesLeft: 0,
  currentTutorialStep: levels[START_LEVEL_INDEX].tutorialSteps ? 0 : null,
  showTutorial: !!levels[START_LEVEL_INDEX].tutorialSteps,
  lastVitalCoralWithOriginalColor: null,

  startGame: () =>
    set({
      status: GameStatus.INTRO,
      isGridReady: false,
      showCompletionOverlay: false,
      isExiting: false,
      showFailureOverlay: false,
      isCollected: false,
      currentMoves: 0,
    }),

  finishIntro: () => {
    const { currentLevelIndex } = get()
    const level = levels[currentLevelIndex]
    set({
      status: GameStatus.PLAYING,
      currentTutorialStep: level.tutorialSteps ? 0 : null,
      showTutorial: !!level.tutorialSteps,
    })
  },

  nextTutorialStep: () => {
    const { currentLevelIndex, currentTutorialStep, restartKey } = get()
    const level = levels[currentLevelIndex]
    if (level.tutorialSteps && currentTutorialStep !== null) {
      if (currentTutorialStep < level.tutorialSteps.length - 1) {
        set({ currentTutorialStep: currentTutorialStep + 1 })
      } else if (currentLevelIndex === levels.length - 1) {
        set({ ...createLevelState(0, restartKey), status: GameStatus.READY })
      } else {
        set({ currentTutorialStep: null, showTutorial: false })
      }
    }
  },

  restartLevel: () => {
    const { currentLevelIndex, restartKey } = get()
    set(createLevelState(currentLevelIndex, restartKey))
  },

  nextLevel: () => {
    const { currentLevelIndex, restartKey } = get()
    const nextIndex = (currentLevelIndex + 1) % levels.length
    set(createLevelState(nextIndex, restartKey))
  },

  setGridReady: ready => set({ isGridReady: ready }),

  setPlayerColor: color => set({ playerColor: color }),

  onPlayerMove: (col, row) => {
    const {
      grid,
      currentMoves,
      vitalMovesLeft: currentVitalMoves,
      playerColor: currentPlayerColor,
    } = get()
    const cell = grid[row][col]
    const blockType = getBlockType(cell)

    // Determine power state at start of move
    const powerAtStart = currentVitalMoves === null || currentVitalMoves > 0
    const newMoveCount = currentMoves + 1

    // Reset color if starting move with 0 energy and not landing on VitalCoral
    if (!powerAtStart && blockType !== BlockType.VitalCoral) {
      set({ playerColor: PLAYER_CONFIG.DEFAULT_COLOR, playerCol: col, playerRow: row })
    }

    // Handle VitalCoral interaction
    if (blockType === BlockType.VitalCoral) {
      const moves = typeof cell === 'object' ? cell.moves : undefined
      const vitalMoves = moves !== undefined ? moves : null
      const enteredWithOriginalColor = currentPlayerColor === PLAYER_CONFIG.DEFAULT_COLOR
      set({
        currentMoves: newMoveCount,
        playerColor: BLOCK_CONFIG[BlockType.VitalCoral].color,
        vitalMovesLeft: vitalMoves,
        playerCol: col,
        playerRow: row,
        lastVitalCoralWithOriginalColor: enteredWithOriginalColor ? { col, row } : null,
      })
    } else {
      // Deplete power if numeric
      const nextVitalMoves =
        typeof currentVitalMoves === 'number'
          ? Math.max(0, currentVitalMoves - 1)
          : currentVitalMoves
      set({
        currentMoves: newMoveCount,
        vitalMovesLeft: nextVitalMoves,
        playerCol: col,
        playerRow: row,
      })
    }

    // Activate DeadCoral if power was active at start of move
    if (blockType === BlockType.DeadCoral && powerAtStart) {
      const newGrid = grid.map(r => [...r])
      newGrid[row][col] =
        typeof cell === 'object'
          ? { ...cell, type: BlockType.ActivatedDeadCoral }
          : BlockType.ActivatedDeadCoral
      set({
        grid: newGrid,
        isLevelCompleted: checkLevelCompletion(newGrid),
      })
    }

    // Handle End block - level completion
    if (blockType === BlockType.End) {
      set({ status: GameStatus.COMPLETED })

      setTimeout(() => {
        set({ isExiting: true })

        const { gridDimensions } = get()
        const maxDist = gridDimensions.rows + gridDimensions.cols
        const levelExitTime =
          maxDist * ANIMATION_DELAYS.LEVEL_EXIT_PER_DISTANCE + ANIMATION_DELAYS.LEVEL_EXIT_BASE_TIME

        setTimeout(() => {
          get().nextLevel()
        }, levelExitTime)
      }, ANIMATION_DELAYS.PLAYER_EXIT_DURATION)
    }

    // Handle MimeticBlock/DeadCoral camouflage check
    const isMimeticCell = typeof cell === 'object' && cell.isMimetic
    if (
      blockType === BlockType.MimeticBlock ||
      ((blockType === BlockType.DeadCoral || blockType === BlockType.ActivatedDeadCoral) &&
        isMimeticCell)
    ) {
      if (!powerAtStart) {
        set({ status: GameStatus.FAILED, showFailureOverlay: true })
      }
    }

    // Handle CollectibleBlock
    if (blockType === BlockType.CollectibleBlock) {
      set({ isCollected: true })
    }

    // Handle EnemyBlock failure
    if (blockType === BlockType.EnemyBlock) {
      set({ status: GameStatus.FAILED, showFailureOverlay: true })
    }
  },
}))
