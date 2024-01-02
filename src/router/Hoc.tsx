import { ComponentType, LazyExoticComponent, Suspense } from 'react'
import { Spin } from 'antd'

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
