import React from 'react';
import { Cuer } from 'cuer';
import { Box, type BoxProps } from '../Box/Box';
import { useAsyncImage } from '../AsyncImage/useAsyncImage';
import { QRCodeBackgroundClassName } from '../ConnectOptions/DesktopOptions.css';

export type ErrorCorrectionLevel = 'low' | 'medium' | 'quartile' | 'high';

interface Props {
  ecc?: ErrorCorrectionLevel;
  logoBackground?: string;
  logoUrl?: string | (() => Promise<string>);
  logoMargin?: number;
  logoSize?: number;
  size?: number;
  uri: string;
}

export function QRCode({
  ecc = 'medium',
  logoBackground,
  logoMargin = 10,
  // biome-ignore lint/correctness/noUnusedVariables: API compatibility
  logoSize = 50,
  logoUrl,
  size: sizeProp = 200,
  uri,
}: Props) {
  const padding: NonNullable<BoxProps['padding']> = '20';
  const size = sizeProp - Number.parseInt(padding, 10) * 2;

  const resolvedLogoUrl = useAsyncImage(logoUrl);

  const arena = resolvedLogoUrl ? (
    <Cuer.Arena>
      <Box
        alignItems="center"
        display="flex"
        height="full"
        justifyContent="center"
        style={{ padding: logoMargin, width: '100%' }}
        width="full"
      >
        <Box
          as="img"
          height="full"
          src={resolvedLogoUrl}
          style={{
            background: logoBackground,
            borderColor: 'rgba(0, 0, 0, 0.06)',
            borderRadius: 13,
            borderStyle: 'solid',
            borderWidth: 1,
            objectFit: 'cover',
            width: '100%',
          }}
          width="full"
        />
      </Box>
    </Cuer.Arena>
  ) : null;

  return (
    <Box
      borderColor="generalBorder"
      borderRadius="menuButton"
      borderStyle="solid"
      borderWidth="1"
      className={QRCodeBackgroundClassName}
      padding={padding}
      width="max"
    >
      <Box
        style={{
          height: size,
          userSelect: 'none',
          width: size,
        }}
        userSelect="none"
      >
        <Cuer.Root color="black" errorCorrection={ecc} size={size} value={uri}>
          <Cuer.Finder />
          <Cuer.Cells />
          {arena}
        </Cuer.Root>
      </Box>
    </Box>
  );
}
