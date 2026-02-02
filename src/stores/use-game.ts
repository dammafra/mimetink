import { create } from 'zustand'

import { BLOCK_CONFIG, BlockType, GameStatus, levels, type GridCell } from '@config'

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

const checkLevelCompletion = (grid: GridCell[][]) => {
  return !grid.some(row =>
    row.some(cell => {
      const type = typeof cell === 'object' ? cell.type : cell
      return type === BlockType.DeadCoral
    }),
  )
}

const getInitialPlayerPosition = (grid: GridCell[][]) => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col]
      const type = typeof cell === 'object' ? cell.type : cell
      if (type === BlockType.Start) {
        return { col, row }
      }
    }
  }
  return { col: 0, row: 0 }
}

const startLevelIndex = 0
const initialLevel = levels[startLevelIndex]
const initialPos = getInitialPlayerPosition(initialLevel.grid)

export const useGameStore = create<GameState>((set, get) => ({
  currentLevelIndex: startLevelIndex,
  status: GameStatus.READY,
  grid: initialLevel.grid,
  gridDimensions: {
    rows: initialLevel.grid.length,
    cols: initialLevel.grid[0]?.length || 0,
  },
  playerColor: '#FB732A',
  playerCol: initialPos.col,
  playerRow: initialPos.row,
  isLevelCompleted: checkLevelCompletion(initialLevel.grid),
  restartKey: 0,
  isGridReady: false,
  isExiting: false,
  showCompletionOverlay: false,
  showFailureOverlay: false,
  currentMoves: 0,
  maxMoves: levels[startLevelIndex].maxMoves,
  hasCollectible: !!levels[startLevelIndex].hasCollectible,
  isCollected: false,
  vitalMovesLeft: 0,
  currentTutorialStep: levels[startLevelIndex].tutorialSteps ? 0 : null,
  showTutorial: !!levels[startLevelIndex].tutorialSteps,
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
    const { currentLevelIndex, currentTutorialStep } = get()
    const level = levels[currentLevelIndex]
    if (level.tutorialSteps && currentTutorialStep !== null) {
      if (currentTutorialStep < level.tutorialSteps.length - 1) {
        set({ currentTutorialStep: currentTutorialStep + 1 })
      } else if (currentLevelIndex === levels.length - 1) {
        return
      } else {
        set({ currentTutorialStep: null, showTutorial: false })
      }
    }
  },

  restartLevel: () => {
    const { currentLevelIndex } = get()
    const level = levels[currentLevelIndex]
    const initialPos = getInitialPlayerPosition(level.grid)
    set({
      status: GameStatus.PLAYING,
      grid: level.grid,
      gridDimensions: { rows: level.grid.length, cols: level.grid[0]?.length || 0 },
      isLevelCompleted: checkLevelCompletion(level.grid),
      restartKey: get().restartKey + 1,
      playerColor: '#FB732A',
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
      lastVitalCoralWithOriginalColor: null,
    })
  },

  nextLevel: () => {
    const { currentLevelIndex } = get()
    const nextIndex = (currentLevelIndex + 1) % levels.length
    const level = levels[nextIndex]
    const initialPos = getInitialPlayerPosition(level.grid)

    set({
      currentLevelIndex: nextIndex,
      status: GameStatus.PLAYING,
      grid: level.grid,
      gridDimensions: { rows: level.grid.length, cols: level.grid[0]?.length || 0 },
      isLevelCompleted: checkLevelCompletion(level.grid),
      restartKey: get().restartKey + 1,
      playerColor: '#FB732A',
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
      lastVitalCoralWithOriginalColor: null,
    })
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
    const blockType = typeof cell === 'object' ? cell.type : cell

    // 2. Determine Power for THIS move's interaction (based on start-of-move state)
    const powerAtStart = currentVitalMoves === null || (currentVitalMoves as number) > 0

    // Reset color IF starting the move with 0 energy and not landing on VitalCoral
    if (!powerAtStart && blockType !== BlockType.VitalCoral) {
      set({ playerColor: '#FB732A', playerCol: col, playerRow: row })
    }

    // 3. Update Move Counters
    const newMoveCount = currentMoves + 1

    // 4. Process Interactions
    if (blockType === BlockType.VitalCoral) {
      // Gain or refresh power
      const moves = typeof cell === 'object' ? cell.moves : undefined
      const vitalMoves = moves !== undefined ? moves : null
      // Check if player entered with original color
      const enteredWithOriginalColor = currentPlayerColor === '#FB732A'
      set({
        currentMoves: newMoveCount,
        playerColor: BLOCK_CONFIG[BlockType.VitalCoral].color,
        vitalMovesLeft: vitalMoves,
        playerCol: col,
        playerRow: row,
        // Store this info for sparkles animation
        lastVitalCoralWithOriginalColor: enteredWithOriginalColor ? { col, row } : null,
      })
    } else {
      // Deplete power if numeric
      let nextVitalMoves = currentVitalMoves
      if (typeof currentVitalMoves === 'number') {
        nextVitalMoves = Math.max(0, currentVitalMoves - 1)
      }
      set({
        currentMoves: newMoveCount,
        vitalMovesLeft: nextVitalMoves,
        playerCol: col,
        playerRow: row,
      })
    }

    // Interaction 2: Activate DeadCoral ONLY if power was active at start of move
    if (blockType === BlockType.DeadCoral && powerAtStart) {
      const newGrid = grid.map(r => [...r]) // Deep copy rows
      if (typeof cell === 'object') {
        newGrid[row][col] = { ...cell, type: BlockType.ActivatedDeadCoral }
      } else {
        newGrid[row][col] = BlockType.ActivatedDeadCoral
      }
      set({
        grid: newGrid,
        isLevelCompleted: checkLevelCompletion(newGrid),
      })
    }

    // Interaction 3: Reaching the End block
    if (blockType === BlockType.End) {
      set({ status: GameStatus.COMPLETED })

      // Wait for player exit animation to complete (~1500ms)
      const playerExitDuration = 1500

      setTimeout(() => {
        set({ isExiting: true })

        const { gridDimensions } = get()
        // Calculate max delay for level exit animation
        const maxDist = gridDimensions.rows + gridDimensions.cols
        const levelExitTime = maxDist * 100 + 1000

        setTimeout(() => {
          get().nextLevel()
        }, levelExitTime)
      }, playerExitDuration)
    }

    // Interaction 4: MimeticBlock/DeadCoral camouflage check
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

    // Interaction 6: CollectibleBlock
    if (blockType === BlockType.CollectibleBlock) {
      set({ isCollected: true })
    }

    // Interaction 5: EnemyBlock failure (always)
    if (blockType === BlockType.EnemyBlock) {
      set({ status: GameStatus.FAILED, showFailureOverlay: true })
    }
  },
}))
