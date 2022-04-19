import { Box, BoxProps } from 'components/Box/Box';
import React from 'react';
import { codeBlock } from './CodeBlock.css';

export function CodeBlock({ children }: BoxProps) {
  return (
    <Box as="pre" className={codeBlock}>
      {children}
    </Box>
  );
}
