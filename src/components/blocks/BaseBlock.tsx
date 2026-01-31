import { RoundedBoxGeometry } from '@react-three/drei'
import type { JSX } from 'react'
import type { ColorRepresentation } from 'three'

type BaseBlockProps = JSX.IntrinsicElements['group'] & {
  color: ColorRepresentation
}

export function BaseBlock({ color, children, ...props }: BaseBlockProps) {
  return (
    <group scale={props.scale ?? [0.9, 0.4, 0.9]} {...props}>
      {children}
      <mesh receiveShadow>
        <RoundedBoxGeometry radius={0.15} />
        <meshMatcapMaterial color={color} />
      </mesh>
    </group>
  )
}
