import React from 'react';
import { touchableStyles } from '../../css/touchableStyles';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

interface ProfileDetailsActionProps {
  label: string;
  action?: () => void;
  icon: JSX.Element;
  url?: string;
  testId?: string;
}

export function ProfileDetailsAction({
  action,
  icon,
  label,
  testId,
  url,
}: ProfileDetailsActionProps) {
  const mobile = isMobile();
  return (
    <Box
      {...(url
        ? { as: 'a', href: url, rel: 'noreferrer noopener', target: '_blank' }
        : { as: 'button', type: 'button' })}
      background={{
        base: 'profileAction',
        ...(!mobile ? { hover: 'profileActionHover' } : {}),
      }}
      borderRadius="menuButton"
      boxShadow="profileDetailsAction"
      className={touchableStyles({
        active: 'shrinkSm',
        hover: !mobile ? 'grow' : undefined,
      })}
      display="flex"
      onClick={action}
      padding={mobile ? '6' : '8'}
      style={{ willChange: 'transform' }}
      testId={testId}
      transition="default"
      width="full"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        gap="1"
        justifyContent="center"
        paddingTop="2"
        width="full"
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
