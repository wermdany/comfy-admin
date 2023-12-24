import { FC } from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

import { useLayoutStore } from '@/store'

import styles from '@/layouts/layout.module.less'

const Header: FC = () => {
  const { collapse, toggleCollapse } = useLayoutStore()

  const handleToggleCollapse = () => {
    toggleCollapse()
  }

  return (
    <div className={styles['layout-header']}>
      <div className={styles['layout-header--fixed']}>
        {collapse ? (
          <MenuUnfoldOutlined style={{ fontSize: 20 }} onClick={handleToggleCollapse} />
        ) : (
          <MenuFoldOutlined style={{ fontSize: 20 }} onClick={handleToggleCollapse} />
        )}
      </div>
    </div>
  )
}

export default Header
