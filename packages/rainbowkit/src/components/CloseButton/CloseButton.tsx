import React from 'react';
import { touchableStyles } from '../../css/touchableStyles';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { CloseIcon } from '../Icons/Close';

export const CloseButton = ({
  'aria-label': ariaLabel = 'Close',
  onClose,
}: {
  'aria-label'?: string;
  'onClose': () => void;
}) => {
  const mobile = isMobile();
  return (
    <Box
      alignItems="center"
      aria-label={ariaLabel}
      as="button"
      background="closeButtonBackground"
      borderColor="actionButtonBorder"
      borderRadius="full"
      borderStyle="solid"
      borderWidth={mobile ? '0' : '1'}
      className={touchableStyles({ active: 'shrinkSm', hover: 'growLg' })}
      color="closeButton"
      display="flex"
      height={mobile ? '30' : '28'}
      justifyContent="center"
      onClick={onClose}
      style={{ willChange: 'transform' }}
      transition="default"
      type="button"
      width={mobile ? '30' : '28'}
    >
      <CloseIcon />
    </Box>
  );
};
