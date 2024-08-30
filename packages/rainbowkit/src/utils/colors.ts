export const convertHexToRGBA = (hexCode: string, opacity = 1): string => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = Number.parseInt(hex.substring(0, 2), 16);
  const g = Number.parseInt(hex.substring(2, 4), 16);
  const b = Number.parseInt(hex.substring(4, 6), 16);

  /* Backward compatibility for whole number based opacity values. */
  if (opacity > 1 && opacity <= 100) {
    // biome-ignore lint/style/noParameterAssign: TODO
    opacity = opacity / 100;
  }

  return `rgba(${r},${g},${b},${opacity})`;
};

export const getGradientRGBAs = (hexColor?: string): string[] | null => {
  if (!hexColor) return null;
  return [
    convertHexToRGBA(hexColor, 0.2),
    convertHexToRGBA(hexColor, 0.14),
    convertHexToRGBA(hexColor, 0.1),
  ];
};

export const isHexString = (color: string): boolean => {
  return /^#([0-9a-f]{3}){1,2}$/i.test(color);
};
