/**
 * 页面布局等相关
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface LayoutStoreState {
  /** 侧边栏是否收缩 */
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
