import React from 'react';
import { increaseHitAreaForHoverTransform } from '../../css/increaseHitAreaForHoverTransform.css';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { CloseIcon } from '../Icons/Close';

export const CloseButton = ({ onClose }: { onClose: () => void }) => {
  const mobile = isMobile();
  return (
    <Box
      as="button"
      borderRadius="full"
      className={increaseHitAreaForHoverTransform.growLg}
      display="flex"
      height={mobile ? '30' : '28'}
      onClick={onClose}
      type="button"
      width={mobile ? '30' : '28'}
    >
      <Box
        alignItems="center"
        background="closeButtonBackground"
        borderColor="actionButtonBorder"
        borderRadius="full"
        borderStyle="solid"
        borderWidth={mobile ? '0' : '1'}
        color="closeButton"
        display="flex"
        height="full"
        justifyContent="center"
        style={{ willChange: 'transform' }}
        transform={{ active: 'shrinkSm', hover: 'growLg' }}
        transition="default"
        width="full"
      >
        <CloseIcon />
      </Box>
    </Box>
  );
};
