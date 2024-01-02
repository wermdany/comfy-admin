import { FC } from 'react'

import { Button } from 'antd'

import { useTabs } from '@/hooks'

const Dataview: FC = () => {
  const items = [
    {
      label: 'Tab 1',
      key: '1',
      children: <Button onClick={() => setActive('2')}>切换</Button>
    },
    {
      label: 'Tab 2',
      key: '2'
    }
  ]

  const { render, setActive } = useTabs({
    items
  })

  return render
}

export default Dataview
