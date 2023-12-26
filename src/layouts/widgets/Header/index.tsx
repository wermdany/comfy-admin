import { FC } from 'react'
import { Avatar, Badge, Space } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, SearchOutlined } from '@ant-design/icons'

import { SvgIcon } from '@/components'

import { useLayoutStore } from '@/store'

import styles from '@/layouts/layout.module.less'

const Collapse = () => {
  const { collapse, toggleCollapse } = useLayoutStore()

  const handleToggleCollapse = () => {
    toggleCollapse()
  }

  if (collapse) return <MenuUnfoldOutlined style={{ fontSize: 20 }} onClick={handleToggleCollapse} />

  return <MenuFoldOutlined style={{ fontSize: 20 }} onClick={handleToggleCollapse} />
}

const HeaderFocus = () => {
  return (
    <Space size={20}>
      <SearchOutlined style={{ fontSize: 20 }}></SearchOutlined>
      <Badge count={1} size="small" dot>
        <SvgIcon name="react" style={{ fontSize: 20 }}></SvgIcon>
      </Badge>
      <div className={styles['layout-header-user']}>
        <Avatar></Avatar>
        <span>用户名</span>
      </div>
    </Space>
  )
}

const Header: FC = () => {
  return (
    <div className={styles['layout-header']}>
      <div className={styles['layout-header-brand']}></div>
      <div className={styles['layout-header-content']}>
        <Collapse />
        <HeaderFocus />
      </div>
    </div>
  )
}

export default Header
