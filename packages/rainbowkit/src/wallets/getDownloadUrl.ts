import { BrowserType, getBrowser } from '../utils/browsers';
import { WalletConnector } from './useWalletConnectors';

export const getBrowserDownloadUrl = (wallet?: WalletConnector) => {
  const browser = getBrowser();
  switch (browser) {
    case BrowserType.Arc:
      return wallet?.downloadUrls?.chrome;
    case BrowserType.Brave:
      return wallet?.downloadUrls?.chrome;
    case BrowserType.Chrome:
      return wallet?.downloadUrls?.chrome;
    case BrowserType.Edge:
      return wallet?.downloadUrls?.edge || wallet?.downloadUrls?.chrome;
    case BrowserType.Firefox:
      return wallet?.downloadUrls?.firefox;
    case BrowserType.Opera:
      return wallet?.downloadUrls?.opera || wallet?.downloadUrls?.chrome;
    case BrowserType.Safari:
      return wallet?.downloadUrls?.safari;
  }
  return wallet?.downloadUrls?.browserExtension;
};
