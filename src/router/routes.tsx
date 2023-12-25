import { lazy } from 'react'

import { DashboardOutlined } from '@ant-design/icons'

import { hoc } from './Hoc'
import { UserRoute } from './router'

export const routes: UserRoute[] = [
  {
    path: '/dashboard',
    menu: true,
    icon: <DashboardOutlined />,
    title: '首页',
    children: [
      {
        path: '/dashboard/dataview',
        // @ts-ignore
        index: true,
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
  }
]

/**
 * 系统页面首页
 */
export const defaultSystemIndex = findSystemIndex(routes)

function findSystemIndex(routes: UserRoute[]): string {
  routes.forEach(route => {
    if (route.index) return route.path as string

    if (route.children && route.children.length) return findSystemIndex(route.children)
  })

  return '/dashboard/dataview'
}
