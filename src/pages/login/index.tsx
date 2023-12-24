import { FC } from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import { registerRoutes } from '@/router'
import { useUserStore } from '@/store'

const Login: FC = () => {
  const navigate = useNavigate()

  const { setUserInfo } = useUserStore()

  const login = () => {
    // TODO: 请求登录接口

    setUserInfo({ login: true })

    registerRoutes()

    navigate('/dashboard', { replace: true })
  }

  return (
    <div>
      <Button onClick={login}>登录</Button>
    </div>
  )
}

export default Login
