import React, { useMemo } from 'react';
import {
  addressHashedColorIndex,
  addressHashedEmoji,
  colors,
} from '../../utils/colors';
import { Box, BoxProps } from '../Box/Box';

export type EmojiIconProps = BoxProps & { address: string };

/**
 * Emoji icon mapped to an Ethereum address
 */
export const EmojiIcon = ({ address, className, ...props }: EmojiIconProps) => {
  const { color, emoji } = useMemo(() => {
    return {
      color: colors[addressHashedColorIndex(address) ?? 0],
      emoji: addressHashedEmoji(address),
    };
  }, [address]);

  return (
    <Box
      alignItems="center"
      as="span"
      borderRadius="full"
      className={className}
      display="flex"
      fontSize="14"
      height="28"
      justifyContent="center"
      marginRight="10"
      style={{ backgroundColor: color }}
      width="28"
      {...props}
    >
      {emoji}
    </Box>
  );
};
