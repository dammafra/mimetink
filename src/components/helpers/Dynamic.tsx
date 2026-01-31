import { type ComponentType } from 'react'

type DynamicProps<P extends object> = P & {
  component: ComponentType<P>
  blockType?: any
}

export function Dynamic<P extends object>({ component: Component, ...props }: DynamicProps<P>) {
  return <Component {...(props as P)} />
}
