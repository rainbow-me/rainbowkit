import React, { ReactNode, useContext } from 'react';
import { isMobile } from '../../utils/isMobile';
import { Box, BoxProps } from '../Box/Box';
import {
  ModalSizeContext,
  ModalSizeOptions,
} from '../RainbowKitProvider/ModalSizeContext';
import * as styles from './DialogContent.css';

interface DialogContentProps {
  children: ReactNode;
  bottomSheetOnMobile?: boolean;
  padding?: BoxProps['padding'];
  marginTop?: BoxProps['marginTop'];
  wide?: boolean;
}

export function DialogContent({
  bottomSheetOnMobile = false,
  children,
  marginTop,
  padding = '16',
  wide = false,
}: DialogContentProps) {
  const mobile = isMobile();
  const modalSize = useContext(ModalSizeContext);
  const compactModeEnabled = modalSize === ModalSizeOptions.COMPACT;
  return (
    <Box marginTop={marginTop}>
      <Box
        className={[
          wide
            ? mobile
              ? styles.dialogContentWideMobile
              : compactModeEnabled
              ? styles.dialogContentCompactMode
              : styles.dialogContentWideDesktop
            : styles.dialogContent,
          mobile ? styles.dialogContentMobile : null,
          mobile && bottomSheetOnMobile ? styles.bottomSheetOverrides : null,
        ].join(' ')}
      >
        <Box padding={padding}>{children}</Box>
      </Box>
    </Box>
  );
}
