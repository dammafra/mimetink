import { GameStatus, useGameStore } from '@stores'
import { Suspense } from 'react'
import { Grid } from './Grid'
import { Player } from './Player'

export function World() {
  const status = useGameStore(state => state.status)

  if (status === GameStatus.READY) return null

  return (
    <Suspense>
      <Player />
      <Grid />
    </Suspense>
  )
}
