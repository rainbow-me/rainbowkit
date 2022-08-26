export function isSafari(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    /Version\/([0-9._]+).*Safari/.test(navigator.userAgent) // Source: https://github.com/DamonOehlman/detect-browser/blob/master/src/index.ts
  );
}

export enum BrowserType {
  Chrome = 'Chrome',
  Edge = 'Edge',
  Firefox = 'Firefox',
  Brave = 'Brave',
  Browser = 'Browser',
}

export function getBrowser(): BrowserType {
  let ua = navigator.userAgent.toLowerCase();
  // brave
  // @ts-ignore
  if (navigator?.brave?.isBrave) {
    return BrowserType.Brave;
  }
  // edge
  if (ua.indexOf('edge') > -1 || ua.indexOf('edg/') > -1) {
    return BrowserType.Edge;
  }
  // chrome
  if (ua.indexOf('chrome') > -1) {
    return BrowserType.Chrome;
    // firefox
  }
  if (ua.indexOf('firefox') > -1) {
    return BrowserType.Firefox;
  }
  return BrowserType.Browser;
}
