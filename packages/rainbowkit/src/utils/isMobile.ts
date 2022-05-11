export function isAndroid(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    /Android\s([0-9.]+)/.test(navigator.userAgent) // Source: https://github.com/DamonOehlman/detect-browser/blob/master/src/index.ts
  );
}

export function isIOS(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    /Version\/([0-9._]+).*Mobile.*Safari.*/.test(navigator.userAgent) // Source: https://github.com/DamonOehlman/detect-browser/blob/master/src/index.ts
  );
}

export function isMobile(): boolean {
  return isAndroid() || isIOS();
}
