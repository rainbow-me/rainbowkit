import React, { ReactNode } from 'react';
import { Box, BoxProps } from '../Box/Box';
import * as styles from './DialogContent.css';

interface DialogContentProps {
  children: ReactNode;
  bottomSheetOnMobile?: boolean;
  padding?: BoxProps['padding'];
  marginTop?: BoxProps['marginTop'];
}

export function DialogContent({
  bottomSheetOnMobile = false,
  children,
  marginTop,
  padding = '14',
}: DialogContentProps) {
  return (
    <Box marginTop={marginTop}>
      <Box
        className={[
          styles.dialogContent,
          bottomSheetOnMobile ? styles.bottomSheetOverrides : null,
        ].join(' ')}
      >
        <Box padding={padding}>{children}</Box>
      </Box>
    </Box>
  );
}
