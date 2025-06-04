import React from 'react';
import { Cuer } from 'cuer';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Box, type BoxProps } from '../Box/Box';
import { QRCodeBackgroundClassName } from '../ConnectOptions/DesktopOptions.css';

export type ErrorCorrectionLevel =
  | 'L'
  | 'M'
  | 'Q'
  | 'H'
  | 'low'
  | 'medium'
  | 'quartile'
  | 'high';

interface Props {
  ecl?: ErrorCorrectionLevel;
  logoBackground?: string;
  logoUrl?: string | (() => Promise<string>);
  logoMargin?: number;
  logoSize?: number;
  size?: number;
  uri: string;
}

function mapErrorCorrection(
  ecl: ErrorCorrectionLevel,
): 'low' | 'medium' | 'quartile' | 'high' {
  if (ecl === 'L' || ecl === 'low') return 'low';
  if (ecl === 'Q' || ecl === 'quartile') return 'quartile';
  if (ecl === 'H' || ecl === 'high') return 'high';
  return 'medium';
}

export function QRCode({
  ecl = 'M',
  logoBackground,
  logoMargin = 10,
  logoSize = 50,
  logoUrl,
  size: sizeProp = 200,
  uri,
}: Props) {
  const padding: NonNullable<BoxProps['padding']> = '20';
  const size = sizeProp - Number.parseInt(padding, 10) * 2;

  const arena = logoUrl ? (
    <Box
      alignItems="center"
      display="flex"
      justifyContent="center"
      style={{ padding: logoMargin }}
    >
      <AsyncImage
        background={logoBackground}
        borderColor={{ custom: 'rgba(0, 0, 0, 0.06)' }}
        borderRadius="13"
        height={logoSize}
        src={logoUrl}
        width={logoSize}
      />
    </Box>
  ) : undefined;

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
        <Cuer
          arena={arena}
          color="black"
          errorCorrection={mapErrorCorrection(ecl)}
          size={size}
          value={uri}
        />
      </Box>
    </Box>
  );
}
