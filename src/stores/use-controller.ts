import { create } from 'zustand'

type ControllerStore = {
  up: boolean
  down: boolean
  left: boolean
  right: boolean

  setUp: (up: boolean) => void
  setDown: (down: boolean) => void
  setLeft: (left: boolean) => void
  setRight: (right: boolean) => void
}

export const useController = create<ControllerStore>()(set => ({
  up: false,
  down: false,
  left: false,
  right: false,

  setUp: up => set(() => ({ up })),
  setDown: down => set(() => ({ down })),
  setLeft: left => set(() => ({ left })),
  setRight: right => set(() => ({ right })),
}))
