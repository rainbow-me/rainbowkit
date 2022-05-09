import React from 'react';
import { increaseHitAreaForHoverTransform } from '../../css/increaseHitAreaForHoverTransform.css';
import { isMobile } from '../../utils/isMobile';
import { Box, BoxProps } from '../Box/Box';
import { Text, TextProps } from '../Text/Text';

type Size = 'small' | 'medium' | 'large';

const sizeVariants: Record<
  Size,
  {
    paddingX: BoxProps['paddingX'];
    paddingY: BoxProps['paddingY'];
    fontSize: TextProps['size'];
    height?: BoxProps['height'];
  }
> = {
  large: {
    fontSize: '16',
    paddingX: '24',
    paddingY: '10',
  },
  medium: {
    fontSize: '14',
    height: '28',
    paddingX: '12',
    paddingY: '4',
  },
  small: {
    fontSize: '14',
    paddingX: '10',
    paddingY: '5',
  },
};

export function ActionButton({
  href,
  label,
  onClick,
  rel = 'noreferrer noopener',
  size = 'medium',
  target = '_blank',
  type = 'primary',
}: {
  href?: string;
  label: string;
  onClick?: () => void;
  rel?: string;
  size?: Size;
  target?: string;
  type?: 'primary' | 'secondary';
}) {
  const isPrimary = type === 'primary';
  const isNotLarge = size !== 'large';
  const mobile = isMobile();
  const background = isPrimary
    ? 'accentColor'
    : isNotLarge
    ? 'actionButtonSecondaryBackground'
    : null;
  const { fontSize, height, paddingX, paddingY } = sizeVariants[size];
  const hasBorder = !mobile || !isNotLarge;
  return (
    <Box
      {...(href
        ? { as: 'a', href, rel, target }
        : { as: 'button', type: 'button' })}
      borderRadius="actionButton"
      className={increaseHitAreaForHoverTransform.grow}
      display="flex"
      onClick={onClick}
    >
      <Box
        {...(hasBorder
          ? {
              borderColor:
                mobile && !isNotLarge && !isPrimary
                  ? 'actionButtonBorderMobile'
                  : 'actionButtonBorder',
              borderStyle: 'solid',
              borderWidth: '1',
            }
          : {})}
        borderRadius="actionButton"
        paddingX={paddingX}
        paddingY={paddingY}
        style={{ willChange: 'transform' }}
        textAlign="center"
        transform={{ active: 'shrinkSm', hover: 'grow' }}
        transition="default"
        {...(background ? { background } : {})}
        {...(height ? { height } : {})}
      >
        <Text
          color={isPrimary ? 'accentColorForeground' : 'accentColor'}
          size={fontSize}
          weight="bold"
        >
          {label}
        </Text>
      </Box>
    </Box>
  );
}
