import { FC } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import classnames from 'classnames'

import { useLayoutStore, useUserStore } from '@/store'

import Sider from './widgets/Sider'
import Header from './widgets/Header'
import Footer from './widgets/Footer'

import styles from '@/layouts/layout.module.less'
import { defaultSystemIndex } from '@/router'

const Layout: FC = () => {
  const { isLogined } = useUserStore()

  const { collapse } = useLayoutStore()

  const { pathname } = useLocation()

  if (pathname == '/') {
    return <Navigate to={defaultSystemIndex} replace />
  }

  if (!isLogined()) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className={classnames(styles['layout'], { [styles['collapse']]: collapse })}>
      <Header></Header>
      <div className={styles['layout-content']}>
        <Sider></Sider>
        <div className={styles['layout-body']}>
          <Outlet />
        </div>
        <Footer></Footer>
      </div>
    </div>
  )
}

export default Layout
