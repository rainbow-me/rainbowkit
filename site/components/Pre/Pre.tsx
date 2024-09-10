import clsx from 'clsx';
import { Box, type BoxProps } from 'components/Box/Box';
import React from 'react';
import { pre } from './Pre.css';

export function Pre({ children, className }: BoxProps) {
  return (
    <Box as="pre" className={clsx(pre, className)}>
      {children}
    </Box>
  );
}
