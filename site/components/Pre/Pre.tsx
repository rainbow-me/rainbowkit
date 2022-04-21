import { Box, BoxProps } from 'components/Box/Box';
import React from 'react';
import { pre } from './Pre.css';

export function Pre({ children }: BoxProps) {
  return (
    <Box as="pre" className={pre}>
      {children}
    </Box>
  );
}
