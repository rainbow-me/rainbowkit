import React, { useReducer } from 'react';
import { isIOS } from '../../utils/isMobile';
import { Box, type BoxProps } from '../Box/Box';
import { type AsyncImageSrc, useAsyncImage } from './useAsyncImage';

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
  useAsImage?: boolean;
  borderColor?: BoxProps['borderColor'] | CustomBorderColor;
  boxShadow?: BoxProps['boxShadow'];
  testId?: string;
}

export function AsyncImage({
  alt,
  background,
  borderColor,
  borderRadius,
  useAsImage,
  boxShadow,
  height,
  src: srcProp,
  width,
  testId,
}: AsyncImageProps) {
  const ios = isIOS();
  const src = useAsyncImage(srcProp);
  const isRemoteImage = src && /^http/.test(src);
  const [isRemoteImageLoaded, setRemoteImageLoaded] = useReducer(
    () => true,
    false,
  );
  return (
    <Box
      aria-label={alt}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      height={typeof height === 'string' ? height : undefined}
      overflow="hidden"
      position="relative"
      role="img"
      style={{
        background,
        height: typeof height === 'number' ? height : undefined,
        width: typeof width === 'number' ? width : undefined,
      }}
      width={typeof width === 'string' ? width : undefined}
      testId={testId}
    >
      <Box
        {...(isRemoteImage
          ? // biome-ignore format: design system keys
            {
              "aria-hidden": true,
              as: "img",
              onLoad: setRemoteImageLoaded,
              src,
            }
          : { 'aria-hidden': true, as: 'img', src })}
        height="full"
        position="absolute"
        {...(ios ? { WebkitUserSelect: 'none' } : {})}
        style={{
          WebkitTouchCallout: 'none',
          transition: 'opacity .15s linear',
          userSelect: 'none',
          ...(!useAsImage && isRemoteImage
            ? {
                opacity: isRemoteImageLoaded ? 1 : 0,
              }
            : {}),
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
