import { FC, ComponentProps } from 'react'
import Icon from '@ant-design/icons'

type IconType = typeof Icon

export interface SvgIconProps extends ComponentProps<IconType> {
  name: string
}

const SvgIcon: FC<SvgIconProps> = props => {
  const href = `#icon-${props.name}`

  return (
    <Icon {...props}>
      <use href={href} />
    </Icon>
  )
}

export default SvgIcon
