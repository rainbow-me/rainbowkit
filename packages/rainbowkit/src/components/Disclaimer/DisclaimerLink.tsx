import React, { type ReactNode } from 'react';
import { Box } from '../Box/Box';

export const DisclaimerLink = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  return (
    <Box
      as="a"
      color="accentColor"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </Box>
  );
};
