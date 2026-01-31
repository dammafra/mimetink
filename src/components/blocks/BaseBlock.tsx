import { animated, useSpring } from '@react-spring/three'
import { RoundedBoxGeometry } from '@react-three/drei'
import { type JSX } from 'react'
import { type ColorRepresentation } from 'three'

type BaseBlockProps = JSX.IntrinsicElements['group'] & {
  color: ColorRepresentation
  delay?: number
}

export function BaseBlock({ color, children, delay = 0, ...props }: BaseBlockProps) {
  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    delay,
    config: { mass: 1, tension: 280, friction: 20 },
  })

  return (
    <animated.group scale={scale} {...(props as any)}>
      <mesh receiveShadow scale={[0.9, 0.4, 0.9]}>
        <RoundedBoxGeometry radius={0.15} />
        <meshMatcapMaterial color={color} />
      </mesh>
      {children}
    </animated.group>
  )
}
