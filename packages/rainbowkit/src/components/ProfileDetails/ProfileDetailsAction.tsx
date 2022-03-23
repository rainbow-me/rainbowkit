import React from 'react';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

interface ProfileDetailsActionProps {
  label: string;
  action?: () => void;
  icon: JSX.Element;
  url?: string;
}

export function ProfileDetailsAction({
  action,
  icon,
  label,
  url,
}: ProfileDetailsActionProps) {
  const urlProps = url
    ? {
        href: url,
        rel: 'noreferrer',
        target: '_blank',
      }
    : {};
  const mobile = isMobile();
  return (
    <Box
      as={url ? 'a' : 'button'}
      onClick={action}
      {...urlProps}
      background={{
        base: 'profileAction',
        hover: 'profileActionHover',
      }}
      borderRadius="menuButton"
      boxShadow="profileDetailsAction"
      padding={mobile ? '8' : '10'}
      style={{ flexBasis: 0, flexGrow: 1, willChange: 'transform' }}
      transform={{ active: 'shrinkSm', hover: 'grow' }}
      transition="default"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        gap="2"
        justifyContent="center"
      >
        <Box color="modalText" height="max">
          {icon}
        </Box>
        <Box>
          <Text color="modalText" size={mobile ? '12' : '13'} weight="semibold">
            {label}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
