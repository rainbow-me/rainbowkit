import { afterEach, describe, expect, it, vi } from 'vitest';
import { getPlatform, PlatformType } from './platforms';

// Real user agents. Each expected value matches what the previous
// implementation (ua-parser-js 2.0.9 plus the old name list) returned,
// except Linux distributions that list was missing (marked below), which
// previously fell back to Desktop.
const cases: [string, PlatformType][] = [
  // Windows
  [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    PlatformType.Windows,
  ],
  [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0',
    PlatformType.Windows,
  ],
  [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
    PlatformType.Windows,
  ],
  [
    'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
    PlatformType.Windows,
  ],
  [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 OPR/116.0.0.0',
    PlatformType.Windows,
  ],
  // macOS
  [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    PlatformType.MacOS,
  ],
  [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Safari/605.1.15',
    PlatformType.MacOS,
  ],
  [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0',
    PlatformType.MacOS,
  ],
  // Linux
  [
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    PlatformType.Linux,
  ],
  [
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0',
    PlatformType.Linux,
  ],
  [
    'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0',
    PlatformType.Linux,
  ],
  [
    'Mozilla/5.0 (X11; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0',
    PlatformType.Linux,
  ],
  [
    'Mozilla/5.0 (X11; CentOS; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0',
    PlatformType.Linux,
  ], // was Desktop
  [
    'Mozilla/5.0 (X11; Linux x86_64; openSUSE) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    PlatformType.Linux,
  ], // was Desktop
  // Not desktop
  [
    'Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 WebAppManager',
    PlatformType.Desktop,
  ],
  [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1',
    PlatformType.Desktop,
  ],
  [
    'Mozilla/5.0 (iPad; CPU OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1',
    PlatformType.Desktop,
  ],
  [
    'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
    PlatformType.Desktop,
  ],
  [
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
    PlatformType.Desktop,
  ],
  [
    'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    PlatformType.Desktop,
  ],
  [
    'Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Mobile Safari/537.36 Edge/15.14977',
    PlatformType.Desktop,
  ],
  [
    'Mozilla/5.0 (SMART-TV; Linux; Tizen 6.0) AppleWebKit/538.1 (KHTML, like Gecko) Version/6.0 TV Safari/538.1',
    PlatformType.Desktop,
  ],
  ['', PlatformType.Desktop],
];

const setUserAgent = (ua: string, platform?: string) => {
  vi.stubGlobal('navigator', {
    userAgent: ua,
    ...(platform ? { userAgentData: { platform } } : {}),
  });
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getPlatform', () => {
  it.each(cases)('%s', (ua, expected) => {
    setUserAgent(ua);
    expect(getPlatform()).toBe(expected);
  });

  it('uses client hints when the user agent is unrecognized', () => {
    setUserAgent('SomeBrowser/1.0', 'macOS');
    expect(getPlatform()).toBe(PlatformType.MacOS);
  });

  it('returns Desktop without a navigator', () => {
    vi.stubGlobal('navigator', undefined);
    expect(getPlatform()).toBe(PlatformType.Desktop);
  });
});
