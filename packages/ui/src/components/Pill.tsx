import React from 'react'
import { useTheme } from '@rainbow-me/kit-theming'
import { styled } from '@linaria/react'

const StyledPill = styled.div<{ $foreground: string; $background: string }>`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  padding: 7px;
  color: ${({ $foreground }) => $foreground};
  background: ${({ $background }) => $background};
`

export const Pill = ({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const {
    foreground,
    background,
    components: { Pill: styles }
  } = useTheme()

  return (
    <StyledPill $background={background} $foreground={foreground} {...props} className={`${styles} ${className || ''}`}>
      {children}
    </StyledPill>
  )
}
