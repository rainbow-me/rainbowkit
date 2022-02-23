import React, { ReactNode } from 'react';
import { Box, BoxProps } from '../Box/Box';
import { dialogContent } from './DialogContent.css';

interface DialogContentProps {
  children: ReactNode;
  padding?: BoxProps['padding'];
  marginTop?: BoxProps['marginTop'];
}

export function DialogContent({
  children,
  marginTop,
  padding = '14',
}: DialogContentProps) {
  return (
    <Box className={dialogContent} marginTop={marginTop} padding={padding}>
      {children}
    </Box>
  );
}
