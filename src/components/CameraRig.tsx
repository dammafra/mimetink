import type { CameraControlsImpl } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Box3, MathUtils, Vector3 } from 'three'

import { useGameStore } from '@stores'

export function CameraRig() {
  const gridDimensions = useGameStore(state => state.gridDimensions)
  const isGridReady = useGameStore(state => state.isGridReady)
  const { size, viewport, controls } = useThree()
  const lastDimensions = useRef<{ rows: number; cols: number } | null>(null)

  const fit = () => {
    if (!controls || !gridDimensions || !('fitToBox' in controls)) return

    const cameraControls = controls as CameraControlsImpl
    const { rows, cols } = gridDimensions

    const width = cols * 2
    const height = rows * 2

    const box = new Box3()
    box.setFromCenterAndSize(new Vector3(0, 0, 0), new Vector3(width, 1, height))

    cameraControls.fitToBox(box, true, {
      paddingTop: viewport.aspect < 1 ? 1 : 3,
      paddingBottom: viewport.aspect < 1 ? 1 : 3,
      paddingLeft: viewport.aspect < 1 ? 2 : 3,
      paddingRight: viewport.aspect < 1 ? 2 : 3,
    })
    cameraControls.rotatePolarTo(MathUtils.degToRad(35))
    cameraControls.rotateAzimuthTo(MathUtils.degToRad(-15))
    cameraControls.moveTo(0, viewport.aspect < 1 ? 3 : 1, 0, true)

    lastDimensions.current = gridDimensions
  }

  // Effect for grid changes or window resize
  useEffect(() => {
    fit()
  }, [controls, gridDimensions, isGridReady, size.width, size.height])

  // Periodic check to ensure it's fitted (optional, but good for stability during layout shifts)
  useFrame(() => {
    if (gridDimensions !== lastDimensions.current) {
      fit()
    }
  })

  return null
}
