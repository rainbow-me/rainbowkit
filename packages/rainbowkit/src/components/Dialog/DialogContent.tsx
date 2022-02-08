import React, { ReactNode } from 'react';
import { Box, BoxProps } from '../Box/Box';
import { dialogContent } from './DialogContent.css';

interface DialogContentProps {
  children: ReactNode;
  marginTop?: BoxProps['margin'];
}

export function DialogContent({ children, marginTop }: DialogContentProps) {
  return (
    <Box className={dialogContent} marginTop={marginTop}>
      {children}
    </Box>
  );
}
