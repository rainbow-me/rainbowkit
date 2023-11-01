import { BrowserType, getBrowser } from "../utils/browsers";
import { isIOS } from "../utils/isMobile";
import { PlatformType, getPlatform } from "../utils/platforms";
import { Wallet } from "./Wallet";

export const getExtensionDownloadUrl = (wallet: Wallet) => {
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

export const getMobileDownloadUrl = (wallet: Wallet) => {
  const ios = isIOS();
  return (
    (ios ? wallet?.downloadUrls?.ios : wallet?.downloadUrls?.android) ??
    wallet?.downloadUrls?.mobile
  );
};

export const getDesktopDownloadUrl = (wallet: Wallet) => {
  const platform = getPlatform();
  return (
    {
      [PlatformType.Windows]: wallet?.downloadUrls?.windows,
      [PlatformType.MacOS]: wallet?.downloadUrls?.macos,
      [PlatformType.Linux]: wallet?.downloadUrls?.linux,
      [PlatformType.Desktop]: wallet?.downloadUrls?.desktop,
    }[platform] ?? wallet?.downloadUrls?.desktop
  );
};
