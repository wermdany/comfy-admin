import { RouterProvider } from 'react-router-dom'

import { ConfigProvider } from 'antd'
import zh_CN from 'antd/es/locale/zh_CN'

import moment from 'moment'

// fix: vite 必须是 esm
import 'moment/dist/locale/zh-cn'
moment.locale('zh-cn')

import { router } from '@/router'

const App = () => {
  return (
    <ConfigProvider locale={zh_CN}>
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  )
}

export default App
