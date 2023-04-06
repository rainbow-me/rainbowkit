import { BrowserType, getBrowser } from '../utils/browsers';
import { isIOS } from '../utils/isMobile';
import { WalletInstance } from './Wallet';

export const getExtensionDownloadUrl = (wallet?: WalletInstance) => {
  const browser = getBrowser();
  return (
    {
      [BrowserType.Arc]: wallet?.downloadUrls?.chrome,
      [BrowserType.Brave]: wallet?.downloadUrls?.chrome,
      [BrowserType.Chrome]: wallet?.downloadUrls?.chrome,
      [BrowserType.Edge]:
        wallet?.downloadUrls?.edge || wallet?.downloadUrls?.chrome,
      [BrowserType.Firefox]: wallet?.downloadUrls?.firefox,
      [BrowserType.Opera]:
        wallet?.downloadUrls?.opera || wallet?.downloadUrls?.chrome,
      [BrowserType.Safari]: wallet?.downloadUrls?.safari,
      [BrowserType.Browser]: wallet?.downloadUrls?.browserExtension,
    }[browser] ?? wallet?.downloadUrls?.browserExtension
  );
};

export const getMobileDownloadUrl = (wallet?: WalletInstance) => {
  const ios = isIOS();
  return (
    (ios ? wallet?.downloadUrls?.ios : wallet?.downloadUrls?.android) ??
    wallet?.downloadUrls?.mobile
  );
};
