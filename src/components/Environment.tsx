import { useControls } from 'leva'
import { useEffect, useRef } from 'react'
import type { DirectionalLight } from 'three'

import { useShadowHelper } from '@hooks'

export function Environment() {
  const { helpers, ambientLightIntensity, directionalLightIntensity, directionalLightPosition } =
    useControls(
      'environment',
      {
        helpers: false,
        ambientLightIntensity: {
          value: 1.5,
          min: 0,
          max: 20,
          step: 0.01,
          label: 'ambient intensity',
        },
        directionalLightIntensity: {
          value: 4.5,
          min: 0,
          max: 20,
          step: 0.01,
          label: 'directional intensity',
        },
        directionalLightPosition: {
          value: [4, 4, 1],
          min: 0,
          max: 20,
          step: 0.01,
          label: 'directional position',
        },
      },
      { collapsed: true },
    )

  const lightRef = useRef<DirectionalLight>(null!)
  const helperRef = useShadowHelper(lightRef)

  useEffect(() => {
    if (!helperRef.current) return
    helperRef.current.visible = helpers
  }, [helpers, helperRef])

  return (
    <>
      <ambientLight intensity={ambientLightIntensity} />
      <directionalLight
        ref={lightRef}
        castShadow
        position={directionalLightPosition}
        intensity={directionalLightIntensity}
        shadow-mapSize={[512, 512]}
        shadow-radius={5}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />
    </>
  )
}
