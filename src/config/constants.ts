/**
 * Game constants and configuration values
 */

// Animation timings (in milliseconds)
export const ANIMATION_DELAYS = {
  BLOCK_SPAWN_PER_COLUMN: 150,
  GRID_READY_BUFFER: 600,
  PLAYER_EXIT_DURATION: 1500,
  LEVEL_EXIT_BASE_TIME: 1000,
  LEVEL_EXIT_PER_DISTANCE: 100,
} as const

// Player configuration
export const PLAYER_CONFIG = {
  DEFAULT_COLOR: '#FB732A',
  MOVEMENT_SPEED: 20,
} as const

// Grid configuration
export const GRID_CONFIG = {
  BLOCK_SPACING: 2,
} as const
