import { lazy, ReactNode } from 'react'
import { MenuProps } from 'antd'
import { NonIndexRouteObject, createHashRouter } from 'react-router-dom'

import { hoc } from './Hoc'
import { routes } from './routes'

export interface RouteSchema {
  /** 是否在菜单显示 */
  menu?: boolean
  /** 在菜单显示的 icon */
  icon?: ReactNode
  /** 页面标题 */
  title?: string
}

export interface UserRoute extends NonIndexRouteObject, RouteSchema {
  children?: UserRoute[]
}

/**
 * 根路由树
 */
export const RootRoutes: UserRoute[] = [
  {
    path: '/',
    element: hoc(
      lazy(() => import('@/layouts')),
      'Global'
    ),
    children: routes
  },
  {
    path: '/login',
    title: '登录',
    element: hoc(
      lazy(() => import('@/pages/login')),
      'Global'
    )
  },
  {
    path: '*',
    element: hoc(
      lazy(() => import('@/pages/404')),
      'Global'
    )
  }
]

export const router = createHashRouter(RootRoutes)

type MenuItem = Required<MenuProps>['items'][number]

/** 侧边栏树 */
export const items = genMenu(routes)

/**
 * 根据侧边栏生成菜单
 */
export function genMenu(routes: UserRoute[]) {
  return routes.reduce((items, route) => {
    // 不在菜单显示得忽略
    if (!route.menu) return items

    const item: MenuItem = {
      key: route.path!,
      icon: route.icon!,
      label: route.title!,
      children: []
    }

    if (route.children && route.children.length) {
      item.children = genMenu(route.children)
    }

    // 解决过滤后没有一个子节点得情况
    if (!item.children.length) {
      // @ts-ignore
      delete item.children
    }

    items.push(item)

    return items
  }, [] as MenuItem[])
}

/**
 * 获取菜单需要展开得节点名称
 * @param pathname
 */
export function getMenuOpenKeys(pathname: string) {
  const paths = pathname.split('/')

  paths.pop()

  return paths.join('/')
}
