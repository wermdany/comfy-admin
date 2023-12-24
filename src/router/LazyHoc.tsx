import { ComponentType, FC, LazyExoticComponent, Suspense } from 'react'
import { Spin } from 'antd'
import { Navigate } from 'react-router-dom'

import { useUserStore } from '@/store'

/**
 * 提供 Suspense 加载的高阶组件
 * @param Lazy
 */
export const hoc = (Lazy: LazyExoticComponent<ComponentType>) => {
  return (
    <Suspense fallback={<Spin delay={150}></Spin>}>
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
