import clsx from 'clsx';
import React, {
  forwardRef,
  MouseEventHandler,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import { Box } from '../Box/Box';
import { useThemeRootProps } from '../RainbowkitThemeProvider/RainbowkitThemeProvider';
import * as styles from './Dialog.css';
import { FocusTrap } from './FocusTrap';

const stopPropagation: MouseEventHandler<unknown> = event =>
  event.stopPropagation();

interface DialogProps {
  open: boolean;
  onClose?: () => void;
  titleId: string;
  initialFocusRef: RefObject<HTMLElement | null>;
  children: ReactNode;
  classNames?: Partial<{
    overlay: string;
    content: string;
  }>;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      children,
      classNames,
      initialFocusRef,
      onClose = () => {},
      open,
      titleId,
    },
    ref
  ) => {
    useEffect(() => {
      const previouslyActiveElement = document.activeElement;

      initialFocusRef?.current?.focus();

      return () => {
        (previouslyActiveElement as HTMLElement).focus?.();
      };
    }, [initialFocusRef]);

    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) =>
        open && event.key === 'Escape' && onClose();

      document.addEventListener('keydown', handleEscape);

      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, onClose]);

    const handleBackdropClick = useCallback(() => onClose(), [onClose]);

    const themeRootProps = useThemeRootProps();

    return (
      <>
        {open
          ? createPortal(
              <Box
                {...themeRootProps}
                aria-labelledby={titleId}
                aria-modal
                background="modalBackdrop"
                className={clsx(styles.overlay, classNames?.overlay)}
                onClick={handleBackdropClick}
                position="fixed"
                role="dialog"
              >
                <FocusTrap
                  className={clsx(styles.content, classNames?.content)}
                  onClick={stopPropagation}
                  ref={ref}
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
);

Dialog.displayName = 'Dialog';
