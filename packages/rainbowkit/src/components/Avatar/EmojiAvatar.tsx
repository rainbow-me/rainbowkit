import React, { useMemo } from 'react';
import { Box } from '../Box/Box';
import { AvatarComponent } from '../RainbowKitProvider/AvatarContext';
import { emojiAvatarForAddress } from './emojiAvatarForAddress';

export const EmojiAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  const { color: backgroundColor, emoji } = useMemo(
    () => emojiAvatarForAddress(address),
    [address]
  );
  return ensImage ? (
    <Box
      backgroundSize="cover"
      borderRadius="full"
      position="absolute"
      style={{
        backgroundImage: `url(${ensImage})`,
        backgroundPosition: 'center',
        height: size,
        width: size,
      }}
    />
  ) : (
    <Box
      alignItems="center"
      display="flex"
      justifyContent="center"
      overflow="hidden"
      style={{
        ...(!ensImage && { backgroundColor }),
        height: size,
        width: size,
      }}
    >
      {emoji}
    </Box>
  );
};
