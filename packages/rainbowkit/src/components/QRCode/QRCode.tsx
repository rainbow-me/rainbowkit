import QRCodeUtil from 'qrcode';
import React, { type ReactElement, useMemo } from 'react';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Box, type BoxProps } from '../Box/Box';
import { QRCodeBackgroundClassName } from '../ConnectOptions/DesktopOptions.css';

const DEFAULT_ECL: QRCodeUtil.QRCodeErrorCorrectionLevel = 'M';
const DEFAULT_LOGO_MARGIN = 10;
const DEFAULT_LOGO_SIZE = 50;
const DEFAULT_SIZE = 200;
const DEFAULT_PADDING: NonNullable<BoxProps['padding']> = '20';
const CORNER_SQUARE_COUNT = 3;
const CORNER_SQUARE_SIZE = 7;
const LOGO_CLEAR_AREA_PADDING = 25;
const DOT_SIZE_RATIO = 1 / 3;
const BORDER_RADIUS_BASE = 5;
const LOGO_BORDER_RADIUS = '13';
const CORNER_POSITIONS = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
];
const LOGO_BACKGROUND_OPACITY = 0.06;

const generateMatrix = (
  value: string,
  errorCorrectionLevel: QRCodeUtil.QRCodeErrorCorrectionLevel,
) => {
  const arr = Array.prototype.slice.call(
    QRCodeUtil.create(value, { errorCorrectionLevel }).modules.data,
    0,
  );
  const sqrt = Math.sqrt(arr.length);
  return arr.reduce(
    (rows, key, index) =>
      (index % sqrt === 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows,
    [],
  );
};

type Props = {
  ecl?: QRCodeUtil.QRCodeErrorCorrectionLevel;
  logoBackground?: string;
  logoUrl?: string | (() => Promise<string>);
  logoMargin?: number;
  logoSize?: number;
  size?: number;
  uri: string;
};

export function QRCode({
  ecl = DEFAULT_ECL,
  logoBackground,
  logoMargin = DEFAULT_LOGO_MARGIN,
  logoSize = DEFAULT_LOGO_SIZE,
  logoUrl,
  size: sizeProp = DEFAULT_SIZE,
  uri,
}: Readonly<Props>) {
  const padding = DEFAULT_PADDING;
  const size = sizeProp - Number.parseInt(padding, 10) * 2;

  const dots = useMemo(() => {
    const dots: ReactElement[] = [];
    const matrix = generateMatrix(uri, ecl);
    const cellSize = size / matrix.length;

    for (const { x, y } of CORNER_POSITIONS) {
      const x1 = (matrix.length - CORNER_SQUARE_SIZE) * cellSize * x;
      const y1 = (matrix.length - CORNER_SQUARE_SIZE) * cellSize * y;
      for (let i = 0; i < CORNER_SQUARE_COUNT; i++) {
        dots.push(
          <rect
            fill={i % 2 !== 0 ? 'white' : 'black'}
            height={cellSize * (CORNER_SQUARE_SIZE - i * 2)}
            key={`${i}-${x}-${y}`}
            rx={(i - 2) * -BORDER_RADIUS_BASE + (i === 0 ? 2 : 0)}
            ry={(i - 2) * -BORDER_RADIUS_BASE + (i === 0 ? 2 : 0)}
            width={cellSize * (CORNER_SQUARE_SIZE - i * 2)}
            x={x1 + cellSize * i}
            y={y1 + cellSize * i}
          />,
        );
      }
    }

    const clearArenaSize = Math.floor(
      (logoSize + LOGO_CLEAR_AREA_PADDING) / cellSize,
    );
    const matrixMiddleStart = matrix.length / 2 - clearArenaSize / 2;
    const matrixMiddleEnd = matrix.length / 2 + clearArenaSize / 2 - 1;

    for (const [i, row] of matrix.entries()) {
      for (const [j] of row.entries()) {
        if (matrix[i][j]) {
          if (
            !(
              (i < CORNER_SQUARE_SIZE && j < CORNER_SQUARE_SIZE) ||
              (i > matrix.length - (CORNER_SQUARE_SIZE + 1) &&
                j < CORNER_SQUARE_SIZE) ||
              (i < CORNER_SQUARE_SIZE &&
                j > matrix.length - (CORNER_SQUARE_SIZE + 1))
            )
          ) {
            if (
              !(
                i > matrixMiddleStart &&
                i < matrixMiddleEnd &&
                j > matrixMiddleStart &&
                j < matrixMiddleEnd
              )
            ) {
              dots.push(
                <circle
                  cx={i * cellSize + cellSize / 2}
                  cy={j * cellSize + cellSize / 2}
                  fill="black"
                  key={`circle-${i}-${j}`}
                  r={cellSize * DOT_SIZE_RATIO}
                />,
              );
            }
          }
        }
      }
    }

    return dots;
  }, [ecl, logoSize, size, uri]);
  const logoPosition = size / 2 - logoSize / 2;
  const logoWrapperSize = logoSize + logoMargin * 2;

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
        <Box
          display="flex"
          justifyContent="center"
          position="relative"
          style={{
            height: 0,
            top: logoPosition,
            width: size,
          }}
          width="full"
        >
          <AsyncImage
            background={logoBackground}
            borderColor={{
              custom: `rgba(0, 0, 0, ${LOGO_BACKGROUND_OPACITY})`,
            }}
            borderRadius={LOGO_BORDER_RADIUS}
            height={logoSize}
            src={logoUrl}
            width={logoSize}
          />
        </Box>
        <svg height={size} style={{ all: 'revert' }} width={size}>
          <title>QR Code</title>
          <defs>
            <clipPath id="clip-wrapper">
              <rect height={logoWrapperSize} width={logoWrapperSize} />
            </clipPath>
            <clipPath id="clip-logo">
              <rect height={logoSize} width={logoSize} />
            </clipPath>
          </defs>
          <rect fill="transparent" height={size} width={size} />
          {dots}
        </svg>
      </Box>
    </Box>
  );
}
