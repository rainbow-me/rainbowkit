import React, { useEffect, useMemo, useState } from 'react';
import { Box } from '../Box/Box';
import { SpinnerIcon } from '../Icons/Spinner';
import type { AvatarComponent } from '../RainbowKitProvider/AvatarContext';
import { emojiAvatarForAddress } from './emojiAvatarForAddress';

export const EmojiAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (ensImage) {
      const img = new Image();
      img.src = ensImage;
      img.onload = () => setLoaded(true);
    }
  }, [ensImage]);

  const { color: backgroundColor, emoji } = useMemo(
    () => emojiAvatarForAddress(address),
    [address],
  );
  return ensImage ? (
    loaded ? (
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
        backgroundSize="cover"
        borderRadius="full"
        color="modalText"
        display="flex"
        justifyContent="center"
        position="absolute"
        style={{
          height: size,
          width: size,
        }}
      >
        <SpinnerIcon />
      </Box>
    )
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
