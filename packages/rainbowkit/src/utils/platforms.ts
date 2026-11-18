export enum PlatformType {
  Windows = 'Windows',
  MacOS = 'macOS',
  Linux = 'Linux',
  Desktop = 'Desktop',
}

// Operating systems whose user agents also contain "Linux", "Windows" or
// "Mac OS X" but which don't run desktop wallet apps.
const nonDesktopOs =
  /android|cros\b|crkey|tizen|web[0o]s|kaios|harmonyos|ubuntu.+like android|\b(?:iphone|ipad|ipod)\b|like mac os x|windows (?:phone|mobile|iot|ce)|windows nt 6\.[23]; arm|xbox|playstation|nintendo/i;

function detectPlatform(): PlatformType {
  if (typeof navigator === 'undefined') return PlatformType.Desktop;
  const ua = navigator.userAgent ?? '';

  if (nonDesktopOs.test(ua)) return PlatformType.Desktop;
  if (
    /windows nt|windows (?:9[58x]|me|xp|vista|7|8|10|11|2000)|\bwin(?:32|64|9[58x]|nt)\b/i.test(
      ua,
    )
  ) {
    return PlatformType.Windows;
  }
  if (/mac os x|macintosh|mac_powerpc/i.test(ua)) return PlatformType.MacOS;
  if (/linux/i.test(ua)) return PlatformType.Linux;

  // Unrecognized user agent: fall back to User-Agent Client Hints
  // @ts-expect-error - userAgentData is not in every TypeScript DOM lib
  const platform: unknown = navigator.userAgentData?.platform;
  if (typeof platform === 'string') {
    if (platform === 'Windows') return PlatformType.Windows;
    if (platform === 'macOS') return PlatformType.MacOS;
    if (platform === 'Linux') return PlatformType.Linux;
  }

  return PlatformType.Desktop;
}

export function isWindows(): boolean {
  return detectPlatform() === PlatformType.Windows;
}

export function isMacOS(): boolean {
  return detectPlatform() === PlatformType.MacOS;
}

export function isLinux(): boolean {
  return detectPlatform() === PlatformType.Linux;
}

export function getPlatform(): PlatformType {
  return detectPlatform();
}
