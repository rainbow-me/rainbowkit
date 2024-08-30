import React, {
  type MouseEventHandler,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { RemoveScroll } from 'react-remove-scroll';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { useThemeRootProps } from '../RainbowKitProvider/RainbowKitProvider';
import * as styles from './Dialog.css';
import { FocusTrap } from './FocusTrap';

const stopPropagation: MouseEventHandler<unknown> = (event) =>
  event.stopPropagation();

interface DialogProps {
  open: boolean;
  onClose: () => void;
  titleId: string;
  onMountAutoFocus?: (event: Event) => void;
  children: ReactNode;
}

export function Dialog({ children, onClose, open, titleId }: DialogProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) =>
      open && event.key === 'Escape' && onClose();

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  const [bodyScrollable, setBodyScrollable] = useState(true);
  useEffect(() => {
    setBodyScrollable(
      getComputedStyle(window.document.body).overflow !== 'hidden',
    );
  }, []);

  const handleBackdropClick = useCallback(() => onClose(), [onClose]);
  const themeRootProps = useThemeRootProps();
  const mobile = isMobile();

  return (
    <>
      {open
        ? createPortal(
            <RemoveScroll enabled={bodyScrollable}>
              <Box {...themeRootProps}>
                <Box
                  {...themeRootProps}
                  alignItems={mobile ? 'flex-end' : 'center'}
                  aria-labelledby={titleId}
                  aria-modal
                  className={styles.overlay}
                  onClick={handleBackdropClick}
                  position="fixed"
                  role="dialog"
                >
                  <FocusTrap
                    className={styles.content}
                    onClick={stopPropagation}
                    role="document"
                  >
                    {children}
                  </FocusTrap>
                </Box>
              </Box>
            </RemoveScroll>,
            document.body,
          )
        : null}
    </>
  );
}
