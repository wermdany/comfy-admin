import { FC } from 'react'
import { Button } from 'antd'
import { Navigate, useNavigate } from 'react-router-dom'

import { useUserStore } from '@/store'

const Login: FC = () => {
  const navigate = useNavigate()

  const { setUserInfo, isLogined } = useUserStore()

  if (isLogined()) {
    return <Navigate to="/" replace />
  }

  const login = () => {
    setUserInfo({ login: true })

    navigate('/', { replace: true })
  }

  return (
    <div>
      <Button onClick={login}>登录</Button>
    </div>
  )
}

export default Login
