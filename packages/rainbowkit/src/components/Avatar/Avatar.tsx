import React, { useMemo } from 'react';
import { Box } from '../Box/Box';
import { emojiAvatarForAddress } from './emojiAvatarForAddress';

interface AvatarProps {
  size: number;
  imageUrl?: string | null;
  address: string;
}

export function Avatar({ address, imageUrl, size }: AvatarProps) {
  const { color: backgroundColor, emoji } = useMemo(
    () => emojiAvatarForAddress(address),
    [address]
  );

  return (
    <Box
      alignItems="center"
      aria-hidden
      borderRadius="full"
      display="flex"
      justifyContent="center"
      overflow="hidden"
      position="relative"
      style={{
        backgroundColor,
        fontSize: `${Math.round(size * 0.55)}px`,
        height: `${size}px`,
        width: `${size}px`,
      }}
      userSelect="none"
    >
      <Box
        backgroundSize="cover"
        height="full"
        position="absolute"
        style={{ backgroundImage: `url(${imageUrl})` }}
        width="full"
      />
      {emoji}
    </Box>
  );
}
