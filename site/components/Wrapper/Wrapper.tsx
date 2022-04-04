import { Box, BoxProps } from 'components/Box/Box';
import React, { ReactNode } from 'react';

import { wrapper } from './Wrapper.css';

export function Wrapper({
  children,
  style,
  ...props
}: {
  children: ReactNode;
  style?: React.CSSProperties;
} & BoxProps) {
  return (
    <Box className={wrapper} style={style} {...props}>
      {children}
    </Box>
  );
}
