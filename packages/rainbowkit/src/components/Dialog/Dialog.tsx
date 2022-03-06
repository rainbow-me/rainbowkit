import React, {
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { useThemeRootProps } from '../RainbowKitProvider/RainbowKitProvider';
import * as styles from './Dialog.css';
import { FocusTrap } from './FocusTrap';

const stopPropagation: MouseEventHandler<unknown> = event =>
  event.stopPropagation();

interface DialogProps {
  open: boolean;
  onClose: () => void;
  titleId: string;
  onMountAutoFocus?: (event: Event) => void;
  wide?: boolean;
  children: ReactNode;
}

export function Dialog({
  children,
  onClose,
  open,
  titleId,
  wide = false,
}: DialogProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) =>
      open && event.key === 'Escape' && onClose();

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  const handleBackdropClick = useCallback(() => onClose(), [onClose]);
  const themeRootProps = useThemeRootProps();
  const mobile = isMobile();
  return (
    <>
      {open
        ? createPortal(
            <Box
              {...themeRootProps}
              aria-labelledby={titleId}
              aria-modal
              background="modalBackdrop"
              className={styles.overlay}
              onClick={handleBackdropClick}
              position="fixed"
              role="dialog"
            >
              <FocusTrap
                className={mobile || wide ? styles.wideContent : styles.content}
                onClick={stopPropagation}
                role="document"
              >
                {children}
              </FocusTrap>
            </Box>,
            document.body
          )
        : null}
    </>
  );
}
