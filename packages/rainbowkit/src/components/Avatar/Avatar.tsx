import React, { useContext } from 'react';
import { Box } from '../Box/Box';
import { SpinnerIcon } from '../Icons/Spinner';
import { AvatarContext } from '../RainbowKitProvider/AvatarContext';

interface AvatarProps {
  address: string;
  loading?: boolean;
  imageUrl?: string | null;
  size: number;
}

export function Avatar({ address, imageUrl, loading, size }: AvatarProps) {
  const AvatarComponent = useContext(AvatarContext);

  return (
    <Box
      aria-hidden
      borderRadius="full"
      overflow="hidden"
      position="relative"
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      userSelect="none"
    >
      <Box
        alignItems="center"
        borderRadius="full"
        display="flex"
        justifyContent="center"
        overflow="hidden"
        position="absolute"
        style={{
          fontSize: `${Math.round(size * 0.55)}px`,
          height: `${size}px`,
          transform: loading ? 'scale(0.72)' : undefined,
          transition: '.25s ease',
          transitionDelay: loading ? undefined : '.1s',
          width: `${size}px`,
          willChange: 'transform',
        }}
        userSelect="none"
      >
        <AvatarComponent address={address} ensImage={imageUrl} size={size} />
      </Box>
      {typeof loading === 'boolean' && (
        <Box
          color="accentColor"
          display="flex"
          height="full"
          position="absolute"
          style={{
            opacity: loading ? 1 : 0,
            transition: loading ? '0.6s ease' : '0.2s ease',
            transitionDelay: loading ? '.05s' : undefined,
          }}
          width="full"
        >
          <SpinnerIcon height="100%" width="100%" />
        </Box>
      )}
    </Box>
  );
}
