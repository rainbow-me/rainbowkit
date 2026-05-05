import { Cuer } from 'cuer';
import { useAsyncImage } from '../AsyncImage/useAsyncImage';
import { Box, type BoxProps } from '../Box/Box';
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
  logoSize: _logoSize = 50,
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
          <Cuer.Cells
            className={undefined}
            fill="currentColor"
            filter={undefined}
            radius={1}
          />
          <Cuer.Finder
            className={undefined}
            fill="currentColor"
            radius={0.25}
            stroke={undefined}
          />
          {resolvedLogoUrl && (
            <Cuer.Arena>
              <img
                alt="Wallet Logo"
                src={resolvedLogoUrl}
                style={{
                  backgroundColor: logoBackground,
                  borderRadius: '22.5%',
                  height: '88%',
                  objectFit: 'cover',
                  width: '88%',
                }}
              />
            </Cuer.Arena>
          )}
        </Cuer.Root>
      </Box>
    </Box>
  );
}
