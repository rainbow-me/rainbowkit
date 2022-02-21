import QRCodeUtil from 'qrcode';
import React, { ReactElement, useMemo } from 'react';

const generateMatrix = (
  value: string,
  errorCorrectionLevel: QRCodeUtil.QRCodeErrorCorrectionLevel
) => {
  const arr = Array.prototype.slice.call(
    QRCodeUtil.create(value, { errorCorrectionLevel }).modules.data,
    0
  );
  const sqrt = Math.sqrt(arr.length);
  return arr.reduce(
    (rows, key, index) =>
      (index % sqrt === 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows,
    []
  );
};

type Props = {
  ecl?: QRCodeUtil.QRCodeErrorCorrectionLevel;
  logoUri: string;
  logoMargin?: number;
  logoSize?: number;
  size?: number;
  uri: string;
};

export function QRCode({
  ecl = 'M',
  logoMargin = 10,
  logoSize = 50,
  logoUri,
  size = 200,
  uri,
}: Props) {
  const dots = useMemo(() => {
    const dots: ReactElement[] = [];
    const matrix = generateMatrix(uri, ecl);
    const cellSize = size / matrix.length;
    let qrList = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ];

    qrList.forEach(({ x, y }) => {
      const x1 = (matrix.length - 7) * cellSize * x;
      const y1 = (matrix.length - 7) * cellSize * y;
      for (let i = 0; i < 3; i++) {
        dots.push(
          <rect
            fill={i % 2 !== 0 ? 'white' : 'black'}
            height={cellSize * (7 - i * 2)}
            key={`${i}-${x}-${y}`}
            rx={(i - 3) * -5 + (i === 0 ? 2 : 0)} // calculated border radius for corner squares
            ry={(i - 3) * -5 + (i === 0 ? 2 : 0)} // calculated border radius for corner squares
            width={cellSize * (7 - i * 2)}
            x={x1 + cellSize * i}
            y={y1 + cellSize * i}
          />
        );
      }
    });

    const clearArenaSize = Math.floor((logoSize + 25) / cellSize);
    const matrixMiddleStart = matrix.length / 2 - clearArenaSize / 2;
    const matrixMiddleEnd = matrix.length / 2 + clearArenaSize / 2 - 1;

    matrix.forEach((row: QRCodeUtil.QRCode[], i: number) => {
      row.forEach((_: any, j: number) => {
        if (matrix[i][j]) {
          if (
            !(
              (i < 7 && j < 7) ||
              (i > matrix.length - 8 && j < 7) ||
              (i < 7 && j > matrix.length - 8)
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
                  r={cellSize / 3} // calculate size of single dots
                />
              );
            }
          }
        }
      });
    });

    return dots;
  }, [ecl, logoSize, size, uri]);

  const logoPosition = size / 2 - logoSize / 2;
  const logoWrapperSize = logoSize + logoMargin * 2;

  return (
    <div>
      <div
        style={{
          height: '375px',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            height: 0,
            position: 'relative',
            textAlign: 'center',
            top: logoPosition,
            width: size,
          }}
        >
          <img
            alt=""
            height={logoSize}
            src={logoUri}
            style={{
              all: 'revert',
              borderRadius: '25%',
              height: logoSize,
              width: logoSize,
            }}
            width={logoSize}
          />
        </div>
        <svg height={size} style={{ all: 'revert' }} width={size}>
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
      </div>
    </div>
  );
}
