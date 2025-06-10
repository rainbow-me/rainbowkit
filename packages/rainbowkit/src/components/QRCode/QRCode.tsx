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
  logoSize?: number;
  size?: number;
  uri: string;
}

export function QRCode({
  ecc = 'medium',
  logoBackground,
  // biome-ignore lint/correctness/noUnusedVariables: API compatibility
  logoSize = 50,
  logoUrl,
  size: sizeProp = 200,
  uri,
}: Props) {
  const padding: NonNullable<BoxProps['padding']> = '20';
  const size = sizeProp - Number.parseInt(padding, 10) * 2;

  const resolvedLogoUrl = useAsyncImage(logoUrl);

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
        <Cuer.Root errorCorrection={ecc} size={size} value={uri}>
          <Cuer.Cells radius={1} />
          <Cuer.Finder radius={0.25} />
          {resolvedLogoUrl && (
            <Cuer.Arena>
              <img
                alt="Wallet Logo"
                src={resolvedLogoUrl}
                style={{
                  objectFit: 'cover',
                  height: '88%',
                  width: '88%',
                  borderRadius: '22.5%',
                  backgroundColor: logoBackground,
                }}
              />
            </Cuer.Arena>
          )}
        </Cuer.Root>
      </Box>
    </Box>
  );
}
