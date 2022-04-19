import React from 'react';
import { Box, BoxProps } from '../Box/Box';
import { AsyncImageSrc, useAsyncImage } from './useAsyncImage';

type CustomBorderColor = {
  custom: string;
};
interface AsyncImageProps {
  alt?: string;
  src: string | AsyncImageSrc | undefined;
  width: BoxProps['width'] | number;
  height: BoxProps['height'] | number;
  background?: string;
  borderRadius?: BoxProps['borderRadius'];
  borderColor?: BoxProps['borderColor'] | CustomBorderColor;
  boxShadow?: BoxProps['boxShadow'];
}

export function AsyncImage({
  alt,
  background,
  borderColor,
  borderRadius,
  boxShadow,
  height,
  src: srcProp,
  width,
}: AsyncImageProps) {
  const src = useAsyncImage(srcProp);
  return (
    <Box
      aria-label={alt}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      height={typeof height === 'string' ? height : undefined}
      overflow="hidden"
      position="relative"
      style={{
        background,
        height: typeof height === 'number' ? height : undefined,
        width: typeof width === 'number' ? width : undefined,
      }}
      width={typeof width === 'string' ? width : undefined}
    >
      <Box
        backgroundSize="cover"
        height="full"
        position="absolute"
        style={{
          backgroundImage: typeof src === 'string' ? `url(${src})` : undefined,
          backgroundRepeat: 'no-repeat',
          opacity: typeof src === 'string' ? 1 : 0,
          touchCallout: 'none',
          transition: 'opacity .15s linear',
          userSelect: 'none',
        }}
        width="full"
      />
      {borderColor ? (
        <Box
          {...(typeof borderColor === 'object' && 'custom' in borderColor
            ? { style: { borderColor: borderColor.custom } }
            : { borderColor })}
          borderRadius={borderRadius}
          borderStyle="solid"
          borderWidth="1"
          height="full"
          position="relative"
          width="full"
        />
      ) : null}
    </Box>
  );
}
