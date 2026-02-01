import { useSoundBoard, type ReturnedValue } from '@stores'
import { Howler } from 'howler'
import { useEffect, useState } from 'react'
import useSound from 'use-sound'

const parse = ([play, data]: ReturnedValue) => ({ play, ...data })

export default function SoundBoard() {
  const setContext = useSoundBoard(state => state.setContext)
  const setSounds = useSoundBoard(state => state.setSounds)
  const muted = useSoundBoard(state => state.muted)

  const [loaded, setLoaded] = useState(0)
  const onload = () => setLoaded(loaded => loaded + 1)

  const sounds = {
    loop: parse(useSound('./sounds/loop.wav', { loop: true, volume: 0.2, onload })),
    move: parse(useSound('./sounds/move.wav', { volume: 0.05, onload })),
  }

  const toLoad = Object.keys(sounds).length

  useEffect(() => {
    if (loaded < toLoad) return

    setContext(Howler.ctx)
    setSounds(sounds)
    sounds.loop.play()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, toLoad])

  useEffect(() => {
    Howler.volume(muted ? 0 : 1)
  }, [muted])

  /**
   * This helps resume AudioContext when the tab is suspended (e.g., when switching apps or locking the phone) and later resumed,
   * especially on mobile where browsers often suspend audio contexts to save resources;
   * by listening to user interactions (touchstart, touchend, mousedown, keydown), it ensures audio resumes reliably after the tab becomes active again.
   */
  // useEffect(() => {
  //   if (!context) return

  //   const events = ['touchstart', 'touchend', 'mousedown', 'keydown', 'visibilitychange']
  //   const resume = () => context.resume()
  //   const suspend = () => document.hidden && context.suspend()

  //   events.forEach(e => document.body.addEventListener(e, resume, false))
  //   document.addEventListener('visibilitychange', suspend)

  //   return () => {
  //     events.forEach(e => document.body.removeEventListener(e, resume, false))
  //     document.removeEventListener('visibilitychange', suspend)
  //   }
  // }, [context])

  return <></>
}
