export function isSafari(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    /Version\/([0-9._]+).*Safari/.test(navigator.userAgent) // Source: https://github.com/DamonOehlman/detect-browser/blob/master/src/index.ts
  );
}

export function getBrowser():
  | 'Chrome'
  | 'Edge'
  | 'Firefox'
  | 'Safari'
  | 'Brave'
  | 'Browser' {
  let ua = navigator.userAgent.toLowerCase();
  // brave
  // @ts-ignore
  if (navigator?.brave?.isBrave) {
    return 'Brave';
  }
  // edge
  if (ua.indexOf('edge') > -1 || ua.indexOf('edg/') > -1) {
    return 'Edge';
  }
  // chrome
  if (ua.indexOf('chrome') > -1) {
    return 'Chrome';
    // firefox
  } else if (ua.indexOf('firefox') > -1) {
    return 'Firefox';
  } else {
    return 'Browser';
  }
}
