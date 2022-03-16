import React from 'react';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { CloseIcon } from '../Icons/Close';

export const CloseButton = ({
  onClose,
  style,
}: {
  onClose: () => void;
  style?: React.CSSProperties;
}) => {
  const mobile = isMobile();
  return (
    <Box
      alignItems="center"
      as="button"
      background="closeButtonBackground"
      borderColor="actionButtonBorder"
      borderRadius="full"
      borderStyle="solid"
      borderWidth={mobile ? '0' : '1'}
      color="closeButton"
      display="flex"
      height={mobile ? '32' : '28'}
      justifyContent="center"
      onClick={onClose}
      style={{ willChange: 'transform', ...(style ?? {}) }}
      transform={{ active: 'shrinkSm', hover: 'growLg' }}
      transition="default"
      width={mobile ? '32' : '28'}
    >
      <CloseIcon />
    </Box>
  );
};
