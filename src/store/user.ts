/**
 * 用户权限等相关
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserInfo {
  login: boolean
}

export interface UserStoreState {
  userInfo: UserInfo | null
  setUserInfo: (info: UserInfo) => void
}

export const useUserStore = create<UserStoreState>()(
  persist(
    set => ({
      userInfo: null,
      setUserInfo: info => set(() => ({ userInfo: info }))
    }),
    { name: 'userInfo' }
  )
)
