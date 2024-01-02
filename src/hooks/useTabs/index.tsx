/**
 * 提供便捷的创建多标签页
 */

import { CSSProperties } from 'react'
import { Tabs, TabsProps } from 'antd'
import useUrlState from '@ahooksjs/use-url-state'

import { Fn } from '@/types'

import styles from './useTabs.module.less'

/** url query key */
export const TabsUrlActiveKey = 'tab'

/**
 * 应用一个 Tabs
 * @param options
 */
export function useTabs(options: TabsProps) {
  const { resolved, setActive } = useResolveOptions(options)

  const render = (
    <div className={styles['comfy-tabs']}>
      <Tabs {...resolved}></Tabs>
    </div>
  )

  return { render, active: resolved.activeKey, setActive }
}

/**
 * 获取 tab bar 静态样式
 * @param css
 */
const getTabsStaticStyles: Fn<CSSProperties, [CSSProperties | undefined]> = css => ({
  padding: '0 25px',
  backgroundColor: '#fff',
  marginBottom: '20px',
  ...css
})

interface ResolvedOptions {
  resolved: TabsProps
  setActive: Fn<void, [string]>
}

/**
 * 解析配置项
 * @param options
 */
const useResolveOptions: Fn<ResolvedOptions, [TabsProps]> = options => {
  const [active, setState] = useUrlState()

  const setActive = (key: string) => setState({ [TabsUrlActiveKey]: key })

  // outsider onChange function
  const onChange = options.onChange

  // 判断
  options.onChange = key => {
    setActive(key)

    if (onChange) {
      onChange(key)
    }
  }

  const resolved: TabsProps = Object.assign(options, {
    tabBarStyle: getTabsStaticStyles(options.tabBarStyle),
    activeKey: active[TabsUrlActiveKey]
  })

  return { resolved, setActive }
}
