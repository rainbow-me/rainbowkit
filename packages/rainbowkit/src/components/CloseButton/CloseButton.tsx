import React from 'react';
import { Box } from '../Box/Box';
import { CloseIcon } from '../Icons/Close';

export const CloseButton = ({
  onClose,
  style,
}: {
  onClose: () => void;
  style?: React.CSSProperties;
}) => {
  return (
    <Box
      alignItems="center"
      as="button"
      background="modalCloseBackground"
      borderColor="buttonBorder"
      borderRadius="full"
      borderStyle="solid"
      borderWidth="1"
      color="modalClose"
      display="flex"
      height="28"
      justifyContent="center"
      onClick={onClose}
      style={style}
      transform={{ active: 'shrinkSm', hover: 'growLg' }}
      transition="default"
      width="28"
    >
      <CloseIcon />
    </Box>
  );
};
