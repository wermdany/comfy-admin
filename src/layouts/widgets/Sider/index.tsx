import { FC } from 'react'
import { Menu, MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

import { useLayoutStore } from '@/store'
import { getMenuOpenKeys, items } from '@/router'

import styles from '@/layouts/layout.module.less'

const Sider: FC = () => {
  const { collapse } = useLayoutStore()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const openKeys = getMenuOpenKeys(pathname)

  const handleSwitchNavigate: MenuProps['onClick'] = event => {
    navigate(event.key)
  }

  return (
    <div className={styles['layout-sider']}>
      <div className={styles['layout-sider--brand']}></div>
      <Menu
        items={items}
        theme="dark"
        mode="inline"
        defaultOpenKeys={[openKeys]}
        defaultSelectedKeys={[pathname]}
        onClick={handleSwitchNavigate}
        inlineCollapsed={collapse}
      ></Menu>
    </div>
  )
}

export default Sider
