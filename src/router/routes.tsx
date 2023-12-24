import React, { lazy } from 'react'
import { MenuProps } from 'antd'
import { NonIndexRouteObject, createHashRouter } from 'react-router-dom'

import { hoc, Replace } from './LazyHoc'
import { DashboardOutlined } from '@ant-design/icons'

export interface RouteSchema {
  /** 是否在菜单显示 */
  menu?: boolean
  /** 在菜单显示的 icon */
  icon?: React.ReactNode
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
    element: hoc(lazy(() => import('@/layouts'))),
    children: [
      {
        path: '/dashboard',
        menu: true,
        icon: <DashboardOutlined />,
        title: '首页',
        children: [
          {
            path: '/dashboard/dataview',
            title: '平台数据概览',
            menu: true,
            element: hoc(lazy(() => import('@/pages/dashboard/dataview')))
          },
          {
            path: '/dashboard/workspace',
            title: '工作台',
            menu: true,
            element: hoc(lazy(() => import('@/pages/dashboard/workspace')))
          },
          {
            path: '/dashboard/approve',
            title: '审批',
            menu: true,
            element: hoc(lazy(() => import('@/pages/dashboard/approve')))
          }
        ]
      },
      {
        path: '/404',
        element: hoc(lazy(() => import('@/pages/404')))
      },
      {
        path: '*',
        element: <Replace />
      }
    ]
  },
  {
    path: '/login',
    loader: () => ({}),
    element: hoc(lazy(() => import('@/pages/login')))
  }
]

export const router = createHashRouter(RootRoutes)

type MenuItem = Required<MenuProps>['items'][number]

/** 侧边栏树 */
export const items = genMenu(RootRoutes[0].children!)

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
