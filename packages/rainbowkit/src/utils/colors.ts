const MAX_OPACITY = 1;
const OPACITY_SCALE = 100;
const HEX_LENGTH_SHORT = 3;
const HEX_BASE = 16;

export const convertHexToRGBA = (
  hexCode: string,
  opacity = MAX_OPACITY,
): string => {
  let hex = hexCode.replace('#', '');

  if (hex.length === HEX_LENGTH_SHORT) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), HEX_BASE);
  const g = parseInt(hex.substring(2, 4), HEX_BASE);
  const b = parseInt(hex.substring(4, 6), HEX_BASE);

  /* Backward compatibility for whole number based opacity values. */
  let adjustedOpacity = opacity;
  if (adjustedOpacity > MAX_OPACITY && adjustedOpacity <= OPACITY_SCALE) {
    adjustedOpacity = adjustedOpacity / OPACITY_SCALE;
  }

  return `rgba(${r},${g},${b},${adjustedOpacity})`;
};
const GRADIENT_OPACITY_1 = 0.2;
const GRADIENT_OPACITY_2 = 0.14;
const GRADIENT_OPACITY_3 = 0.1;

export const getGradientRGBAs = (hexColor?: string): string[] | null => {
  if (!hexColor) return null;
  return [
    convertHexToRGBA(hexColor, GRADIENT_OPACITY_1),
    convertHexToRGBA(hexColor, GRADIENT_OPACITY_2),
    convertHexToRGBA(hexColor, GRADIENT_OPACITY_3),
  ];
};

export const isHexString = (color: string): boolean => {
  return /^#([0-9a-f]{3}){1,2}$/i.test(color);
};
