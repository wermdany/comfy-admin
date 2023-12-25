import { ComponentType, FC, LazyExoticComponent, Suspense } from 'react'
import { Spin } from 'antd'
import { Navigate } from 'react-router-dom'

import { useUserStore } from '@/store'

export type SpinTypes = 'Global' | 'Content'

/**
 * 提供 Suspense 加载的高阶组件
 * @param Lazy 需要加载的组件
 * @param model 加载模式
 */
export const hoc = (Lazy: LazyExoticComponent<ComponentType>, model: SpinTypes = 'Content') => {
  const className = model == 'Content' ? 'content-spin-loading' : 'global-spin-loading'
  return (
    <Suspense fallback={<Spin size="large" delay={150} className={className}></Spin>}>
      <Lazy></Lazy>
    </Suspense>
  )
}

/**
 * 重定向到一个新位置
 * @param to
 */
export const Replace: FC = () => {
  const { userInfo } = useUserStore()

  if (userInfo && userInfo.login) {
    return <Navigate replace to="/dashboard"></Navigate>
  }

  return <Navigate replace to="/login"></Navigate>
}
