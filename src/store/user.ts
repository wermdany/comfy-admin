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
  isLogined: () => boolean
}

export const useUserStore = create<UserStoreState>()(
  persist(
    (set, get) => ({
      userInfo: null,
      setUserInfo: info => set(() => ({ userInfo: info })),
      isLogined: () => {
        const state = get()
        return !!(state.userInfo && state.userInfo.login)
      }
    }),
    { name: 'userInfo' }
  )
)
