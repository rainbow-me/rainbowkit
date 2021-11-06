import React from 'react'
import { useTheme } from '@rainbow-me/kit-theming'
import { styled } from '@linaria/react'

const StyledPill = styled.div<{ $foreground: string }>`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  padding: 7px;
  color: ${({ $foreground }) => $foreground};
`

export const Pill = ({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const {
    foreground,
    components: { Pill: styles }
  } = useTheme()

  return (
    <StyledPill $foreground={foreground} {...props} className={`${styles} ${className || ''}`}>
      {children}
    </StyledPill>
  )
}
