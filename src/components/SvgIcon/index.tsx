import { FC } from 'react'

export interface SvgIconProps {
  name: string
}

const SvgIcon: FC<SvgIconProps> = props => {
  const href = `#icon-${props.name}`

  return (
    <svg
      aria-hidden="true"
      className="svg-icon"
      focusable="false"
      width="1em"
      height="1em"
      fill="currentColor"
    >
      <use href={href} />
    </svg>
  )
}

export default SvgIcon
