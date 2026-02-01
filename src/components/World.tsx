import { GameStatus, useGameStore } from '@stores'
import { Grid } from './Grid'
import { Player } from './Player'

export function World() {
  const status = useGameStore(state => state.status)

  if (status === GameStatus.READY) return null

  return (
    <>
      <Player />
      <Grid />
    </>
  )
}
