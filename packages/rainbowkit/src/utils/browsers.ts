export function isSafari(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    /Version\/([0-9._]+).*Safari/.test(navigator.userAgent) // Source: https://github.com/DamonOehlman/detect-browser/blob/master/src/index.ts
  );
}

export function isArc(): boolean {
  return (
    getComputedStyle(document.body).getPropertyValue('--arc-palette-focus') !==
    ''
  );
}

export enum BrowserType {
  Arc = 'Arc',
  Brave = 'Brave',
  Browser = 'Browser',
  Chrome = 'Chrome',
  Edge = 'Edge',
  Firefox = 'Firefox',
  Opera = 'Opera',
  Safari = 'Safari',
}

export function getBrowser(): BrowserType {
  let ua = navigator.userAgent.toLowerCase();

  // chrome
  if (ua.indexOf('chrome') > -1) {
    return BrowserType.Chrome;
  }
  // safari
  if (isSafari()) {
    return BrowserType.Safari;
  }
  // edge
  if (ua.indexOf('edge') > -1 || ua.indexOf('edg/') > -1) {
    return BrowserType.Edge;
  }
  // firefox
  if (ua.indexOf('firefox') > -1) {
    return BrowserType.Firefox;
  }
  // brave
  // @ts-ignore
  if (navigator?.brave?.isBrave) {
    return BrowserType.Brave;
  }
  // opera
  if (ua.indexOf('op') > -1) {
    return BrowserType.Opera;
  }
  // arc
  if (isArc()) {
    return BrowserType.Arc;
  }
  return BrowserType.Browser;
}
