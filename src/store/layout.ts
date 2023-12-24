import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface LayoutStoreState {
  collapse: boolean
  toggleCollapse: () => void
}

export const useLayoutStore = create<LayoutStoreState>()(
  persist(
    set => ({
      collapse: false,
      toggleCollapse: () => set(({ collapse }) => ({ collapse: !collapse }))
    }),
    { name: 'layout' }
  )
)
