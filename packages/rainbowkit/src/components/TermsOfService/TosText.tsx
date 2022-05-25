import React, { ReactNode } from 'react';
import { Text } from '../Text/Text';
export const TosText = ({ children }: { children: ReactNode }) => {
  return (
    <Text color="modalTextSecondary" size="12" weight="medium">
      {children}
    </Text>
  );
};
