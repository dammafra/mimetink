import { useIsTouch } from '@hooks'
import { Html, KeyboardControls } from '@react-three/drei'
import { useController } from '@stores'
import { useRef, type PropsWithChildren } from 'react'

export function Controller({ children }: PropsWithChildren) {
  const isTouch = useIsTouch()

  const setUp = useController(state => state.setUp)
  const setDown = useController(state => state.setDown)
  const setLeft = useController(state => state.setLeft)
  const setRight = useController(state => state.setRight)

  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const SWIPE_THRESHOLD = 30

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    }

    const dx = touchEnd.x - touchStart.current.x
    const dy = touchEnd.y - touchStart.current.y
    const absX = Math.abs(dx)
    const absY = Math.abs(dy)

    if (Math.max(absX, absY) > SWIPE_THRESHOLD) {
      if (absX > absY) {
        // Horizontal swipe
        if (dx > 0) {
          setRight(true)
          setTimeout(() => setRight(false), 50)
        } else {
          setLeft(true)
          setTimeout(() => setLeft(false), 50)
        }
      } else {
        // Vertical swipe
        if (dy > 0) {
          setDown(true)
          setTimeout(() => setDown(false), 50)
        } else {
          setUp(true)
          setTimeout(() => setUp(false), 50)
        }
      }
    }

    touchStart.current = null
  }

  return (
    <KeyboardControls
      map={[
        { name: 'up', keys: ['ArrowUp', 'KeyW'] },
        { name: 'down', keys: ['ArrowDown', 'KeyS'] },
        { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'right', keys: ['ArrowRight', 'KeyD'] },
      ]}
      onChange={(_name, _pressed, state) => {
        setUp(state.up)
        setDown(state.down)
        setLeft(state.left)
        setRight(state.right)
      }}
    >
      {isTouch && (
        <Html center wrapperClass="fixed inset-0 -z-0!" className="h-dvh w-screen">
          <div
            className="fixed inset-0 h-dvh w-screen touch-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
        </Html>
      )}

      {children}
    </KeyboardControls>
  )
}
