import React, { ReactNode } from 'react';
import { Text } from '../Text/Text';

export const DisclaimerLink = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  return (
    <Text color="accentColor" display="inline" size="12" weight="medium">
      <a
        href={href}
        rel="noreferrer"
        style={{
          color: 'inherit',
          textDecoration: 'none',
          width: 'fit-content',
        }}
        target="_blank"
      >
        {children}
      </a>
    </Text>
  );
};
