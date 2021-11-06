import React from 'react'
import { css } from '@linaria/core'
import { useTheme } from '@rainbow-me/kit-theming'

export const Pill = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const {
    foreground,
    components: { Pill: styles }
  } = useTheme()

  return (
    <div
      {...props}
      className={`${css`
        display: flex;
        cursor: pointer;
        justify-content: center;
        align-items: center;
        padding: 7px;
        color: ${foreground};
        ${styles}
      `} ${props.className || ''}`}
    ></div>
  )
}
