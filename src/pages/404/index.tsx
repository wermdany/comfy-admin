import { Result } from 'antd'
import { FC } from 'react'

const NotFound: FC = () => {
  return <Result status="404" title="404" subTitle="对不起，您访问的页面不存在" />
}

export default NotFound
