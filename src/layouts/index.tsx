import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import classnames from 'classnames'

import { useLayoutStore } from '@/store'

import Sider from './widgets/Sider'
import Header from './widgets/Header'
import Footer from './widgets/Footer'

import styles from '@/layouts/layout.module.less'

const Layouts: FC = () => {
  const { collapse } = useLayoutStore()

  return (
    <div className={classnames(styles['layout'], { [styles['collapse']]: collapse })}>
      <Sider></Sider>
      <div className={styles['layout-content']}>
        <Header></Header>
        <div className={styles['layout-body']}>
          <Outlet />
        </div>
        <Footer></Footer>
      </div>
    </div>
  )
}

export default Layouts
