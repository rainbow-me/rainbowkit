import { Cuer } from 'cuer';
import React from 'react';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Box, type BoxProps } from '../Box/Box';
import { QRCodeBackgroundClassName } from '../ConnectOptions/DesktopOptions.css';

type Props = {
  logoBackground?: string;
  logoUrl?: string | (() => Promise<string>);
  logoMargin?: number;
  logoSize?: number;
  size?: number;
  uri: string;
};

export function QRCode({
  logoBackground,
  logoMargin = 10,
  logoSize = 50,
  logoUrl,
  size: sizeProp = 200,
  uri,
}: Props) {
  const padding: NonNullable<BoxProps['padding']> = '20';
  const size = sizeProp - Number.parseInt(padding, 10) * 2;

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
          position: 'relative',
        }}
        userSelect="none"
      >
        <Cuer.Root value={uri} size={size}>
          <Cuer.Cells />
          <Cuer.Finder />
          {logoUrl && logoSize > 0 && (
            <Cuer.Arena>
              <Box
                style={{
                  background: logoBackground,
                  borderRadius: '13px',
                  padding: `${logoMargin}px`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                }}
              >
                <AsyncImage
                  borderColor={{ custom: 'rgba(0, 0, 0, 0.06)' }}
                  borderRadius="13"
                  height={logoSize}
                  src={logoUrl}
                  width={logoSize}
                />
              </Box>
            </Cuer.Arena>
          )}
        </Cuer.Root>
      </Box>
    </Box>
  );
}
