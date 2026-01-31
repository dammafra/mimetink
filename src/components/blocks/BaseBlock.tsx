import type { JSX } from 'react'

export function BaseBlock(props: JSX.IntrinsicElements['group']) {
  return <group scale={[0.9, 0.4, 0.9]} {...props} />
}
