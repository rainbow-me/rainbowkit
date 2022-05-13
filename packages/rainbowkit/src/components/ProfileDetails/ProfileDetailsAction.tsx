import React from 'react';
import { increaseHitAreaForHoverTransform } from '../../css/increaseHitAreaForHoverTransform.css';
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
      borderRadius="menuButton"
      className={!mobile ? increaseHitAreaForHoverTransform.grow : undefined}
      display="flex"
      onClick={action}
      style={{ flexBasis: 0, flexGrow: 1 }}
      type={!url ? 'button' : undefined}
    >
      <Box
        {...urlProps}
        background={{
          base: 'profileAction',
          ...(!mobile ? { hover: 'profileActionHover' } : {}),
        }}
        borderRadius="menuButton"
        boxShadow="profileDetailsAction"
        padding={mobile ? '6' : '8'}
        style={{ willChange: 'transform' }}
        transform={{
          active: 'shrinkSm',
          ...(!mobile ? { hover: 'grow' } : {}),
        }}
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
        >
          <Box color="modalText" height="max">
            {icon}
          </Box>
          <Box>
            <Text
              color="modalText"
              size={mobile ? '12' : '13'}
              weight="semibold"
            >
              {label}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
